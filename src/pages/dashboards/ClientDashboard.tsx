import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Briefcase, CreditCard, FileText, Users, MessageSquare, Calendar, CheckSquare, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';

const ClientDashboard = () => {
  const clientMetrics = {
    activeProjects: 3,
    completedTasks: 47,
    totalHours: 156,
    satisfaction: 4.9,
    onTrack: 2,
    inReview: 1
  };

  const myProjects = [
    { 
      name: 'Website Redesign', 
      progress: 85, 
      status: 'On Track', 
      nextMilestone: 'Final Review',
      dueDate: '2024-02-15',
      teamLead: 'Sarah Johnson'
    },
    { 
      name: 'Mobile App Development', 
      progress: 45, 
      status: 'In Progress', 
      nextMilestone: 'Beta Testing',
      dueDate: '2024-03-20',
      teamLead: 'Mike Chen'
    },
    { 
      name: 'Brand Identity Package', 
      progress: 92, 
      status: 'Review', 
      nextMilestone: 'Final Approval',
      dueDate: '2024-01-30',
      teamLead: 'Emily Davis'
    },
  ];

  const pendingApprovals = [
    { item: 'Homepage Final Design', type: 'Design Approval', project: 'Website Redesign', urgent: true },
    { item: 'Brand Color Palette', type: 'Brand Approval', project: 'Brand Identity', urgent: false },
  ];

  const recentUpdates = [
    { project: 'Website Redesign', update: 'Homepage mockups completed and ready for review', time: '2 hours ago' },
    { project: 'Mobile App', update: 'User authentication flow implemented successfully', time: '1 day ago' },
    { project: 'Brand Identity', update: 'Logo concepts delivered for feedback', time: '2 days ago' },
  ];
  return (
    <DashboardLayout
      title="Client Dashboard"
      description="Project status and communication hub"
      headerIcon={<Briefcase className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <MessageSquare className="mr-2 h-4 w-4" />
          Contact Support
        </Button>
      }
      requiresPermission={{ resource: 'projects', action: 'read' }}
    >

        {/* Project Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
              <Briefcase className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{clientMetrics.activeProjects}</div>
              <p className="text-xs text-muted-foreground">{clientMetrics.onTrack} on track, {clientMetrics.inReview} in review</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Tasks</CardTitle>
              <CheckSquare className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{clientMetrics.completedTasks}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hours Worked</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{clientMetrics.totalHours}</div>
              <p className="text-xs text-muted-foreground">Total this project</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Satisfaction</CardTitle>
              <Star className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{clientMetrics.satisfaction}</div>
              <p className="text-xs text-muted-foreground">Average rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Approvals Alert */}
        {pendingApprovals.length > 0 && (
          <Card className="mb-8 border-orange-200 bg-orange-50/50">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <Clock className="mr-2 h-5 w-5" />
                Awaiting Your Approval ({pendingApprovals.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingApprovals.map((approval, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div>
                    <p className="font-medium">{approval.item}</p>
                    <p className="text-sm text-muted-foreground">{approval.type} • {approval.project}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {approval.urgent && <Badge variant="destructive">Urgent</Badge>}
                    <Link to={`/dashboard/client/projects/${approval.project.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Button size="sm">Review</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* My Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                My Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {myProjects.map((project, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{project.name}</h4>
                    <Badge variant={
                      project.status === 'On Track' ? 'default' :
                      project.status === 'Review' ? 'secondary' : 'outline'
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
                  <div className="text-xs text-muted-foreground">
                    <p>Next: {project.nextMilestone}</p>
                    <p>Due: {project.dueDate}</p>
                    <p>Lead: {project.teamLead}</p>
                  </div>
                </div>
              ))}
              <Link to="/dashboard/client/projects">
                <Button variant="outline" className="w-full">View All Projects</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Updates */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Recent Project Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentUpdates.map((update, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{update.project}</h4>
                    <span className="text-xs text-muted-foreground">{update.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{update.update}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Client Portal Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/dashboard/client/projects">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View project details and timelines</p>
                <div className="mt-3 text-2xl font-bold text-primary">{clientMetrics.activeProjects}</div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/dashboard/client/billing">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Billing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Invoices and payment history</p>
                <div className="mt-3 text-sm font-bold text-accent">$8,500 outstanding</div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/dashboard/client/messages">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Communicate with your team</p>
                <div className="mt-3 text-sm font-bold text-primary">3 unread messages</div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/dashboard/client/reports">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <FileText className="mr-2 h-5 w-5" />
                  Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Generate custom project reports</p>
                <div className="mt-3 text-sm font-bold text-accent">Download insights</div>
              </CardContent>
            </Card>
          </Link>
        </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;