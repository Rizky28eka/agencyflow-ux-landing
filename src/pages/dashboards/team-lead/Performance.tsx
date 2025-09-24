
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, CheckSquare, Clock, Star } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const teamPerformanceData = [
    { id: 1, member: 'Mike C.', tasksCompleted: 25, onTimeDelivery: '96%', avgRating: 4.8 },
    { id: 2, member: 'Sarah J.', tasksCompleted: 30, onTimeDelivery: '98%', avgRating: 4.9 },
    { id: 3, member: 'Alex R.', tasksCompleted: 22, onTimeDelivery: '92%', avgRating: 4.6 },
    { id: 4, member: 'Emily D.', tasksCompleted: 28, onTimeDelivery: '95%', avgRating: 4.7 },
  ];

  const tasksChartConfig = {
    tasks: {
      label: "Tasks",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  const velocityChartConfig = {
    points: {
      label: "Points",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
                <CardHeader><CardTitle>Tasks Completed per Member</CardTitle></CardHeader>
                <CardContent>
                    <ChartContainer config={tasksChartConfig} className="min-h-[200px] w-full">
                        <BarChart accessibilityLayer data={tasksCompletedData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                              dataKey="member"
                              tickLine={false}
                              tickMargin={10}
                              axisLine={false}
                              tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis />
                            <ChartTooltip
                              cursor={false}
                              content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Bar dataKey="tasks" fill="var(--color-tasks)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Team Velocity (Story Points)</CardTitle></CardHeader>
                <CardContent>
                    <ChartContainer config={velocityChartConfig} className="min-h-[200px] w-full">
                        <LineChart accessibilityLayer data={velocityData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="week" />
                            <YAxis />
                            <ChartTooltip
                              cursor={false}
                              content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="points" stroke="var(--color-points)" strokeWidth={2} name="Points Completed" />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Team Performance Details</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Member</TableHead>
                            <TableHead>Tasks Completed</TableHead>
                            <TableHead>On-Time Delivery</TableHead>
                            <TableHead>Avg. Rating</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teamPerformanceData.map((member, index) => (
                            <TableRow key={index} onClick={() => navigate(`/dashboard/team-lead/performance/${member.id}`)} className="cursor-pointer">
                                <TableCell>{member.member}</TableCell>
                                <TableCell>{member.tasksCompleted}</TableCell>
                                <TableCell>{member.onTimeDelivery}</TableCell>
                                <TableCell>{member.avgRating}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </DashboardLayout>
  );
};

export default TeamLeadPerformance;
