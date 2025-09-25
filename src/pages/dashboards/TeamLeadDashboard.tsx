import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  UserCheck,
  Users,
  TrendingUp,
  Calendar,
  CheckSquare,
  FileWarning,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';

const TeamLeadDashboard = () => {
  const teamMetrics = {
    teamMembers: 8,
    teamPerformance: 92,
    tasksThisWeek: 47,
    tasksCompleted: 34,
    pendingApprovals: 2,
    avgPerformance: 4.7,
    onTimeDelivery: 89,
  };

  const teamMembers = [
    {
      id: 'mike',
      name: 'Mike Chen',
      role: 'Frontend Developer',
      performance: 95,
      currentTask: 'User Auth Implementation',
      workload: 85,
    },
    {
      id: 'sarah',
      name: 'Sarah Johnson',
      role: 'UI/UX Designer',
      performance: 92,
      currentTask: 'Homepage Mockups',
      workload: 75,
    },
    {
      id: 'alex',
      name: 'Alex Rodriguez',
      role: 'QA Engineer',
      performance: 88,
      currentTask: 'API Testing',
      workload: 60,
    },
    {
      id: 'emily',
      name: 'Emily Davis',
      role: 'Backend Developer',
      performance: 94,
      currentTask: 'Database Schema',
      workload: 90,
    },
  ];

  const pendingApprovals = [
    {
      id: 'REQ-001',
      member: 'Mike Chen',
      type: 'Leave',
      details: 'Vacation (5 days)',
      submitted: '2 days ago',
      urgent: false,
    },
    {
      id: 'REQ-004',
      member: 'Emily Davis',
      type: 'Expense',
      details: 'Online Course ($200)',
      submitted: '1 day ago',
      urgent: true,
    },
  ];

  const upcomingOneOnOnes = [
    {
      id: '1',
      member: 'Mike Chen',
      scheduled: '2024-01-26 2:00 PM',
      lastMeeting: '2 weeks ago',
    },
    {
      id: '2',
      member: 'Sarah Johnson',
      scheduled: '2024-01-27 10:00 AM',
      lastMeeting: '1 week ago',
    },
    {
      id: '3',
      member: 'Alex Rodriguez',
      scheduled: 'Not scheduled',
      lastMeeting: '3 weeks ago',
    },
  ];

  return (
    <DashboardLayout
      title="Team Lead Dashboard"
      description="Team management and performance tracking"
      headerIcon={<UserCheck className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <Calendar className="mr-2 h-4 w-4" />
          Team Meeting
        </Button>
      }
      requiresPermission={{ resource: 'team', action: 'read' }}
    >
      {/* Team Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Team Members
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {teamMetrics.teamMembers}
            </div>
            <p className="text-xs text-muted-foreground">All active</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Team Performance
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {teamMetrics.teamPerformance}%
            </div>
            <p className="text-xs text-muted-foreground">Above target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tasks This Week
            </CardTitle>
            <CheckSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {teamMetrics.tasksThisWeek}
            </div>
            <p className="text-xs text-muted-foreground">
              {teamMetrics.tasksCompleted} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Approvals
            </CardTitle>
            <FileWarning className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">
              {teamMetrics.pendingApprovals}
            </div>
            <p className="text-xs text-muted-foreground">items require action</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Pending Approvals */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileWarning className="mr-2 h-5 w-5" />
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingApprovals.map((item) => (
              <Link
                to="/dashboard/team-lead/approvals"
                key={item.id}
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-sm">{item.member}</p>
                  {item.urgent && (
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.type}: {item.details}
                </p>
                <p className="text-xs text-muted-foreground">
                  Submitted: {item.submitted}
                </p>
              </Link>
            ))}
            <Link to="/dashboard/team-lead/approvals">
              <Button variant="outline" className="w-full">
                View All Approvals
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Team Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="p-3 bg-muted/50 rounded-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={member.performance >= 90 ? 'default' : 'secondary'}
                  >
                    {member.performance}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Current: {member.currentTask}</span>
                    <span>Workload: {member.workload}%</span>
                  </div>
                  <Progress value={member.workload} className="h-2" />
                </div>
              </div>
            ))}
            <Link to="/dashboard/team-lead/performance">
              <Button variant="outline" className="w-full">
                View Detailed Performance
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming 1-on-1s */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Upcoming 1-on-1 Meetings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingOneOnOnes.map((meeting) => (
            <div
              key={meeting.id}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {meeting.member
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{meeting.member}</p>
                  <p className="text-xs text-muted-foreground">
                    Last meeting: {meeting.lastMeeting}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-medium ${
                    meeting.scheduled === 'Not scheduled'
                      ? 'text-red-600'
                      : 'text-foreground'
                  }`}
                >
                  {meeting.scheduled}
                </p>
                {meeting.scheduled === 'Not scheduled' && (
                  <Badge variant="destructive" className="text-xs">
                    Overdue
                  </Badge>
                )}
              </div>
            </div>
          ))}
          <Link to="/dashboard/team-lead/one-on-ones">
            <Button variant="outline" className="w-full">
              Manage 1-on-1 Schedule
            </Button>
          </Link>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default TeamLeadDashboard;