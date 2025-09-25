import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Users, UserPlus, Shield, Edit, Trash2, MoreHorizontal, Eye } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

const AdminUsers = () => {
  const { data: users, isLoading, isError, error } = useQuery<User[]>({ 
    queryKey: ['users'], 
    queryFn: () => api.get('/api/users')
  });

  const renderTableBody = () => {
    if (isLoading) {
      return [...Array(4)].map((_, i) => (
        <TableRow key={i}>
          <TableCell><Checkbox disabled /></TableCell>
          <TableCell>
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-32 mt-1" />
          </TableCell>
          <TableCell><Skeleton className="h-5 w-20" /></TableCell>
          <TableCell><Skeleton className="h-6 w-16" /></TableCell>
          <TableCell><Skeleton className="h-5 w-24" /></TableCell>
          <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
        </TableRow>
      ));
    }

    if (isError) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="text-center text-red-500">
            Error loading users: {error.message}
          </TableCell>
        </TableRow>
      );
    }

    return users?.map((user) => (
      <TableRow key={user.id}>
        <TableCell><Checkbox /></TableCell>
        <TableCell>
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
        </TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>
          <div className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
            user.status === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {user.status}
          </div>
        </TableCell>
        <TableCell>{user.lastLogin}</TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to={`/dashboard/admin/users/${user.id}`}>
                  <Eye className="mr-2 h-4 w-4"/>
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem><Edit className="mr-2 h-4 w-4"/> Edit User</DropdownMenuItem>
              <DropdownMenuItem><Eye className="mr-2 h-4 w-4"/> Impersonate</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500"><Trash2 className="mr-2 h-4 w-4"/> Delete User</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <DashboardLayout
      title="User Management"
      description="Manage all users and their permissions"
      headerIcon={<Users className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      }
    >
      {/* User Stats - these could also be fetched from an API */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">124</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">118</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approval</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">6</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Roles</CardTitle>
            <Shield className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">7</div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Users</CardTitle>
            <div className="flex items-center gap-2">
                <Input placeholder="Search by name or email..." className="w-64" />
                <Select>
                    <SelectTrigger className="w-48"><SelectValue placeholder="Filter by role" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                </Select>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="outline">Bulk Actions</Button></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                        <DropdownMenuItem>Deactivate Users</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"><Checkbox /></TableHead>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderTableBody()}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AdminUsers;