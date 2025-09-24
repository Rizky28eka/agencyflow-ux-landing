
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Download, Filter, PieChart as PieChartIcon } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Pie, PieChart as RechartsPieChart, Cell, Legend } from 'recharts';

const TimeTrackingReport = () => {
  const timeEntries = [
    { member: 'Sarah J.', project: 'Website Redesign', task: 'Homepage Mockups', date: '2024-01-24', hours: 3.5 },
    { member: 'Mike C.', project: 'Mobile App', task: 'User Auth Flow', date: '2024-01-24', hours: 5.0 },
    { member: 'Emily D.', project: 'Website Redesign', task: 'Contact Form API', date: '2024-01-24', hours: 2.5 },
    { member: 'Sarah J.', project: 'Website Redesign', task: 'About Page Design', date: '2024-01-23', hours: 4.0 },
    { member: 'Alex R.', project: 'E-commerce Platform', task: 'API Documentation', date: '2024-01-23', hours: 6.5 },
    { member: 'Mike C.', project: 'Website Redesign', task: 'Component Library', date: '2024-01-22', hours: 8.0 },
  ];

  const projectBreakdownData = [
    { project: 'Website Redesign', hours: 15.5, fill: '#3b82f6' },
    { project: 'Mobile App', hours: 5.0, fill: '#8b5cf6' },
    { project: 'E-commerce', hours: 6.5, fill: '#10b981' },
  ];

  return (
    <DashboardLayout
      role="project-manager"
      title="Time Tracking Report"
      description="Analyze how time is spent across projects and team members."
      headerIcon={<Clock className="h-8 w-8 text-primary" />}
      headerAction={<Button><Download className="mr-2 h-4 w-4" /> Export Report</Button>}
    >
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader><CardTitle>Total Hours (This Week)</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">152h</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Billable Hours</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">128h (84%)</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Team Utilization</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">89%</p></CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <Select defaultValue="this-week">
            <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="Select Date Range" /></SelectTrigger>
            <SelectContent><SelectItem value="this-week">This Week</SelectItem><SelectItem value="last-week">Last Week</SelectItem></SelectContent>
        </Select>
        <Select defaultValue="all-projects">
            <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="Filter by Project" /></SelectTrigger>
            <SelectContent><SelectItem value="all-projects">All Projects</SelectItem></SelectContent>
        </Select>
        <Select defaultValue="all-members">
            <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="Filter by Member" /></SelectTrigger>
            <SelectContent><SelectItem value="all-members">All Members</SelectItem></SelectContent>
        </Select>
        <Button><Filter className="mr-2 h-4 w-4" /> Apply</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-1">
            <Card>
                <CardHeader><CardTitle className="flex items-center"><PieChartIcon className="mr-2 h-5 w-5" /> Hours by Project</CardTitle></CardHeader>
                <CardContent className="flex items-center justify-center">
                    <ChartContainer config={{}} className="h-64 w-full">
                        <RechartsPieChart><ChartTooltip content={<ChartTooltipContent />} /><Pie data={projectBreakdownData} dataKey="hours" nameKey="project" innerRadius={50}><Cell key="cell-0" fill={projectBreakdownData[0].fill} /><Cell key="cell-1" fill={projectBreakdownData[1].fill} /><Cell key="cell-2" fill={projectBreakdownData[2].fill} /></Pie><Legend /></RechartsPieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
        {/* Table */}
        <div className="lg:col-span-2">
            <Card>
                <CardHeader><CardTitle>Time Entries</CardTitle></CardHeader>
                <CardContent>
                <Table>
                    <TableHeader><TableRow><TableHead>Member</TableHead><TableHead>Project</TableHead><TableHead>Task</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Hours</TableHead></TableRow></TableHeader>
                    <TableBody>
                    {timeEntries.map((entry, index) => (
                        <TableRow key={index}>
                        <TableCell className="font-medium">{entry.member}</TableCell>
                        <TableCell>{entry.project}</TableCell>
                        <TableCell className="text-muted-foreground">{entry.task}</TableCell>
                        <TableCell>{entry.date}</TableCell>
                        <TableCell className="text-right font-bold">{entry.hours.toFixed(1)}h</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TimeTrackingReport;
