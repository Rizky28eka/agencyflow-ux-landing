import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Target, Calendar, DollarSign, Edit, FileText, Download, Share2, Plus, ArrowLeft } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

// Type for the main project data fetched from the API
interface ProjectData {
  id: number;
  name: string;
  client: string;
  description: string;
  status: string;
  progress: number;
  deadline: string;
  budget: number;
  spent: number;
}

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const { data: project, isLoading, isError, error } = useQuery<ProjectData>({ 
    queryKey: ['project', projectId], 
    queryFn: () => api.get(`/api/projects/${projectId}`),
    enabled: !!projectId,
  });

  // TODO: The data below should be fetched from dedicated API endpoints
  // e.g., /api/projects/:id/tasks, /api/projects/:id/team, etc.
  const tasks = [
    { id: 'TASK-101', name: 'Design new homepage mockups', assignee: 'Sarah J.', status: 'Completed', dueDate: '2024-01-15' },
    { id: 'TASK-102', name: 'Develop homepage frontend', assignee: 'Mike C.', status: 'In Progress', dueDate: '2024-01-25' },
  ];
  const team = [
    { name: 'Sarah Johnson', role: 'UI/UX Designer', avatar: '/placeholder.svg' },
    { name: 'Mike Chen', role: 'Frontend Developer', avatar: '/placeholder.svg' },
  ];
  const files = [
      { name: 'Project_Brief_v2.pdf', size: '2.1 MB' },
      { name: 'Initial_Mockups.fig', size: '15.8 MB' },
  ];

  if (isLoading) {
    return (
      <DashboardLayout title="Loading Project..." description="Please wait..." headerIcon={<Target />}>
        <Skeleton className="h-10 w-full mb-4" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
            <div className="lg:col-span-2 space-y-8">
                <Card><CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent></Card>
                <Card><CardContent className="p-6"><Skeleton className="h-32 w-full" /></CardContent></Card>
            </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
        <DashboardLayout title="Error" description="Failed to load project" headerIcon={<Target />}>
            <p className="text-red-500">{error.message}</p>
        </DashboardLayout>
    );
  }

  if (!project) {
    return (
        <DashboardLayout title="Not Found" description="Project could not be found" headerIcon={<Target />}>
            <p>The requested project does not exist.</p>
        </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title={`${project.name} - ${project.client}`}
      description={project.description || 'No description available.'}
      headerIcon={<Target className="h-8 w-8 text-primary" />}
      headerAction={
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate('/dashboard/project-manager/projects')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
            <Button><Edit className="mr-2 h-4 w-4" /> Edit Project</Button>
        </div>
      }
    >
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader><CardTitle>Project Description</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">{project.description}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Project Overview</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge className="w-fit">{project.status}</Badge>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-muted-foreground">Deadline</span>
                    <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" /> {new Date(project.deadline).toLocaleDateString()}</div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-muted-foreground">Budget</span>
                    <div className="flex items-center"><DollarSign className="h-4 w-4 mr-2" /> ${project.spent?.toLocaleString() || 0} / ${project.budget?.toLocaleString() || 0}</div>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                    <span className="text-sm text-muted-foreground">Overall Progress: {project.progress}%</span>
                    <Progress value={project.progress} className="mt-2" />
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="tasks">
            <Card>
                <CardHeader><CardTitle>Task List (TODO: Fetch from API)</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Task</TableHead><TableHead>Assignee</TableHead><TableHead>Status</TableHead><TableHead>Due Date</TableHead></TableRow></TableHeader>
                        <TableBody>
                        {tasks.map(task => (
                            <TableRow key={task.id}>
                            <TableCell>{task.name}</TableCell>
                            <TableCell>{task.assignee}</TableCell>
                            <TableCell><Badge>{task.status}</Badge></TableCell>
                            <TableCell>{task.dueDate}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="team">
            <Card>
                <CardHeader><CardTitle>Assigned Team (TODO: Fetch from API)</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                {team.map(member => (
                    <div key={member.name} className="flex items-center space-x-3">
                    <Avatar><AvatarImage src={member.avatar} /><AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                    <div><p className="font-semibold">{member.name}</p><p className="text-sm text-muted-foreground">{member.role}</p></div>
                    </div>
                ))}
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="files">
            <Card>
                <CardHeader><CardTitle>Project Files (TODO: Fetch from API)</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    {files.map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <FileText className="h-4 w-4" />
                                <div><p className="text-sm font-medium">{file.name}</p><p className="text-xs text-muted-foreground">{file.size}</p></div>
                            </div>
                            <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="discussions">
            <Card><CardHeader><CardTitle>Discussions (TODO: Implement)</CardTitle></CardHeader><CardContent><p>Discussion forum will be implemented here.</p></CardContent></Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ProjectDetails;
