import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Play, Pause, Square, Calendar, BarChart3, MoreHorizontal } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const MemberTimeTracking = () => {
  const timeEntries = [
    { task: 'Design homepage mockup', project: 'Website Redesign', date: '2024-01-24', hours: 3.5, status: 'Completed' },
    { task: 'Implement user auth', project: 'Mobile App', date: '2024-01-24', hours: 2.0, status: 'In Progress' },
    { task: 'Fix responsive issues', project: 'Website Redesign', date: '2024-01-23', hours: 4.0, status: 'Completed' },
    { task: 'Write documentation', project: 'E-commerce Platform', date: '2024-01-23', hours: 1.5, status: 'Completed' },
  ];

  return (
    <DashboardLayout
      role="member"
      title="Time Tracking"
      description="Log and manage your work hours"
      headerIcon={<Clock className="h-8 w-8 text-primary" />}
      headerAction={
        <div className="flex items-center gap-2">
          <Button variant="outline">Manual Entry</Button>
          <Button className="bg-gradient-primary">
            <Play className="mr-2 h-4 w-4" />
            Start Timer
          </Button>
        </div>
      }
    >
      {/* Time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">5.5h</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">38.5h</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">156h</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg/Day</CardTitle>
            <Clock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">7.8h</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Timer */}
        <Card>
          <CardHeader>
            <CardTitle>Active Timer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">02:34:15</div>
              <p className="text-muted-foreground">Working on: Design homepage mockup</p>
              <p className="text-sm text-muted-foreground">Project: Website Redesign</p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-green-500 hover:bg-green-600">
                <Play className="mr-2 h-5 w-5" />
                Start
              </Button>
              <Button size="lg" variant="outline">
                <Pause className="mr-2 h-5 w-5" />
                Pause
              </Button>
              <Button size="lg" variant="outline">
                <Square className="mr-2 h-5 w-5" />
                Stop
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Time Entries */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Time Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeEntries.map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{entry.task}</h4>
                    <p className="text-sm text-muted-foreground">{entry.project}</p>
                    <p className="text-xs text-muted-foreground">{entry.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{entry.hours}h</div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      entry.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {entry.status}
                    </div>
                  </div>
                  <div className="ml-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MemberTimeTracking;