
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCheck, Users, TrendingUp, Calendar, MessageSquare, CheckSquare, Clock, Star, FileWarning } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';

const TeamLeadDashboard = () => {
  const pendingApprovals = [
    { id: 'REQ-001', member: 'Mike Chen', type: 'Leave', details: 'Vacation (5 days)' },
    { id: 'REQ-004', member: 'Emily Davis', type: 'Expense', details: 'Online Course ($200)' },
  ];

  return (
    <DashboardLayout
      role="team-lead"
      title="Team Lead Dashboard"
      description="Team management and performance tracking"
      headerIcon={<UserCheck className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <Calendar className="mr-2 h-4 w-4" />
          Team Meeting
        </Button>
      }
    >

        {/* Team Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team Members</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">8</div>
              <p className="text-xs text-muted-foreground">All active</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">92%</div>
              <p className="text-xs text-muted-foreground">Above target</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tasks This Week</CardTitle>
              <CheckSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">47</div>
              <p className="text-xs text-muted-foreground">34 completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
              <FileWarning className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{pendingApprovals.length}</div>
              <p className="text-xs text-muted-foreground">items require action</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Approvals */}
          <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <FileWarning className="mr-2 h-5 w-5" />
                    Pending Approvals
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {pendingApprovals.map(item => (
                    <Link to="/dashboard/team-lead/approvals" key={item.id} className="block p-3 bg-muted/50 rounded-lg hover:bg-muted">
                        <p className="font-semibold">{item.member}</p>
                        <p className="text-sm text-muted-foreground">{item.type}: {item.details}</p>
                    </Link>
                ))}
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Team Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">Tasks Completed</span>
                <span className="text-xl font-bold text-primary">34/47</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">On-time Delivery</span>
                <span className="text-xl font-bold text-accent">89%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">Quality Score</span>
                <span className="text-xl font-bold text-primary">4.7/5</span>
              </div>
            </CardContent>
          </Card>
        </div>
    </DashboardLayout>
  );
};

export default TeamLeadDashboard;
