
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Target, Calendar, DollarSign, Edit, FileText, Download, Share2, Plus } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const ProjectDetails = () => {
  // Mock data for a single project. In a real app, this would be fetched based on URL param.
  const project = {
    name: 'Website Redesign',
    client: 'TechCorp',
    description: 'A complete overhaul of the TechCorp corporate website to improve user experience, modernize the design, and migrate to a new CMS. Key objectives include improving lead generation by 20% and reducing bounce rate by 30%.',
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

  const files = [
      { name: 'Project_Brief_v2.pdf', size: '2.1 MB' },
      { name: 'Initial_Mockups.fig', size: '15.8 MB' },
      { name: 'Technical_Specifications.docx', size: '850 KB' },
  ];

  return (
    <DashboardLayout
      role="project-manager"
      title={project.name}
      description={`Details for project with ${project.client}`}
      headerIcon={<Target className="h-8 w-8 text-primary" />}
      headerAction={
        <div className="flex items-center gap-2">
            <Button variant="outline"><Share2 className="mr-2 h-4 w-4"/> Share</Button>
            <Button><Edit className="mr-2 h-4 w-4" /> Edit Project</Button>
        </div>
      }
    >
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-8 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
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
            </div>
          </div>
        </TabsContent>
        <TabsContent value="tasks">
            <Card>
                <CardHeader><CardTitle>Task List</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Task</TableHead><TableHead>Assignee</TableHead><TableHead>Status</TableHead><TableHead>Due Date</TableHead></TableRow></TableHeader>
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
        </TabsContent>
        <TabsContent value="budget">
            <Card>
                <CardHeader><CardTitle>Budget Details</CardTitle></CardHeader>
                <CardContent>
                    <p>Budget details will be displayed here.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="team">
            <Card>
                <CardHeader><CardTitle>Assigned Team</CardTitle></CardHeader>
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
        </TabsContent>
        <TabsContent value="files">
            <Card>
                <CardHeader><CardTitle>Project Files</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    {files.map((file, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <FileText className="h-4 w-4" />
                                <div>
                                    <p className="text-sm font-medium">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">{file.size}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="documents">
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>Project Documents</CardTitle>
                    <Button><Plus className="mr-2 h-4 w-4"/> Create New Document</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Last Modified</TableHead><TableHead>Created By</TableHead></TableRow></TableHeader>
                        <TableBody>
                            <TableRow><TableCell>Meeting Notes 2024-01-15</TableCell><TableCell>2 days ago</TableCell><TableCell>Sarah J.</TableCell></TableRow>
                            <TableRow><TableCell>Project Brief v2</TableCell><TableCell>5 days ago</TableCell><TableCell>Mike C.</TableCell></TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="discussions">
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>Discussion Forum</CardTitle>
                    <Button><Plus className="mr-2 h-4 w-4"/> Start New Discussion</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Topic</TableHead><TableHead>Last Reply</TableHead><TableHead>Replies</TableHead></TableRow></TableHeader>
                        <TableBody>
                            <TableRow><TableCell>Q3 Marketing Strategy</TableCell><TableCell>2 hours ago by Alex R.</TableCell><TableCell>12</TableCell></TableRow>
                            <TableRow><TableCell>Feedback on new homepage mockups</TableCell><TableCell>1 day ago by Sarah J.</TableCell><TableCell>8</TableCell></TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="meetings">
            <Card>
                <CardHeader><CardTitle>Meeting Summaries</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">Project Kick-off Meeting</p>
                            <Button size="sm">Generate Summary</Button>
                        </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">Weekly Sync - 2024-01-22</p>
                            <Button size="sm">Generate Summary</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ProjectDetails;
