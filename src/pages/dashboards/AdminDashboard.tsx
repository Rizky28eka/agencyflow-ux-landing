import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Settings, FileText, UserCheck, Lock, Database, Activity, List, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';

const AdminDashboard = () => {
  const systemHealth = {
    uptime: 99.9,
    activeUsers: 124,
    pendingApprovals: 7,
    securityAlerts: 2,
    systemLoad: 45,
    databaseSize: '2.4GB',
    backupStatus: 'Completed',
    lastBackup: '2024-01-24 02:00:00'
  };

  const recentSystemEvents = [
    { event: 'User Registration', user: 'alex@newclient.com', time: '10 minutes ago', type: 'info' },
    { event: 'Failed Login Attempt', user: 'unknown@suspicious.com', time: '2 hours ago', type: 'warning' },
    { event: 'System Backup', user: 'System', time: '6 hours ago', type: 'success' },
    { event: 'Role Permission Updated', user: 'admin@agency.com', time: '1 day ago', type: 'info' },
  ];

  const criticalTasks = [
    { task: 'Review security alerts', priority: 'High', dueDate: 'Today' },
    { task: 'Approve pending user registrations', priority: 'Medium', dueDate: 'Tomorrow' },
    { task: 'Update system documentation', priority: 'Low', dueDate: 'This week' },
  ];
  return (
    <DashboardLayout
      role="admin"
      title="Admin Dashboard"
      description="System administration and user management"
      headerIcon={<Shield className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <Settings className="mr-2 h-4 w-4" />
          System Settings
        </Button>
      }
      requiresPermission={{ resource: 'users', action: 'read' }}
    >

        {/* Security Alerts */}
        {systemHealth.securityAlerts > 0 && (
          <Alert variant="destructive" className="mb-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              {systemHealth.securityAlerts} security alert(s) require immediate attention. 
              <Link to="/dashboard/admin/audit-log" className="underline ml-1">View details</Link>
            </AlertDescription>
          </Alert>
        )}
        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{systemHealth.activeUsers}</div>
              <p className="text-xs text-muted-foreground">+8 this week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">System Uptime</CardTitle>
              <Activity className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{systemHealth.uptime}%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
              <UserCheck className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{systemHealth.pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card className={systemHealth.securityAlerts > 0 ? "border-red-200 bg-red-50/50" : ""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Security Alerts</CardTitle>
              <Shield className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{systemHealth.securityAlerts}</div>
              <p className="text-xs text-red-600">{systemHealth.securityAlerts > 0 ? 'Needs review' : 'All clear'}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">System Load</span>
                <span className="text-xl font-bold text-primary">{systemHealth.systemLoad}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">Database Size</span>
                <span className="text-xl font-bold text-accent">{systemHealth.databaseSize}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">Last Backup</span>
                <span className="text-sm font-bold text-primary">{systemHealth.lastBackup}</span>
              </div>
            </CardContent>
          </Card>

          {/* Critical Tasks */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Critical Administrative Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {criticalTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{task.task}</p>
                    <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                  </div>
                  <Badge variant={
                    task.priority === 'High' ? 'destructive' :
                    task.priority === 'Medium' ? 'secondary' : 'outline'
                  }>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
            </CardContent>
          </Card>
        </div>
    </DashboardLayout>
  );
};

        {/* Recent System Events */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Recent System Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSystemEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{event.event}</p>
                    <p className="text-xs text-muted-foreground">User: {event.user}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={
        {/* Admin Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/dashboard/admin/users">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="mr-2 h-5 w-5" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Manage user accounts, roles, and permissions</p>
                <div className="mt-3 text-2xl font-bold text-primary">{systemHealth.activeUsers} users</div>
              </CardContent>
            </Card>
          </Link>
                      event.type === 'warning' ? 'destructive' :
          <Link to="/dashboard/admin/settings">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Settings className="mr-2 h-5 w-5" />
                  System Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Configure system-wide settings and preferences</p>
                <div className="mt-3 text-sm font-bold text-accent">Security, Branding, Notifications</div>
              </CardContent>
            </Card>
          </Link>
                      event.type === 'success' ? 'secondary' : 'outline'
          <Link to="/dashboard/admin/audit-log">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <List className="mr-2 h-5 w-5" />
                  Audit Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Track all system activities and changes</p>
                <div className="mt-3 text-sm font-bold text-primary">Real-time monitoring</div>
              </CardContent>
            </Card>
          </Link>
                    }>
          <Link to="/dashboard/admin/integrations">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Share2 className="mr-2 h-5 w-5" />
                  Integrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Manage third-party app connections</p>
                <div className="mt-3 text-sm font-bold text-accent">Slack, GitHub, Figma</div>
              </CardContent>
            </Card>
          </Link>
                      {event.type}
          <Link to="/dashboard/admin/roles">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Shield className="mr-2 h-5 w-5" />
                  Role Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Configure user roles and permissions</p>
                <div className="mt-3 text-sm font-bold text-primary">7 active roles</div>
              </CardContent>
            </Card>
          </Link>
                    </Badge>
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Database className="mr-2 h-5 w-5" />
                Database Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">System performance and backup status</p>
              <div className="mt-3 flex items-center space-x-2">
                <Badge variant="secondary">{systemHealth.backupStatus}</Badge>
                <span className="text-sm font-bold text-accent">{systemHealth.databaseSize}</span>
              </div>
                    <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
export default AdminDashboard;