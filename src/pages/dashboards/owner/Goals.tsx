
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Plus, TrendingUp, Users, DollarSign } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const OwnerGoals = () => {
  const goals = [
    {
      title: 'Increase Quarterly Revenue',
      target: '$500,000',
      current: 284500,
      progress: (284500 / 500000) * 100,
      status: 'On Track',
      icon: <DollarSign className="h-6 w-6 text-yellow-500" />,
    },
    {
      title: 'Improve Client Retention Rate',
      target: '95%',
      current: 94.2,
      progress: 94.2,
      status: 'On Track',
      icon: <Users className="h-6 w-6 text-blue-500" />,
    },
    {
      title: 'Achieve Team Utilization of 90%',
      target: '90%',
      current: 87.3,
      progress: 87.3,
      status: 'At Risk',
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
    },
    {
        title: 'Launch New Marketing Website',
        target: 'Completed',
        current: 100,
        progress: 100,
        status: 'Achieved',
        icon: <Target className="h-6 w-6 text-green-500" />,
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track':
        return 'bg-blue-100 text-blue-800';
      case 'At Risk':
        return 'bg-yellow-100 text-yellow-800';
      case 'Achieved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout
      role="owner"
      title="Goal Tracking"
      description="Set and monitor company-wide KPIs and objectives."
      headerIcon={<Target className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add New Goal
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {goals.map((goal, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                        {goal.icon}
                    </div>
                    <CardTitle>{goal.title}</CardTitle>
                </div>
                <Badge className={getStatusColor(goal.status)}>{goal.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Progress: <span className="font-bold text-foreground">{goal.current.toLocaleString()}{typeof goal.current === 'number' && goal.target.includes('%') ? '%' : ''} / {goal.target}</span>
                </p>
                <Progress value={goal.progress} />
              </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" size="sm">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default OwnerGoals;
