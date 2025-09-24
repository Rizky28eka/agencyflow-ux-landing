
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { User, CheckSquare, Clock, Target, TrendingUp, Calendar, FileText, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Checkbox } from '@/components/ui/checkbox';

const MemberDashboard = () => {
  const memberMetrics = {
    tasksToday: 2,
    hoursThisWeek: 38.5,
    activeProjects: 3,
    performance: 4.6,
    completedTasks: 47,
    weeklyGoal: 40
  };

  const todaysTasks = [
    { id: 'TASK-201', title: 'Implement user authentication flow', project: 'Mobile App', priority: 'High', estimatedHours: 4 },
    { id: 'TASK-104', title: 'Fix responsive layout issues', project: 'Website Redesign', priority: 'Medium', estimatedHours: 2 },
  ];

  const myProjects = [
    { name: 'Website Redesign', role: 'Frontend Developer', progress: 75, tasksRemaining: 3 },
    { name: 'Mobile App', role: 'Full Stack Developer', progress: 45, tasksRemaining: 8 },
    { name: 'E-commerce Platform', role: 'Backend Developer', progress: 60, tasksRemaining: 5 },
  ];

  const recentActivity = [
    { user: 'Sarah J.', text: 'mentioned you in Website Redesign project chat', time: '2 hours ago', type: 'mention' },
    { user: 'Project Manager', text: 'assigned a new high-priority task to you', time: '4 hours ago', type: 'assignment' },
    { user: 'Team Lead', text: 'approved your time entry for yesterday', time: '1 day ago', type: 'approval' },
    { user: 'Client', text: 'provided feedback on your latest deliverable', time: '2 days ago', type: 'feedback' },
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
      requiresPermission={{ resource: 'tasks', action: 'read' }}
    >
        {/* Personal Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tasks Due Today</CardTitle>
              <CheckSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{memberMetrics.tasksToday}</div>
              <p className="text-xs text-muted-foreground">High priority: 1</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hours Logged (Week)</CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{memberMetrics.hoursThisWeek}</div>
              <p className="text-xs text-muted-foreground">Goal: {memberMetrics.weeklyGoal}h</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{memberMetrics.activeProjects}</div>
              <p className="text-xs text-muted-foreground">Different roles</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">My Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{memberMetrics.performance}</div>
              <p className="text-xs text-muted-foreground">Out of 5.0</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Hours Goal Progress</span>
                <span className="text-sm text-muted-foreground">{memberMetrics.hoursThisWeek}h / {memberMetrics.weeklyGoal}h</span>
              </div>
              <Progress value={(memberMetrics.hoursThisWeek / memberMetrics.weeklyGoal) * 100} />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {myProjects.map((project, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg space-y-2">
                    <h4 className="font-medium text-sm">{project.name}</h4>
                    <p className="text-xs text-muted-foreground">{project.role}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <p className="text-xs text-muted-foreground">{project.tasksRemaining} tasks remaining</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
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
                          <Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'} className="text-xs">
                            {task.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">~{task.estimatedHours}h</span>
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
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'mention' ? 'bg-blue-500' :
                          activity.type === 'assignment' ? 'bg-orange-500' :
                          activity.type === 'approval' ? 'bg-green-500' : 'bg-purple-500'
                        }`}></div>
                        <div>
                            <p className="text-sm">
                              <span className="font-semibold">{activity.user}</span> {activity.text}
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                    </div>
                ))}
                <Link to="/dashboard/member/chat">
                  <Button variant="outline" className="w-full">View Team Chat</Button>
                </Link>
            </CardContent>
          </Card>
        </div>
    </DashboardLayout>
  );
};

export default MemberDashboard;
