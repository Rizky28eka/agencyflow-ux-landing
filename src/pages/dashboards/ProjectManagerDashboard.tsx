import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, CheckSquare, Clock, TrendingUp, Plus, FileText, Target, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const ProjectManagerDashboard = () => {
  const projectMetrics = {
    activeProjects: 12,
    tasksCompleted: 184,
    teamMembers: 18,
    avgCompletion: 87,
    onTrack: 8,
    atRisk: 4,
    overdue: 0
  };

  const activeProjects = [
    { name: 'TechCorp Website', progress: 85, status: 'On Track', deadline: '2024-02-15', team: 5 },
    { name: 'StartupXYZ App', progress: 45, status: 'At Risk', deadline: '2024-03-20', team: 8 },
    { name: 'RetailCo Rebrand', progress: 92, status: 'Review', deadline: '2024-01-30', team: 3 },
    { name: 'E-commerce Platform', progress: 60, status: 'On Track', deadline: '2024-04-10', team: 6 },
  ];

  const upcomingDeadlines = [
    { project: 'RetailCo Rebrand', task: 'Final Brand Guidelines', date: '2024-01-30', daysLeft: 6 },
    { project: 'TechCorp Website', task: 'Homepage Development', date: '2024-02-05', daysLeft: 12 },
    { project: 'StartupXYZ App', task: 'User Testing Phase', date: '2024-02-10', daysLeft: 17 },
  ];

  const handleAction = (action: string) => {
    toast.success(`${action} action completed successfully!`);
  };

  return (
    <DashboardLayout
      role="project-manager"
      title="Project Manager Dashboard"
      description="Project oversight and team coordination"
      headerIcon={<Users className="h-8 w-8 text-primary" />}
      headerAction={
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-gradient-primary"><Plus className="mr-2 h-4 w-4" /> New Project</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Create New Project</DialogTitle></DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2"><Label>Project Name</Label><Input placeholder="e.g., Q3 Marketing Campaign" /></div>
                    <div className="space-y-2"><Label>Client</Label><Input placeholder="e.g., TechCorp" /></div>
                    <div className="space-y-2"><Label>Start Date</Label><Input type="date" /></div>
                    <div className="space-y-2"><Label>End Date</Label><Input type="date" /></div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                    <DialogClose asChild><Button type="button" onClick={() => handleAction('Project Creation')}>Create Project</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      }
      requiresPermission={{ resource: 'projects', action: 'read' }}
    >

        {/* Project Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{projectMetrics.activeProjects}</div>
              <p className="text-xs text-muted-foreground">{projectMetrics.onTrack} on track, {projectMetrics.atRisk} at risk</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tasks Completed</CardTitle>
              <CheckSquare className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{projectMetrics.tasksCompleted}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team Members</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{projectMetrics.teamMembers}</div>
              <p className="text-xs text-muted-foreground">Across all projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Completion</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{projectMetrics.avgCompletion}%</div>
              <p className="text-xs text-muted-foreground">On-time delivery</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Active Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Active Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeProjects.slice(0, 3).map((project, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{project.name}</h4>
                    <Badge variant={
                      project.status === 'On Track' ? 'default' :
                      project.status === 'At Risk' ? 'destructive' : 'secondary'
                    }>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{project.team} team members</span>
                    <span>Due: {project.deadline}</span>
                  </div>
                </div>
              ))}
              <Link to="/dashboard/project-manager/projects">
                <Button variant="outline" className="w-full">View All Projects</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">{deadline.project}</h4>
                    <p className="text-xs text-muted-foreground">{deadline.task}</p>
                    <p className="text-xs text-muted-foreground">Due: {deadline.date}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={deadline.daysLeft <= 7 ? 'destructive' : 'default'}>
                      {deadline.daysLeft} days
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Project Management Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/dashboard/project-manager/projects">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Target className="mr-2 h-5 w-5" />
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Manage all active projects</p>
                <div className="mt-3 text-2xl font-bold text-primary">{projectMetrics.activeProjects}</div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard/project-manager/tasks">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CheckSquare className="mr-2 h-5 w-5" />
                  All Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Global task management</p>
                <div className="mt-3 text-2xl font-bold text-accent">{projectMetrics.tasksCompleted}</div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard/project-manager/resource-management">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="mr-2 h-5 w-5" />
                  Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Team allocation and capacity</p>
                <div className="mt-3 text-2xl font-bold text-primary">{projectMetrics.teamMembers}</div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard/project-manager/risk-management">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Risk Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Identify and mitigate risks</p>
                <div className="mt-3 text-sm font-bold text-accent">3 active risks</div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Additional Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/dashboard/project-manager/time-report">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="mr-2 h-5 w-5" />
                  Time Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Analyze time allocation and productivity</p>
                <div className="mt-3 text-sm font-bold text-primary">152h this week</div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard/project-manager/team">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="mr-2 h-5 w-5" />
                  Team Coordination
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Schedule meetings and coordinate teams</p>
                <div className="mt-3 text-sm font-bold text-accent">5 meetings today</div>
              </CardContent>
            </Card>
          </Link>
        </div>
    </DashboardLayout>
  );
};

export default ProjectManagerDashboard;