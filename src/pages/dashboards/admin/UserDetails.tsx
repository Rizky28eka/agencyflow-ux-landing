import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { User, Edit, Shield, Activity, Clock, ArrowLeft, Save, Trash2 } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

// More detailed user type for this page
interface UserDetailsData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string; // Assuming API provides this
  lastLogin: string;
  avatar: string; // Assuming API provides this
  phone: string; // Assuming API provides this
  department: string; // Assuming API provides this
  manager: string; // Assuming API provides this
  // TODO: These should be fetched from the API as well
  permissions: string[];
  projects: { name: string; role: string; status: string }[];
  activityLog: { action: string; timestamp: string; ip: string }[];
}

const UserDetails = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user, isLoading, isError, error } = useQuery<UserDetailsData>({ 
    queryKey: ['user', userId], 
    queryFn: () => api.get(`/api/users/${userId}`),
    enabled: !!userId, // Only run the query if userId is available
  });

  // TODO: Replace with real data from API later
  const staticData = {
    permissions: ['Project Management', 'Team Coordination', 'Client Communication'],
    projects: [
      { name: 'Website Redesign', role: 'Lead PM', status: 'Active' },
      { name: 'Mobile App', role: 'PM', status: 'Completed' },
    ],
    activityLog: [
      { action: 'Logged in', timestamp: '2024-01-24 10:30 AM', ip: '192.168.1.10' },
      { action: 'Updated project status', timestamp: '2024-01-24 09:15 AM', ip: '192.168.1.10' },
      { action: 'Created new task', timestamp: '2024-01-23 16:45 PM', ip: '192.168.1.10' },
    ]
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department || 'N/A', // Handle potentially null data
      });
    }
  }, [user]);

  // TODO: Implement actual API calls for mutations
  const handleSaveChanges = () => {
    toast.success('User details updated successfully! (Mock)');
  };

  const handleStatusToggle = (checked: boolean) => {
    toast.success(`User ${checked ? 'activated' : 'deactivated'} successfully! (Mock)`);
  };

  const handleDeleteUser = () => {
    toast.success('User deleted successfully! (Mock)');
    navigate('/dashboard/admin/users');
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Loading User...">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card><CardContent className="p-6"><Skeleton className="h-48 w-full" /></CardContent></Card>
            <Card><CardContent className="p-6"><Skeleton className="h-32 w-full" /></CardContent></Card>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <Card><CardContent className="p-6"><Skeleton className="h-64 w-full" /></CardContent></Card>
            <Card><CardContent className="p-6"><Skeleton className="h-48 w-full" /></CardContent></Card>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout title="Error">
        <p className="text-red-500">Error loading user: {error.message}</p>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout title="User Not Found">
        <p>This user could not be found.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="User Details"
      description={`Profile and settings for ${user.name}`}
      headerIcon={<User className="h-8 w-8 text-primary" />}
      headerAction={
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/dashboard/admin/users')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Delete User</DialogTitle></DialogHeader>
              <div className="py-4"><p>Are you sure you want to delete {user.name}?</p></div>
              <DialogFooter>
                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                <DialogClose asChild><Button variant="destructive" onClick={handleDeleteUser}>Delete</Button></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Profile */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <p className="text-muted-foreground">{user.role}</p>
              <div className="flex justify-center"><Badge variant={user.status === 'Active' ? 'secondary' : 'destructive'}>{user.status}</Badge></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Email:</span><span className="font-medium">{user.email}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Phone:</span><span className="font-medium">{user.phone || 'N/A'}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Department:</span><span className="font-medium">{user.department || 'N/A'}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Join Date:</span><span className="font-medium">{user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A'}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Last Login:</span><span className="font-medium">{user.lastLogin}</span></div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label htmlFor="user-status">Account Status</Label>
                <Switch id="user-status" checked={user.status === 'Active'} onCheckedChange={handleStatusToggle} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center"><Shield/>Permissions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {staticData.permissions.map((p, i) => <div key={i} className="text-sm">{p}</div>)}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle className="flex items-center"><Edit/>Edit User</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
                <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div>
                <div className="space-y-2"><Label htmlFor="role">Role</Label><Select value={formData.role} onValueChange={(v) => setFormData({...formData, role: v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Owner">Owner</SelectItem><SelectItem value="Admin">Admin</SelectItem><SelectItem value="Project Manager">Project Manager</SelectItem></SelectContent></Select></div>
                <div className="space-y-2"><Label htmlFor="department">Department</Label><Input id="department" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} /></div>
              </div>
              <div className="flex justify-end"><Button onClick={handleSaveChanges}><Save/>Save Changes</Button></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Assigned Projects</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {staticData.projects.map((p, i) => <div key={i} className="flex justify-between p-3 bg-muted/50 rounded-lg"><span>{p.name}</span><Badge>{p.status}</Badge></div>)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center"><Activity/>Recent Activity</CardTitle></CardHeader>
            <CardContent>
              <Table><TableHeader><TableRow><TableHead>Action</TableHead><TableHead>Timestamp</TableHead></TableRow></TableHeader>
                <TableBody>
                  {staticData.activityLog.map((a, i) => <TableRow key={i}><TableCell>{a.action}</TableCell><TableCell>{a.timestamp}</TableCell></TableRow>)}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDetails;