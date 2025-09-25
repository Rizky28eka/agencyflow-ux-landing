import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CheckSquare,
  Plus,
  Filter,
  MoreHorizontal,
  Bot,
} from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const AllTasks = () => {
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  const tasks = [
    {
      id: 'TASK-101',
      name: 'Design new homepage mockups',
      project: 'Website Redesign',
      assignee: 'Sarah J.',
      status: 'Completed',
      priority: 'High',
      dueDate: '2024-01-15',
    },
    {
      id: 'TASK-102',
      name: 'Develop homepage frontend',
      project: 'Website Redesign',
      assignee: 'Mike C.',
      status: 'In Progress',
      priority: 'High',
      dueDate: '2024-01-25',
    },
    {
      id: 'TASK-103',
      name: 'Setup backend API for contact form',
      project: 'Website Redesign',
      assignee: 'Emily D.',
      status: 'In Progress',
      priority: 'Medium',
      dueDate: '2024-01-28',
    },
    {
      id: 'TASK-201',
      name: 'Implement user authentication flow',
      project: 'Mobile App',
      assignee: 'Mike C.',
      status: 'To Do',
      priority: 'High',
      dueDate: '2024-01-28',
    },
    {
      id: 'TASK-202',
      name: 'Create database schema for profiles',
      project: 'Mobile App',
      assignee: 'Emily D.',
      status: 'To Do',
      priority: 'High',
      dueDate: '2024-01-30',
    },
    {
      id: 'TASK-301',
      name: 'Write API documentation for checkout',
      project: 'E-commerce Platform',
      assignee: 'Alex R.',
      status: 'Review',
      priority: 'Low',
      dueDate: '2024-01-30',
    },
  ];

  const aiSuggestions = [
    {
      title: 'Create UI tests for login flow',
      assignee: 'Alex R.',
      reason:
        'Alex has experience with testing and is currently underutilized.',
    },
    {
      title: 'Optimize database queries for user profiles',
      assignee: 'Emily D.',
      reason: 'Emily has expertise in database optimization.',
    },
  ];

  const getPriorityBadgeVariant = (level: string) => {
    switch (level) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'secondary';
      case 'Low':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'secondary';
      case 'In Progress':
        return 'default';
      case 'To Do':
        return 'outline';
      case 'Review':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <DashboardLayout
      role="project-manager"
      title="All Tasks"
      description="A global view of all tasks across all projects."
      headerIcon={<CheckSquare className="h-8 w-8 text-primary" />}
      headerAction={
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowAISuggestions(!showAISuggestions)}
          >
            <Bot className="mr-2 h-4 w-4" /> AI Suggestions
          </Button>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add New Task
          </Button>
        </div>
      }
    >
      {/* AI Suggestions */}
      {showAISuggestions && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>AI Task Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {aiSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-3 bg-muted/50 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <p className="font-semibold">{suggestion.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Assign to: {suggestion.assignee} | Reason:{' '}
                    {suggestion.reason}
                  </p>
                </div>
                <Button size="sm">Create Task</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" /> Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
          <Select defaultValue="all-projects">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-projects">All Projects</SelectItem>
              <SelectItem value="website-redesign">Website Redesign</SelectItem>
              <SelectItem value="mobile-app">Mobile App</SelectItem>
              <SelectItem value="ecommerce-platform">
                E-commerce Platform
              </SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-assignees">
            <SelectTrigger className="w-full sm:w-[180px]">
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
            <SelectTrigger className="w-full sm:w-[180px]">
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

          <Button className="w-full sm:w-auto">Apply Filters</Button>
        </CardContent>
      </Card>

      {/* Task Table */}
      <Card>
        <CardContent className="pt-6 overflow-x-auto">
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
                  <TableCell className="text-muted-foreground">
                    {task.project}
                  </TableCell>
                  <TableCell>{task.assignee}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadgeVariant(task.priority)}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(task.status)}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <Dialog>
                            <DialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit Task</DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader><DialogTitle>Edit Task</DialogTitle></DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="space-y-2"><Label>Task Name</Label><Input defaultValue={task.name} /></div>
                                    <div className="space-y-2"><Label>Project</Label><Input defaultValue={task.project} /></div>
                                    <div className="space-y-2"><Label>Assignee</Label><Input defaultValue={task.assignee} /></div>
                                    <div className="space-y-2"><Label>Due Date</Label><Input type="date" defaultValue={task.dueDate} /></div>
                                    <div className="space-y-2"><Label>Priority</Label><Input defaultValue={task.priority} /></div>
                                    <div className="space-y-2"><Label>Status</Label><Input defaultValue={task.status} /></div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                                    <DialogClose asChild><Button type="button">Save Changes</Button></DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Reassign</DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader><DialogTitle>Reassign Task</DialogTitle></DialogHeader>
                                <div className="py-4">
                                    <Label>New Assignee</Label>
                                    <Select><SelectTrigger><SelectValue placeholder="Select a team member..." /></SelectTrigger><SelectContent><SelectItem value="sarah">Sarah Johnson</SelectItem></SelectContent></Select>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                                    <DialogClose asChild><Button type="button">Reassign</Button></DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <DropdownMenuItem asChild>
                            <Link to={`/dashboard/project-manager/tasks/${task.id}`}>View Details</Link>
                        </DropdownMenuItem>
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