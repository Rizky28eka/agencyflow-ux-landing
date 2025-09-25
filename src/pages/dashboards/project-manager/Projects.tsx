import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Plus, Calendar, Users, Clock, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GanttChart from '@/components/projects/GanttChart';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api'; // Import the new API client

// Define the type for a single project
interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  progress: number;
  team: number;
  deadline: string;
  priority: string;
}

const ProjectManagerProjects = () => {
  const { data: projects, isLoading, isError, error } = useQuery<Project[]>({ 
    queryKey: ['projects'], 
    queryFn: () => api.get('/api/projects') // Use the new API client
  });

  const tasks = [
    { name: 'Task 1', startDate: '2024-01-01', endDate: '2024-01-10' },
    { name: 'Task 2', startDate: '2024-01-05', endDate: '2024-01-15' },
    { name: 'Task 3', startDate: '2024-01-12', endDate: '2024-01-25' },
    { name: 'Task 4', startDate: '2024-01-20', endDate: '2024-02-05' },
  ];

  const renderProjectGrid = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {[...Array(4)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (isError) {
      return <p>Error loading projects: {error.message}</p>;
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        {projects?.map((project, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{project.client}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.priority === 'High' ? 'bg-red-100 text-red-800' :
                    project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {project.priority}
                  </span>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">{project.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{project.team} members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{project.deadline}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'Review' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
                <Link to={`/dashboard/project-manager/projects/${project.id}`}>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderKanbanView = () => {
    if (isLoading) {
      return (
        <div className="flex space-x-6 overflow-x-auto p-1 mt-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex-shrink-0 w-80">
              <Card className="bg-muted/50 h-full flex flex-col">
                <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      );
    }

    if (isError) {
      return <p>Error loading projects: {error.message}</p>;
    }

    return (
      <div className="flex space-x-6 overflow-x-auto p-1 mt-4">
        {['Planning', 'In Progress', 'Review', 'Completed'].map(status => (
          <div key={status} className="flex-shrink-0 w-80">
            <Card className="bg-muted/50 h-full flex flex-col">
              <CardHeader><CardTitle>{status}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {projects?.filter(p => p.status === status).map(project => (
                  <Link to={`/dashboard/project-manager/projects/${project.id}`} key={project.id}>
                    <Card className="bg-background hover:bg-muted/50 cursor-pointer">
                      <CardContent className="p-4 space-y-2">
                        <h4 className="font-semibold">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                        <div className="flex justify-between text-xs">
                          <span>Progress: {project.progress}%</span>
                          <span>Due: {project.deadline}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout
      role="project-manager"
      title="Active Projects"
      description="Manage all projects and their progress"
      headerIcon={<Target className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      }
    >
      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Cards remain static for now, can be hooked to API later */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Team Members</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">18</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          {renderProjectGrid()}
        </TabsContent>
        <TabsContent value="kanban">
          {renderKanbanView()}
        </TabsContent>
        <TabsContent value="gantt">
          <GanttChart tasks={tasks} />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ProjectManagerProjects;