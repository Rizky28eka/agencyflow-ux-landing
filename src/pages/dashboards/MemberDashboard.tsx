
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, CheckSquare, Clock, Target, TrendingUp, Calendar, FileText, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Checkbox } from '@/components/ui/checkbox';

const MemberDashboard = () => {
  const todaysTasks = [
    { id: 'TASK-201', title: 'Implement user authentication flow', project: 'Mobile App' },
    { id: 'TASK-104', title: 'Fix responsive layout issues', project: 'Website Redesign' },
  ];

  const recentActivity = [
    { user: 'Sarah J.', text: 'mentioned you in Website Redesign', time: '2 hours ago' },
    { user: 'Project Manager', text: 'assigned a new task to you: Implement user auth', time: 'Yesterday' },
  ];

  return (
    <DashboardLayout
      role="member"
      title="My Dashboard"
      description="Focus on what you need to do today."
      headerIcon={<User className="h-8 w-8 text-primary" />}
      headerAction={
        <Link to="/dashboard/member/time">
            <Button className="bg-gradient-primary"><Clock className="mr-2 h-4 w-4" /> Log Time</Button>
        </Link>
      }
    >
        {/* Personal Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tasks Due Today</CardTitle>
              <CheckSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{todaysTasks.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hours Logged (Week)</CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">38.5</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">3</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">My Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">4.6</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Tasks */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckSquare className="mr-2 h-5 w-5" />
                Today's Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaysTasks.map(task => (
                <div key={task.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Checkbox id={`task-${task.id}`} />
                    <div>
                        <label htmlFor={`task-${task.id}`} className="font-medium cursor-pointer">{task.title}</label>
                        <p className="text-xs text-muted-foreground">Project: {task.project}</p>
                    </div>
                </div>
              ))}
              <Link to="/dashboard/member/tasks">
                <Button variant="outline" className="w-full">View All My Tasks</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start space-x-3">
                        <div className="w-1 h-10 bg-muted rounded-full"></div>
                        <div>
                            <p className="text-sm"><span className="font-semibold">{activity.user}</span> {activity.text}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
          </Card>
        </div>
    </DashboardLayout>
  );
};

export default MemberDashboard;
