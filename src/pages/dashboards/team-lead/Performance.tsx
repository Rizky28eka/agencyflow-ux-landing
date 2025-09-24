
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, CheckSquare, Clock, Star } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Legend } from 'recharts';

const TeamLeadPerformance = () => {
  const tasksCompletedData = [
    { member: 'Mike C.', tasks: 25 },
    { member: 'Sarah J.', tasks: 30 },
    { member: 'Alex R.', tasks: 22 },
    { member: 'Emily D.', tasks: 28 },
  ];

  const velocityData = [
    { week: 'Week 1', points: 40 },
    { week: 'Week 2', points: 45 },
    { week: 'Week 3', points: 42 },
    { week: 'Week 4', points: 50 },
  ];

  return (
    <DashboardLayout
      role="team-lead"
      title="Team Performance"
      description="Analyze your team’s performance metrics and velocity."
      headerIcon={<TrendingUp className="h-8 w-8 text-primary" />}
    >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card><CardHeader><CardTitle>Tasks Completed (Month)</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">105</p></CardContent></Card>
            <Card><CardHeader><CardTitle>On-Time Delivery</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">94%</p></CardContent></Card>
            <Card><CardHeader><CardTitle>Avg. Task Rating</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">4.7 / 5.0</p></CardContent></Card>
            <Card>
                <CardHeader><CardTitle>Top Performer</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">Sarah J.</p></CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader><CardTitle>Tasks Completed per Member</CardTitle></CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-80 w-full">
                        <BarChart data={tasksCompletedData}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="member" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="tasks" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Team Velocity (Story Points)</CardTitle></CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-80 w-full">
                        <LineChart data={velocityData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="week" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line type="monotone" dataKey="points" stroke="#8b5cf6" strokeWidth={2} name="Points Completed" />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    </DashboardLayout>
  );
};

export default TeamLeadPerformance;
