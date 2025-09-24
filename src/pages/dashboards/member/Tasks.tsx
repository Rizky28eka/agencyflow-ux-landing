import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, Clock, Calendar, Flag, Plus, Filter } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const MemberTasks = () => {
  const tasks = [
    { 
      title: 'Design homepage mockup', 
      project: 'Website Redesign', 
      priority: 'High', 
      status: 'In Progress',
      dueDate: '2024-01-25',
      estimatedHours: 8,
      completedHours: 5
    },
    { 
      title: 'Implement user authentication', 
      project: 'Mobile App', 
      priority: 'Medium', 
      status: 'To Do',
      dueDate: '2024-01-28',
      estimatedHours: 12,
      completedHours: 0
    },
    { 
      title: 'Write API documentation', 
      project: 'E-commerce Platform', 
      priority: 'Low', 
      status: 'Review',
      dueDate: '2024-01-30',
      estimatedHours: 6,
      completedHours: 6
    },
    { 
      title: 'Fix responsive layout issues', 
      project: 'Website Redesign', 
      priority: 'High', 
      status: 'To Do',
      dueDate: '2024-01-26',
      estimatedHours: 4,
      completedHours: 0
    },
  ];

  return (
    <DashboardLayout
      role="member"
      title="My Tasks"
      description="View and manage your assigned tasks"
      headerIcon={<CheckSquare className="h-8 w-8 text-primary" />}
      headerAction={
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      }
    >
      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            <CheckSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Due Today</CardTitle>
            <Calendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2</div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tasks.map((task, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{task.project}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'High' ? 'bg-red-100 text-red-800' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    <Flag className="h-3 w-3 inline mr-1" />
                    {task.priority}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  {task.completedHours}/{task.estimatedHours}h
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all" 
                  style={{ width: `${(task.completedHours / task.estimatedHours) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Due: {task.dueDate}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  task.status === 'Review' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {task.status}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  Start Work
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default MemberTasks;