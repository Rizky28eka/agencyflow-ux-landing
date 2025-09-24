
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Plus } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const TeamLeadTasks = () => {
  const tasks = [
    { id: 'TASK-102', name: 'Develop homepage frontend', project: 'Website Redesign', assignee: 'Mike C.', status: 'In Progress', priority: 'High' },
    { id: 'TASK-201', name: 'Implement user authentication flow', project: 'Mobile App', assignee: 'Mike C.', status: 'To Do', priority: 'High' },
    { id: 'TASK-101', name: 'Design new homepage mockups', project: 'Website Redesign', assignee: 'Sarah J.', status: 'Completed', priority: 'High' },
  ];

  return (
    <DashboardLayout
      role="team-lead"
      title="Task Assignment"
      description="Assign and monitor tasks for your team."
      headerIcon={<CheckSquare className="h-8 w-8 text-primary" />}
      headerAction={<Button className="bg-gradient-primary"><Plus className="mr-2 h-4 w-4" /> Assign New Task</Button>}
    >
        <Card>
            <CardHeader><CardTitle>Team Task Overview</CardTitle></CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Task</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead>Assignee</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.map(task => (
                            <TableRow key={task.id}>
                                <TableCell className="font-medium">{task.name}</TableCell>
                                <TableCell>{task.project}</TableCell>
                                <TableCell>{task.assignee}</TableCell>
                                <TableCell><Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'}>{task.priority}</Badge></TableCell>
                                <TableCell><Badge variant={task.status === 'Completed' ? 'secondary' : 'default'}>{task.status}</Badge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </DashboardLayout>
  );
};

export default TeamLeadTasks;
