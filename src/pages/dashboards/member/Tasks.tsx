
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, Calendar, Flag, Plus, Filter, MoreHorizontal } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

const MemberTasks = () => {
  // Mock data is now grouped by status for Kanban board
  const tasks = [
    { id: 1, title: 'Design homepage mockup', project: 'Website Redesign', priority: 'High', status: 'In Progress', dueDate: '2024-01-25' },
    { id: 2, title: 'Implement user authentication', project: 'Mobile App', priority: 'Medium', status: 'To Do', dueDate: '2024-01-28' },
    { id: 3, title: 'Write API documentation', project: 'E-commerce Platform', priority: 'Low', status: 'Done', dueDate: '2024-01-30' },
    { id: 4, title: 'Fix responsive layout issues', project: 'Website Redesign', priority: 'High', status: 'To Do', dueDate: '2024-01-26' },
    { id: 5, title: 'Develop settings page', project: 'Mobile App', priority: 'Medium', status: 'In Progress', dueDate: '2024-02-05' },
    { id: 6, title: 'Deploy staging server', project: 'E-commerce Platform', priority: 'High', status: 'Done', dueDate: '2024-01-20' },
  ];

  const columns = {
    'To Do': tasks.filter(t => t.status === 'To Do'),
    'In Progress': tasks.filter(t => t.status === 'In Progress'),
    'Done': tasks.filter(t => t.status === 'Done'),
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout
      role="member"
      title="My Tasks (Kanban)"
      description="Drag and drop tasks to change their status."
      headerIcon={<CheckSquare className="h-8 w-8 text-primary" />}
      headerAction={
        <div className="flex space-x-2">
          <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
          <Button className="bg-gradient-primary"><Plus className="mr-2 h-4 w-4" /> New Task</Button>
        </div>
      }
    >
      <div className="flex space-x-6 overflow-x-auto p-1 h-full">
        {Object.entries(columns).map(([status, tasksInColumn]) => (
          <div key={status} className="flex-shrink-0 w-80 h-full">
            <Card className="bg-muted/50 h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{status}</span>
                  <span className="text-sm font-normal text-muted-foreground bg-background px-2 py-1 rounded-full">{tasksInColumn.length}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 overflow-y-auto flex-grow">
                {tasksInColumn.map(task => (
                  <Card key={task.id} className="bg-background">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <Link to={`/dashboard/member/tasks/${task.id}`} className="font-semibold leading-tight hover:text-primary">
                          {task.title}
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                              <Link to={`/dashboard/member/tasks/${task.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Add Comment</DropdownMenuItem>
                            <DropdownMenuItem>Attach File</DropdownMenuItem>
                            <DropdownMenuItem>Move to To Do</DropdownMenuItem>
                            <DropdownMenuItem>Move to In Progress</DropdownMenuItem>
                            <DropdownMenuItem>Move to Done</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-xs text-muted-foreground">{task.project}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{task.dueDate}</span>
                        </div>
                        <Badge variant={getPriorityBadgeVariant(task.priority)}>
                          <Flag className="h-3 w-3 mr-1" />
                          {task.priority}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default MemberTasks;
