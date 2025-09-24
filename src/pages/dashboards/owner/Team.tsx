import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Mail, Phone, MoreHorizontal } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

import { Link } from 'react-router-dom';

const OwnerTeam = () => {
  const teamMembers = [
    { id: 1, name: 'Sarah Johnson', role: 'Project Manager', email: 'sarah@agency.com', status: 'Active' },
    { id: 2, name: 'Mike Chen', role: 'Lead Designer', email: 'mike@agency.com', status: 'Active' },
    { id: 3, name: 'Emily Davis', role: 'Developer', email: 'emily@agency.com', status: 'Active' },
    { id: 4, name: 'Alex Rodriguez', role: 'Marketing Lead', email: 'alex@agency.com', status: 'Active' },
  ];

  return (
    <DashboardLayout
      role="owner"
      title="Team Management"
      description="Manage all team members and departments"
      headerIcon={<Users className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      }
    >
      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Members</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">24</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Departments</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">6</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">48</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Performance</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4.7</div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <Link to={`/dashboard/owner/team/${member.id}`} key={index} className="block border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-wrap">
                    <Button variant="ghost" size="sm" onClick={(e) => { e.preventDefault(); alert('Email clicked!'); }}>
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.preventDefault(); alert('Call clicked!'); }}>
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.preventDefault(); alert('More options clicked!'); }}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default OwnerTeam;