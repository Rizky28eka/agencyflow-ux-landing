import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckSquare, Plus, Filter, MoreHorizontal } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// --- Type Definitions ---
interface Task {
  id: number;
  name: string;
  status: string;
  dueDate: string;
  priority: string;
  project_id: number;
  assignee_id: string;
  projectName: string;
  assigneeName: string;
}

interface Project {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
}

const taskFormSchema = z.object({
  name: z.string().min(3, 'Task name must be at least 3 characters'),
  project_id: z.string().nonempty('Project is required'),
  assignee_id: z.string().nonempty('Assignee is required'),
  dueDate: z.string().nonempty('Due date is required'),
  priority: z.string().nonempty('Priority is required'),
  status: z.string().nonempty('Status is required'),
});

type TaskFormData = z.infer<typeof taskFormSchema>;

// --- Main Component ---
const AllTasks = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({ project: 'all', assignee: 'all', status: 'all' });
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  // --- Queries & Mutations ---
  const { data: tasks = [], isLoading, isError, error } = useQuery<Task[]>({ 
    queryKey: ['tasks'], 
    queryFn: () => api.get('/api/tasks')
  });

  const { data: projectsData = [] } = useQuery<Project[]>({ queryKey: ['projects'], queryFn: () => api.get('/api/projects') });
  const { data: usersData = [] } = useQuery<User[]>({ queryKey: ['users'], queryFn: () => api.get('/api/users') });

  const updateTaskMutation = useMutation({
    mutationFn: (updatedTask: Partial<Task> & { id: number }) => api.put(`/api/tasks/${updatedTask.id}`, updatedTask),
    onSuccess: () => {
      toast.success('Task updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setEditTask(null);
    },
    onError: (err) => toast.error(`Failed to update task: ${err.message}`)
  });

  const createTaskMutation = useMutation({
    mutationFn: (newTask: TaskFormData) => api.post('/api/tasks', newTask),
    onSuccess: () => {
      toast.success('Task created successfully!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setAddDialogOpen(false);
    },
    onError: (err) => toast.error(`Failed to create task: ${err.message}`)
  });

  // --- Memoized Data for Filters & Forms ---
  const { filteredTasks, uniqueProjects, uniqueAssignees, uniqueStatuses } = useMemo(() => {
    const filtered = tasks.filter(task => 
      (filters.project === 'all' || task.projectName === filters.project) &&
      (filters.assignee === 'all' || task.assigneeName === filters.assignee) &&
      (filters.status === 'all' || task.status === filters.status)
    );
    const uniqueProjects = ['all', ...new Set(tasks.map(t => t.projectName).filter(Boolean))];
    const uniqueAssignees = ['all', ...new Set(tasks.map(t => t.assigneeName).filter(Boolean))];
    const uniqueStatuses = ['all', ...new Set(tasks.map(t => t.status).filter(Boolean))];
    return { filteredTasks: filtered, uniqueProjects, uniqueAssignees, uniqueStatuses };
  }, [tasks, filters]);

  // --- Render Logic ---
  const renderTableBody = () => {
    if (isLoading) return [...Array(5)].map((_, i) => <TableRow key={i}><TableCell colSpan={7}><Skeleton className="h-8 w-full" /></TableCell></TableRow>);
    if (isError) return <TableRow><TableCell colSpan={7} className="text-center text-red-500">Error: {error.message}</TableCell></TableRow>;
    if (filteredTasks.length === 0) return <TableRow><TableCell colSpan={7} className="text-center">No tasks found.</TableCell></TableRow>;

    return filteredTasks.map((task) => (
      <TableRow key={task.id}>
        <TableCell className="font-medium">{task.name}</TableCell>
        <TableCell>{task.projectName}</TableCell>
        <TableCell>{task.assigneeName}</TableCell>
        <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
        <TableCell><Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'}>{task.priority}</Badge></TableCell>
        <TableCell><Badge variant="outline">{task.status}</Badge></TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setEditTask(task)}>Edit Task</DropdownMenuItem>
              <DropdownMenuItem asChild><Link to={`/dashboard/project-manager/tasks/${task.id}`}>View Details</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <DashboardLayout
      title="All Tasks"
      description="A global view of all tasks across all projects."
      headerIcon={<CheckSquare className="h-8 w-8 text-primary" />}
      headerAction={<Button className="bg-gradient-primary" onClick={() => setAddDialogOpen(true)}><Plus />Add New Task</Button>}
    >
      <Card className="mb-8">
        <CardHeader><CardTitle className="flex items-center"><Filter /> Filters</CardTitle></CardHeader>
        <CardContent className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
          <Select value={filters.project} onValueChange={(v) => setFilters(p => ({...p, project: v}))}><SelectTrigger className="w-full sm:w-[180px]"><SelectValue /></SelectTrigger><SelectContent>{uniqueProjects.map(p => <SelectItem key={p} value={p}>{p === 'all' ? 'All Projects' : p}</SelectItem>)}</SelectContent></Select>
          <Select value={filters.assignee} onValueChange={(v) => setFilters(p => ({...p, assignee: v}))}><SelectTrigger className="w-full sm:w-[180px]"><SelectValue /></SelectTrigger><SelectContent>{uniqueAssignees.map(a => <SelectItem key={a} value={a}>{a === 'all' ? 'All Assignees' : a}</SelectItem>)}</SelectContent></Select>
          <Select value={filters.status} onValueChange={(v) => setFilters(p => ({...p, status: v}))}><SelectTrigger className="w-full sm:w-[180px]"><SelectValue /></SelectTrigger><SelectContent>{uniqueStatuses.map(s => <SelectItem key={s} value={s}>{s === 'all' ? 'All Statuses' : s}</SelectItem>)}</SelectContent></Select>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Task</TableHead><TableHead>Project</TableHead><TableHead>Assignee</TableHead><TableHead>Due Date</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>{renderTableBody()}</TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AddTaskDialog isOpen={isAddDialogOpen} onOpenChange={setAddDialogOpen} projects={projectsData} users={usersData} mutation={createTaskMutation} />
      <EditTaskDialog task={editTask} onOpenChange={() => setEditTask(null)} mutation={updateTaskMutation} />

    </DashboardLayout>
  );
};

interface CreateTaskMutation {
  isPending: boolean;
  mutate: (newTask: TaskFormData) => void;
}

interface UpdateTaskMutation {
  isPending: boolean;
  mutate: (updatedTask: Partial<Task> & { id: number }) => void;
}

// --- Sub-Components for Dialogs ---
const AddTaskDialog = ({ isOpen, onOpenChange, projects, users, mutation }: { isOpen: boolean; onOpenChange: (open: boolean) => void; projects: Project[]; users: User[]; mutation: CreateTaskMutation; }) => {
  const form = useForm<TaskFormData>({ resolver: zodResolver(taskFormSchema), defaultValues: { name: '', project_id: '', assignee_id: '', dueDate: '', priority: 'Medium', status: 'To Do' } });
  const onSubmit = (data: TaskFormData) => mutation.mutate(data);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Add New Task</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField name="name" control={form.control} render={({ field }) => <FormItem><FormLabel>Task Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField name="project_id" control={form.control} render={({ field }) => <FormItem><FormLabel>Project</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{projects.map((p) => <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>} />
            <FormField name="assignee_id" control={form.control} render={({ field }) => <FormItem><FormLabel>Assignee</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>{users.map((u) => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>} />
            <FormField name="dueDate" control={form.control} render={({ field }) => <FormItem><FormLabel>Due Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField name="priority" control={form.control} render={({ field }) => <FormItem><FormLabel>Priority</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Low">Low</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="High">High</SelectItem></SelectContent></Select><FormMessage /></FormItem>} />
            <FormField name="status" control={form.control} render={({ field }) => <FormItem><FormLabel>Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="To Do">To Do</SelectItem><SelectItem value="In Progress">In Progress</SelectItem><SelectItem value="Review">Review</SelectItem><SelectItem value="Completed">Completed</SelectItem></SelectContent></Select><FormMessage /></FormItem>} />
            <DialogFooter><Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? 'Creating...' : 'Create Task'}</Button></DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const EditTaskDialog = ({ task, onOpenChange, mutation }: { task: Task | null; onOpenChange: (open: boolean) => void; mutation: UpdateTaskMutation; }) => {
  const [editData, setEditData] = useState(task);
  useEffect(() => setEditData(task), [task]);

  if (!task) return null;

  const handleSave = () => {
    if (editData) mutation.mutate(editData);
  }

  return (
    <Dialog open={!!task} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Edit Task: {task.name}</DialogTitle></DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2"><Label>Task Name</Label><Input value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} /></div>
          <div className="space-y-2"><Label>Status</Label><Select value={editData.status} onValueChange={(v) => setEditData({...editData, status: v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="To Do">To Do</SelectItem><SelectItem value="In Progress">In Progress</SelectItem><SelectItem value="Review">Review</SelectItem><SelectItem value="Completed">Completed</SelectItem></SelectContent></Select></div>
          <div className="space-y-2"><Label>Priority</Label><Select value={editData.priority} onValueChange={(v) => setEditData({...editData, priority: v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Low">Low</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="High">High</SelectItem></SelectContent></Select></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onOpenChange}>Cancel</Button>
          <Button onClick={handleSave} disabled={mutation.isPending}>{mutation.isPending ? 'Saving...' : 'Save Changes'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AllTasks;