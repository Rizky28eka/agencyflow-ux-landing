import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Users, UserPlus, Mail, Phone, MoreHorizontal, TrendingUp, CheckSquare, PieChart } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Pie, PieChart as RechartsPieChart, Cell, Legend } from 'recharts';

import { Link } from 'react-router-dom';

const OwnerTeam = () => {
  const teamMembers = [
    { id: 1, name: 'Sarah Johnson', role: 'Project Manager', onTimeRate: 98, completedTasks: 120, workload: 80 },
    { id: 2, name: 'Mike Chen', role: 'Lead Designer', onTimeRate: 95, completedTasks: 85, workload: 95 },
    { id: 3, name: 'Emily Davis', role: 'Developer', onTimeRate: 92, completedTasks: 250, workload: 70 },
    { id: 4, name: 'Alex Rodriguez', role: 'Marketing Lead', onTimeRate: 99, completedTasks: 50, workload: 60 },
  ];

  const allocationData = [
      { department: 'Development', count: 10, fill: '#3b82f6' },
      { department: 'Design', count: 5, fill: '#8b5cf6' },
      { department: 'Marketing', count: 4, fill: '#10b981' },
      { department: 'Finance', count: 3, fill: '#f97316' },
      { department: 'Management', count: 2, fill: '#ef4444' },
  ];

  return (
    <DashboardLayout
      role="owner"
      title="Team Management"
      description="Manage all team members and departments"
      headerIcon={<Users className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      }
    >
      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Members</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">24</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Departments</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">6</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Utilization</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">85%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4.7</div>
          </CardContent>
        </Card>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Team Members Table */}
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                    <CardTitle>All Team Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Member</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>On-Time Rate</TableHead>
                            <TableHead>Completed Tasks</TableHead>
                            <TableHead>Workload</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {teamMembers.map((member, index) => (
                            <TableRow key={member.id}>
                            <TableCell>
                                <div className="font-medium">{member.name}</div>
                            </TableCell>
                            <TableCell>{member.role}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                <Progress value={member.onTimeRate} className="w-24 h-2" />
                                <span>{member.onTimeRate}%</span>
                                </div>
                            </TableCell>
                            <TableCell>{member.completedTasks}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                <Progress value={member.workload} className="w-24 h-2" />
                                <span>{member.workload}%</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <Link to={`/dashboard/owner/team/${index + 1}`}>
                                  <Button variant="outline" size="sm">View Details</Button>
                                </Link>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Resource Allocation Chart */}
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader><CardTitle className="flex items-center"><PieChart className="mr-2 h-5 w-5"/> Resource Allocation</CardTitle></CardHeader>
                    <CardContent>
                        <ChartContainer config={{}} className="h-64 w-full">
                            <RechartsPieChart>
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Pie data={allocationData} dataKey="count" nameKey="department" innerRadius={50} strokeWidth={2}>
                                    {allocationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Legend />
                            </RechartsPieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    </DashboardLayout>
  );
};

export default OwnerTeam;