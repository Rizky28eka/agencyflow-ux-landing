import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Plus, Edit, Users, Settings } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const AdminRoles = () => {
  const roles = [
    { 
      name: 'Owner', 
      users: 1, 
      permissions: ['Full Access', 'User Management', 'Financial Data', 'System Settings'],
      color: 'from-yellow-400 to-orange-500'
    },
    { 
      name: 'Admin', 
      users: 2, 
      permissions: ['User Management', 'System Settings', 'Reports', 'Security'],
      color: 'from-red-400 to-pink-500'
    },
    { 
      name: 'Project Manager', 
      users: 5, 
      permissions: ['Project Management', 'Team Coordination', 'Reports', 'Client Communication'],
      color: 'from-blue-400 to-indigo-500'
    },
    { 
      name: 'Team Lead', 
      users: 8, 
      permissions: ['Team Management', 'Task Assignment', 'Performance Reviews'],
      color: 'from-green-400 to-emerald-500'
    },
    { 
      name: 'Member', 
      users: 95, 
      permissions: ['Task Management', 'Time Tracking', 'Basic Reports'],
      color: 'from-purple-400 to-violet-500'
    },
    { 
      name: 'Finance', 
      users: 3, 
      permissions: ['Financial Management', 'Invoicing', 'Budget Planning'],
      color: 'from-teal-400 to-cyan-500'
    },
    { 
      name: 'Client', 
      users: 45, 
      permissions: ['Project Viewing', 'Communication', 'File Access'],
      color: 'from-orange-400 to-red-500'
    },
  ];

  return (
    <DashboardLayout
      role="admin"
      title="Role Permissions"
      description="Configure access levels and permissions"
      headerIcon={<Shield className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <Plus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      }
    >
      {/* Role Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Roles</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">7</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Custom Roles</CardTitle>
            <Settings className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">159</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Permission Groups</CardTitle>
            <Shield className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
          </CardContent>
        </Card>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center`}>
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{role.users} users</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Permissions:</h4>
                <div className="space-y-1">
                  {role.permissions.map((permission, permIndex) => (
                    <div key={permIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm text-muted-foreground">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default AdminRoles;