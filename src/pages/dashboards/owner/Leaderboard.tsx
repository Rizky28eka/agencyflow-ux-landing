import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const Leaderboard = () => {
  const taskLeaderboard = [
    { rank: 1, name: 'Emily Davis', score: 250 },
    { rank: 2, name: 'Sarah Johnson', score: 120 },
    { rank: 3, name: 'Mike Chen', score: 85 },
  ];

  const onTimeLeaderboard = [
    { rank: 1, name: 'Alex Rodriguez', score: '99%' },
    { rank: 2, name: 'Sarah Johnson', score: '98%' },
    { rank: 3, name: 'Mike Chen', score: '95%' },
  ];

  return (
    <DashboardLayout
      role="owner"
      title="Team Leaderboards"
      description="View top performers across your teams."
      headerIcon={<Trophy className="h-8 w-8 text-primary" />}
    >
      <Tabs defaultValue="tasks">
        <TabsList>
          <TabsTrigger value="tasks">Tasks Completed</TabsTrigger>
          <TabsTrigger value="on-time">On-Time Rate</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks">
          <Card>
            <CardHeader><CardTitle>Top Performers: Tasks Completed</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Rank</TableHead><TableHead>Member</TableHead><TableHead>Tasks</TableHead></TableRow></TableHeader>
                <TableBody>
                  {taskLeaderboard.map(member => (
                    <TableRow key={member.rank}>
                      <TableCell>{member.rank}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="on-time">
          <Card>
            <CardHeader><CardTitle>Top Performers: On-Time Rate</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Rank</TableHead><TableHead>Member</TableHead><TableHead>Rate</TableHead></TableRow></TableHeader>
                <TableBody>
                  {onTimeLeaderboard.map(member => (
                    <TableRow key={member.rank}>
                      <TableCell>{member.rank}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Leaderboard;