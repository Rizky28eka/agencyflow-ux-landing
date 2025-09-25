
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CheckSquare, Plus, MoreHorizontal } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const TeamLeadTasks = () => {
  const tasks = [
    { id: 'TASK-102', name: 'Develop homepage frontend', project: 'Website Redesign', assignee: 'Mike C.', status: 'In Progress', priority: 'High' },
    { id: 'TASK-201', name: 'Implement user authentication flow', project: 'Mobile App', assignee: 'Mike C.', status: 'To Do', priority: 'High' },
    { id: 'TASK-101', name: 'Design new homepage mockups', project: 'Website Redesign', assignee: 'Sarah J.', status: 'Completed', priority: 'High' },
  ];

  return (
    <DashboardLayout
      role="team-lead"
      title="Task Assignment"
      description="Assign and monitor tasks for your team."
      headerIcon={<CheckSquare className="h-8 w-8 text-primary" />}
      headerAction={<Button className="bg-gradient-primary"><Plus className="mr-2 h-4 w-4" /> Assign New Task</Button>}
    >
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Team Task Overview</CardTitle>
                    <div className="flex items-center gap-2">
                        <Input placeholder="Search tasks..." className="w-64" />
                        <Select>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Filter by assignee" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Assignees</SelectItem>
                                <SelectItem value="mike">Mike C.</SelectItem>
                                <SelectItem value="sarah">Sarah J.</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="todo">To Do</SelectItem>
                                <SelectItem value="inprogress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Task</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead>Assignee</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.map(task => (
                            <TableRow key={task.id}>
                                <TableCell className="font-medium">{task.name}</TableCell>
                                <TableCell>{task.project}</TableCell>
                                <TableCell>{task.assignee}</TableCell>
                                <TableCell><Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'}>{task.priority}</Badge></TableCell>
                                <TableCell><Badge variant={task.status === 'Completed' ? 'secondary' : 'default'}>{task.status}</Badge></TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                                            <DropdownMenuItem>Re-assign</DropdownMenuItem>
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

export default TeamLeadTasks;
