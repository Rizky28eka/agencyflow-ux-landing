import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Phone, Edit, Trash2, Award, Briefcase, Users, ArrowLeft } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const TeamMemberDetails = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();

  // Mock data based on memberId
  const memberData = {
    '1': {
      name: 'Sarah Johnson',
      role: 'Project Manager',
      email: 'sarah@agency.com',
      phone: '+1 (555) 987-6543',
      avatar: '/placeholder.svg',
      status: 'Active',
      joinDate: 'January 15, 2022',
      performance: 95,
      department: 'Operations',
      projects: [
        { name: 'Website Redesign', status: 'On Track' },
        { name: 'Mobile App', status: 'Completed' },
        { name: 'Brand Identity', status: 'At Risk' },
      ],
      tasksCompleted: 128,
      tasksPending: 12,
    },
    '2': {
      name: 'Mike Chen',
      role: 'Lead Designer',
      email: 'mike@agency.com',
      phone: '+1 (555) 123-4567',
      avatar: '/placeholder.svg',
      status: 'Active',
      joinDate: 'March 10, 2022',
      performance: 88,
      department: 'Design',
      projects: [
        { name: 'Brand Identity', status: 'On Track' },
        { name: 'E-commerce Platform', status: 'Completed' },
      ],
      tasksCompleted: 95,
      tasksPending: 8,
    }
  };

  const [member, setMember] = useState({
    id: memberId || '1',
    ...(memberData[memberId as keyof typeof memberData] || memberData['1'])
  });

  const [formData, setFormData] = useState({
    name: member.name,
    role: member.role,
    email: member.email,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = () => {
    setMember(prev => ({ ...prev, ...formData }));
    toast.success('Member details updated successfully!');
  };
  
  const handleDialogChange = (open: boolean) => {
    if (open) {
      setFormData({
        name: member.name,
        role: member.role,
        email: member.email,
      });
    }
  };

  return (
    <DashboardLayout
      title={`Team Member: ${member.name}`}
      description={`Profile for ${member.name}`}
      headerIcon={<Users className="h-8 w-8 text-primary" />}
      headerAction={
        <Button variant="outline" onClick={() => navigate('/dashboard/owner/team')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Team
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="items-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{member.name}</CardTitle>
              <p className="text-muted-foreground">{member.role}</p>
              <Badge className={member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {member.status}
              </Badge>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{member.phone}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-center gap-2">
                <Dialog onOpenChange={handleDialogChange}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Member Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="sm:text-right">Name</Label>
                        <Input id="name" value={formData.name} onChange={handleInputChange} className="col-span-1 sm:col-span-3" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="sm:text-right">Role</Label>
                        <Input id="role" value={formData.role} onChange={handleInputChange} className="col-span-1 sm:col-span-3" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="sm:text-right">Email</Label>
                        <Input id="email" type="email" value={formData.email} onChange={handleInputChange} className="col-span-1 sm:col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" onClick={handleSaveChanges}>Save Changes</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4" /> Remove</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Award className="mr-2 h-5 w-5" /> Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall Score</span>
                  <span className="text-sm font-medium text-primary">{member.performance}%</span>
                </div>
                <Progress value={member.performance} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tasks Completed</span>
                <span className="font-semibold">{member.tasksCompleted}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tasks Pending</span>
                <span className="font-semibold">{member.tasksPending}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Briefcase className="mr-2 h-5 w-5" /> Assigned Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {member.projects.map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">{project.name}</span>
                    <Badge variant={
                      project.status === 'Completed' ? 'secondary' :
                      project.status === 'On Track' ? 'default' : 'destructive'
                    }>
                      {project.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeamMemberDetails;