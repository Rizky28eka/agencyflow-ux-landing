
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, TrendingUp, CheckCircle, List, Edit, Trash2 } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { EditGoalModal } from '@/components/EditGoalModal';

const historyData = [
  { date: '2024-07-01', value: 250000 },
  { date: '2024-07-15', value: 265000 },
  { date: '2024-08-01', value: 278000 },
  { date: '2024-08-15', value: 281000 },
  { date: '2024-09-01', value: 284500 },
];

const subTasks = [
    { id: 1, title: 'Secure 10 new enterprise clients', completed: true },
    { id: 2, title: 'Increase renewal rate by 5% for SMBs', completed: true },
    { id: 3, title: 'Reduce customer churn by 3%', completed: false },
    { id: 4, title: 'Upsell premium support to 20% of existing clients', completed: false },
]

const OwnerGoalDetails = () => {
  const { goalId } = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Mock data - in a real app, you'd fetch this based on goalId
  const [goal, setGoal] = useState({
    id: goalId || 'increase-quarterly-revenue',
    title: 'Increase Quarterly Revenue',
    target: '$500,000',
    current: 284500,
    progress: (284500 / 500000) * 100,
    status: 'On Track',
    description: 'This goal aims to boost our revenue streams through new client acquisition and upselling existing clients.',
  });

  const handleSaveGoal = (updatedGoal) => {
    setGoal(updatedGoal);
    // In a real app, you would also make an API call to save the changes.
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'bg-blue-100 text-blue-800';
      case 'At Risk': return 'bg-yellow-100 text-yellow-800';
      case 'Achieved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout
      role="owner"
      title={goal.title}
      description="Detailed view of a company goal, its progress, and contributing factors."
      headerIcon={<Target className="h-8 w-8 text-primary" />}
      headerAction={
          <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditModalOpen(true)}><Edit className="mr-2 h-4 w-4" /> Edit Goal</Button>
              <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete Goal</Button>
          </div>
      }
    >
      <EditGoalModal 
        isOpen={isEditModalOpen} 
        onOpenChange={setIsEditModalOpen} 
        goal={goal} 
        onSave={handleSaveGoal} 
      />
      <div className="grid gap-8">
        {/* Goal Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
                <CardTitle className="text-2xl">Goal Overview</CardTitle>
                <Badge className={getStatusColor(goal.status)}>{goal.status}</Badge>
            </div>
            <CardDescription>{goal.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Progress: <span className="font-bold text-foreground">{goal.current.toLocaleString()} / {goal.target}</span>
                </p>
                <Progress value={goal.progress} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div><span className="font-semibold">Target:</span> {goal.target}</div>
                <div><span className="font-semibold">Current:</span> ${goal.current.toLocaleString()}</div>
                <div><span className="font-semibold">Remaining:</span> ${(500000 - goal.current).toLocaleString()}</div>
                <div><span className="font-semibold">Achievement:</span> {goal.progress.toFixed(1)}%</div>
            </div>
          </CardContent>
        </Card>

        {/* Progress History & Sub-tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center"><TrendingUp className="mr-2 h-5 w-5" /> Progress History</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={historyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(str) => new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="value" stroke="var(--color-primary)" fill="var(--color-primary-light)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center"><List className="mr-2 h-5 w-5" /> Sub-Tasks / Initiatives</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {subTasks.map(task => (
                            <div key={task.id} className="flex items-center">
                                <CheckCircle className={`h-5 w-5 mr-3 ${task.completed ? 'text-green-500' : 'text-muted-foreground'}`} />
                                <span className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.title}</span>
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

export default OwnerGoalDetails;
