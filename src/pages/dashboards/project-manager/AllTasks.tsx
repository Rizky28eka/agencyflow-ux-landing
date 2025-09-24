
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CheckSquare, Plus, Filter, MoreHorizontal } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const AllTasks = () => {
  const tasks = [
    { id: 'TASK-101', name: 'Design new homepage mockups', project: 'Website Redesign', assignee: 'Sarah J.', status: 'Completed', priority: 'High', dueDate: '2024-01-15' },
    { id: 'TASK-102', name: 'Develop homepage frontend', project: 'Website Redesign', assignee: 'Mike C.', status: 'In Progress', priority: 'High', dueDate: '2024-01-25' },
    { id: 'TASK-103', name: 'Setup backend API for contact form', project: 'Website Redesign', assignee: 'Emily D.', status: 'In Progress', priority: 'Medium', dueDate: '2024-01-28' },
    { id: 'TASK-201', name: 'Implement user authentication flow', project: 'Mobile App', assignee: 'Mike C.', status: 'To Do', priority: 'High', dueDate: '2024-01-28' },
    { id: 'TASK-202', name: 'Create database schema for profiles', project: 'Mobile App', assignee: 'Emily D.', status: 'To Do', priority: 'High', dueDate: '2024-01-30' },
    { id: 'TASK-301', name: 'Write API documentation for checkout', project: 'E-commerce Platform', assignee: 'Alex R.', status: 'Review', priority: 'Low', dueDate: '2024-01-30' },
  ];

  const getPriorityBadgeVariant = (level: string) => {
    switch (level) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'default';
    }
  };
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Completed': return 'secondary';
      case 'In Progress': return 'default';
      case 'To Do': return 'outline';
      case 'Review': return 'default';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout
      role="project-manager"
      title="All Tasks"
      description="A global view of all tasks across all projects."
      headerIcon={<CheckSquare className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add New Task
        </Button>
      }
    >
      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
            <CardTitle className="flex items-center"><Filter className="mr-2 h-5 w-5" /> Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
            <Select defaultValue="all-projects">
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by Project" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all-projects">All Projects</SelectItem>
                    <SelectItem value="website-redesign">Website Redesign</SelectItem>
                    <SelectItem value="mobile-app">Mobile App</SelectItem>
                    <SelectItem value="ecommerce-platform">E-commerce Platform</SelectItem>
                </SelectContent>
            </Select>
            <Select defaultValue="all-assignees">
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by Assignee" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all-assignees">All Assignees</SelectItem>
                    <SelectItem value="sarah-j">Sarah J.</SelectItem>
                    <SelectItem value="mike-c">Mike C.</SelectItem>
                    <SelectItem value="emily-d">Emily D.</SelectItem>
                    <SelectItem value="alex-r">Alex R.</SelectItem>
                </SelectContent>
            </Select>
            <Select defaultValue="all-status">
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all-status">All Statuses</SelectItem>
                    <SelectItem value="to-do">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
            </Select>
            <Button>Apply Filters</Button>
        </CardContent>
      </Card>

      {/* Task Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell className="text-muted-foreground">{task.project}</TableCell>
                  <TableCell>{task.assignee}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadgeVariant(task.priority)}>{task.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(task.status)}>{task.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Edit Task</DropdownMenuItem>
                        <DropdownMenuItem>Reassign</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AllTasks;
