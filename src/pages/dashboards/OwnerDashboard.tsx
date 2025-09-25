import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Users, DollarSign, TrendingUp, Settings, BarChart3, Building, Zap, CheckCircle, UserPlus, Briefcase, Target, TrendingDown, Heart, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

const OwnerDashboard = () => {
  const companyMetrics = {
    totalRevenue: 1284500,
    monthlyGrowth: 18.2,
    activeProjects: 48,
    teamMembers: 24,
    clientSatisfaction: 4.8,
    profitMargin: 28.4,
    mrr: 120000,
    churn: 2.1,
    cac: 5000,
    ltv: 25000,
  };

  const financialTrends = [
      { month: 'Jan', revenue: 80000, profit: 20000 },
      { month: 'Feb', revenue: 85000, profit: 22000 },
      { month: 'Mar', revenue: 95000, profit: 28000 },
      { month: 'Apr', revenue: 92000, profit: 25000 },
      { month: 'May', revenue: 110000, profit: 35000 },
      { month: 'Jun', revenue: 120000, profit: 40000 },
  ];

  const departmentPerformance = [
    { name: 'Design', performance: 92, projects: 12, revenue: 450000 },
    { name: 'Development', performance: 88, projects: 18, revenue: 680000 },
    { name: 'Marketing', performance: 95, projects: 8, revenue: 320000 },
    { name: 'Finance', performance: 90, projects: 4, revenue: 150000 },
  ];

  const upcomingMilestones = [
    { project: 'TechCorp Website', milestone: 'Final Delivery', date: '2024-02-15', status: 'On Track' },
    { project: 'StartupXYZ App', milestone: 'Beta Release', date: '2024-02-20', status: 'At Risk' },
    { project: 'RetailCo Rebrand', milestone: 'Brand Guidelines', date: '2024-02-10', status: 'Completed' },
  ];

  const recentActivity = [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: "Project 'TechCorp Website' milestone completed ahead of schedule.",
      time: "2 hours ago"
    },
    {
      icon: <UserPlus className="h-5 w-5 text-blue-500" />,
      text: "New senior developer Alex Green joined the development team.",
      time: "1 day ago"
    },
    {
      icon: <DollarSign className="h-5 w-5 text-yellow-500" />,
      text: "Q4 revenue target exceeded by 12.5% - $1.28M total.",
      time: "2 days ago"
    },
    {
      icon: <Briefcase className="h-5 w-5 text-purple-500" />,
      text: "3 new enterprise clients signed this month.",
      time: "3 days ago"
    }
  ];

  return (
    <DashboardLayout
      role="owner"
      title="Owner Dashboard"
      description="Complete overview and control"
      headerIcon={<Crown className="h-8 w-8 text-primary" />}
      headerAction={
        <div className="flex items-center gap-2">
          <Button variant="outline"><Mail className="mr-2 h-4 w-4" /> Schedule Reports</Button>
          <Button className="bg-gradient-primary">
            <Settings className="mr-2 h-4 w-4" />
            Company Settings
          </Button>
        </div>
      }
      requiresPermission={{ resource: 'company', action: 'read' }}
    >

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/owner/finance">
                <div className="text-2xl font-bold text-foreground hover:underline">${companyMetrics.totalRevenue.toLocaleString()}</div>
              </Link>
              <p className="text-xs text-muted-foreground">+{companyMetrics.monthlyGrowth}% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
              <BarChart3 className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/owner/analytics">
                <div className="text-2xl font-bold text-foreground hover:underline">{companyMetrics.activeProjects}</div>
              </Link>
              <p className="text-xs text-muted-foreground">+3 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team Members</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/owner/team">
                <div className="text-2xl font-bold text-foreground hover:underline">{companyMetrics.teamMembers}</div>
              </Link>
              <p className="text-xs text-muted-foreground">Across 6 departments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Client Satisfaction</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{companyMetrics.clientSatisfaction}/5.0</div>
              <p className="text-xs text-muted-foreground">Average rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Strategic KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card><CardHeader><CardTitle>MRR</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">${companyMetrics.mrr.toLocaleString()}</p></CardContent></Card>
            <Card><CardHeader><CardTitle>Churn Rate</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">{companyMetrics.churn}%</p></CardContent></Card>
            <Card><CardHeader><CardTitle>CAC</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">${companyMetrics.cac.toLocaleString()}</p></CardContent></Card>
            <Card><CardHeader><CardTitle>LTV</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">${companyMetrics.ltv.toLocaleString()}</p></CardContent></Card>
        </div>

        {/* Financial Trends */}
        <Card className="mb-8">
            <CardHeader><CardTitle>Financial Trends (YTD)</CardTitle></CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="h-80 w-full">
                    <LineChart data={financialTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(val) => `$${val/1000}k`} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue" />
                        <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} name="Profit" />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>

        {/* Department Performance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="mr-2 h-5 w-5" />
              Department Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {departmentPerformance.map((dept, index) => (
                <div key={index} className="p-4 bg-muted/50 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{dept.name}</h3>
                    <Badge variant={dept.performance >= 90 ? 'default' : 'secondary'}>
                      {dept.performance}%
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Projects:</span>
                      <span className="font-medium">{dept.projects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Revenue:</span>
                      <span className="font-medium">${(dept.revenue / 1000).toFixed(0)}k</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Upcoming Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Upcoming Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingMilestones.map((milestone, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{milestone.project}</h4>
                    <Badge variant={
                      milestone.status === 'Completed' ? 'secondary' :
                      milestone.status === 'At Risk' ? 'destructive' : 'default'
                    }>
                      {milestone.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{milestone.milestone}</p>
                  <p className="text-xs text-muted-foreground">Due: {milestone.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Executive Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Link to="/dashboard/owner/team" className="w-full">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Team ({companyMetrics.teamMembers})
                  </Button>
                </Link>
                <Link to="/dashboard/owner/finance" className="w-full">
                  <Button className="w-full justify-start" variant="outline">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Financial Overview
                  </Button>
                </Link>
                <Link to="/dashboard/owner/analytics" className="w-full">
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Business Analytics
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                <Link to="/dashboard/owner/goals" className="w-full">
                  <Button className="w-full justify-start" variant="outline">
                    <Target className="mr-2 h-4 w-4" />
                    Company Goals
                  </Button>
                </Link>
                <Link to="/dashboard/owner/billing" className="w-full">
                  <Button className="w-full justify-start" variant="outline">
                    <Zap className="mr-2 h-4 w-4" />
                    Billing & Plan
                  </Button>
                </Link>
                <Link to="/dashboard/owner/settings" className="w-full">
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Company Settings
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Executive Activity Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-2 hover:bg-muted/50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {activity.icon}
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

    </DashboardLayout>
  );
};

export default OwnerDashboard;