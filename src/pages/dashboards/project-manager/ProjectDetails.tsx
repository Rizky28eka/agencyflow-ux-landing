
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Target, Calendar, DollarSign, Edit } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const ProjectDetails = () => {
  // Mock data for a single project. In a real app, this would be fetched based on URL param.
  const project = {
    name: 'Website Redesign',
    client: 'TechCorp',
    status: 'In Progress',
    progress: 75,
    deadline: '2024-02-15',
    budget: 50000,
    spent: 35000,
  };

  const tasks = [
    { id: 'TASK-101', name: 'Design new homepage mockups', assignee: 'Sarah J.', status: 'Completed', dueDate: '2024-01-15' },
    { id: 'TASK-102', name: 'Develop homepage frontend', assignee: 'Mike C.', status: 'In Progress', dueDate: '2024-01-25' },
    { id: 'TASK-103', name: 'Setup backend API for contact form', assignee: 'Emily D.', status: 'In Progress', dueDate: '2024-01-28' },
    { id: 'TASK-104', name: 'QA testing for homepage', assignee: 'Alex R.', status: 'Not Started', dueDate: '2024-02-05' },
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'UI/UX Designer', avatar: '/placeholder.svg' },
    { name: 'Mike Chen', role: 'Frontend Developer', avatar: '/placeholder.svg' },
    { name: 'Emily Davis', role: 'Backend Developer', avatar: '/placeholder.svg' },
    { name: 'Alex Rodriguez', role: 'QA Engineer', avatar: '/placeholder.svg' },
  ];

  return (
    <DashboardLayout
      role="project-manager"
      title={project.name}
      description={`Details for project with ${project.client}`}
      headerIcon={<Target className="h-8 w-8 text-primary" />}
      headerAction={<Button><Edit className="mr-2 h-4 w-4" /> Edit Project</Button>}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Project Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className="w-fit" variant="default">{project.status}</Badge>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">Deadline</span>
                <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" /> {project.deadline}</div>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">Budget</span>
                <div className="flex items-center"><DollarSign className="h-4 w-4 mr-2" /> ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</div>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">Hourly Rate</span>
                <div className="flex items-center"><DollarSign className="h-4 w-4 mr-2" /> $100.00 / hour</div>
              </div>
            </CardContent>
            <div className="p-6 pt-0">
                <span className="text-sm text-muted-foreground">Overall Progress: {project.progress}%</span>
                <Progress value={project.progress} className="mt-2" />
            </div>
          </Card>

          {/* Task List */}
          <Card>
            <CardHeader>
              <CardTitle>Task List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map(task => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.name}</TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell><Badge variant={task.status === 'Completed' ? 'secondary' : 'default'}>{task.status}</Badge></TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Team & Activity */}
        <div className="lg:col-span-1 space-y-8">
          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle>Assigned Team</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {team.map(member => (
                <div key={member.name} className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetails;
