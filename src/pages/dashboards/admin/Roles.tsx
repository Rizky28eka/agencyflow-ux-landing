import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Plus, Edit, Users, Settings, Trash2 } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useState } from 'react';
import { RoleForm } from '@/components/admin/RoleForm';
import { Lock } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface Role {
  name: string;
  users: number;
  permissions: string[];
  color: string;
}


const AdminRoles = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const [roles, setRoles] = useState<Role[]>([
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
      permissions: ['Project Viewing', 'File Access'],
      color: 'from-orange-400 to-red-500'
    },
  ]);

  const handleCreateRole = () => {
    setSelectedRole(null);
    setIsFormOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsFormOpen(true);
  };

  const handleDeleteRole = (roleName: string) => {
    setRoles(roles.filter(r => r.name !== roleName));
  };

  const handleSaveRole = (roleData: Omit<Role, 'users' | 'color'>) => {
    if (selectedRole) {
      // Update existing role
      setRoles(roles.map(r => r.name === selectedRole.name ? { ...r, ...roleData } : r));
    } else {
      // Add new role
      setRoles([...roles, { ...roleData, users: 0, color: 'from-gray-400 to-gray-500' }]);
    }
  };
  // Mock current plan
  const currentPlan = 'basic'; // 'starter', 'basic', 'professional', 'business', 'enterprise'
  const canCreateCustomRoles = currentPlan === 'professional' || currentPlan === 'business' || currentPlan === 'enterprise';

  return (
    <DashboardLayout
      role="admin"
      title="Role Permissions"
      description="Configure access levels and permissions"
      headerIcon={<Shield className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary" onClick={handleCreateRole}>
          <Plus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      }
    >
      <RoleForm 
        isOpen={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        onSave={handleSaveRole} 
        role={selectedRole} 
      />
      <div className="relative">
        {!canCreateCustomRoles && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg">
                <Lock className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-2xl font-bold mb-2">Upgrade to Unlock Custom Roles</h3>
                <p className="text-muted-foreground mb-6">This feature is available on the Professional plan and above.</p>
                <Button size="lg" className="bg-gradient-primary">Upgrade Your Plan</Button>
            </div>
        )}
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
                  <div className="flex items-center">
                    <Button variant="ghost" size="icon" onClick={() => handleEditRole(role)}><Edit className="h-4 w-4" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500" /></Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone. This will permanently delete the role.</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteRole(role.name)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
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
      </div>
    </DashboardLayout>
  );
};

export default AdminRoles;