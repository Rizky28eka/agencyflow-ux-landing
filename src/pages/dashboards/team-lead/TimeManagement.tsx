
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const TeamLeadTimeManagement = () => {
  const timeEntries = [
    { member: 'Mike Chen', project: 'Mobile App', task: 'User Auth Flow', date: '2024-01-24', hours: 5.0 },
    { member: 'Sarah Johnson', project: 'Website Redesign', task: 'Homepage Mockups', date: '2024-01-24', hours: 3.5 },
    { member: 'Alex Rodriguez', project: 'E-commerce Platform', task: 'API Documentation', date: '2024-01-23', hours: 6.5 },
  ];

  return (
    <DashboardLayout
      role="team-lead"
      title="Time Management"
      description="Review and approve time entries for your team."
      headerIcon={<Clock className="h-8 w-8 text-primary" />}
    >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
                <CardHeader><CardTitle>Team Hours (This Week)</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">84h</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Avg. Utilization</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">91%</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Pending Approvals</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">3</p></CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader><CardTitle>Recent Time Entries</CardTitle></CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Member</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead>Task</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Hours</TableHead>
                        </TableRow>
                    </TableHeader>
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
    </DashboardLayout>
  );
};

export default TeamLeadTimeManagement;
