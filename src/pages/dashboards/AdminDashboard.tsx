import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, Settings, FileText, UserCheck, Lock, Database, Activity, List, Share2, UserPlus, UserCog } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';

const AdminDashboard = () => {
  const recentActivity = [
    { user: 'John Doe', action: 'updated their profile', time: '2 hours ago' },
    { user: 'Jane Smith', action: 'was assigned a new role: Admin', time: '1 day ago' },
    { user: 'Peter Jones', action: 'reset their password', time: '2 days ago' },
  ];

  return (
    <DashboardLayout
      title="Admin Dashboard"
      description="System administration and user management"
      headerIcon={<Shield className="h-8 w-8 text-primary" />}
      headerAction={
        <div className="flex items-center gap-2">
          <Button variant="outline"><UserPlus className="mr-2 h-4 w-4" /> Add User</Button>
          <Button><UserCog className="mr-2 h-4 w-4" /> Manage Roles</Button>
        </div>
      }
    >

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">124</div>
              <p className="text-xs text-muted-foreground">+8 this week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">System Uptime</CardTitle>
              <Activity className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">99.9%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
              <UserCheck className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">7</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Security Alerts</CardTitle>
              <Activity className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2</div>
              <p className="text-xs text-red-600">Needs review</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 bg-blue-500"></div>
                  <div>
                    <p className="text-sm"><span className="font-semibold">{activity.user}</span> {activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Administration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                System Administration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Manage User Roles
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Lock className="mr-2 h-4 w-4" />
                Security Settings
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Database className="mr-2 h-4 w-4" />
                Database Management
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                System Configuration
              </Button>
              <Link to="/dashboard/admin/audit-log" className="w-full">
                <Button className="w-full justify-start" variant="outline">
                    <List className="mr-2 h-4 w-4" />
                    Audit Log
                </Button>
              </Link>
              <Link to="/dashboard/admin/integrations" className="w-full">
                <Button className="w-full justify-start" variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Integrations
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;