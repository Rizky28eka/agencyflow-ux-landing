import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, UserCheck, CheckCheck } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const TeamLeadApprovals = () => {
  const requests = [
    { id: 'REQ-001', member: 'Mike Chen', type: 'Leave', details: 'Vacation (5 days)', submitted: '2024-01-22', status: 'Pending' },
    { id: 'REQ-002', member: 'Sarah Johnson', type: 'Expense', details: 'Software Subscription ($50)', submitted: '2024-01-21', status: 'Approved' },
    { id: 'REQ-003', member: 'Alex Rodriguez', type: 'Leave', details: 'Sick Leave (1 day)', submitted: '2024-01-20', status: 'Approved' },
    { id: 'REQ-004', member: 'Emily Davis', type: 'Expense', details: 'Online Course ($200)', submitted: '2024-01-23', status: 'Pending' },
    { id: 'REQ-005', member: 'Mike Chen', type: 'Expense', details: 'Team Lunch ($150)', submitted: '2024-01-19', status: 'Rejected' },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Approved': return 'secondary';
      case 'Pending': return 'default';
      case 'Rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const handleBulkApprove = () => {
    toast.success('Selected requests have been approved.');
  };

  const renderRequestRow = (request: any, isPendingTab: boolean) => (
    <TableRow key={request.id}>
        {isPendingTab && <TableCell><Checkbox /></TableCell>}
        <TableCell className="font-medium">{request.id}</TableCell>
        <TableCell>{request.member}</TableCell>
        <TableCell><Badge variant="outline">{request.type}</Badge></TableCell>
        <TableCell className="text-muted-foreground">{request.details}</TableCell>
        <TableCell>{request.submitted}</TableCell>
        <TableCell><Badge variant={getStatusVariant(request.status)}>{request.status}</Badge></TableCell>
        <TableCell className="text-right">
            {request.status === 'Pending' && (
            <div className="space-x-2">
                <Button variant="outline" size="sm"><Check className="h-4 w-4 mr-1" /> Approve</Button>
                <Button variant="destructive" size="sm"><X className="h-4 w-4 mr-1" /> Reject</Button>
            </div>
            )}
        </TableCell>
    </TableRow>
  );

  return (
    <DashboardLayout
      role="team-lead"
      title="Approvals"
      description="Manage requests from your team members."
      headerIcon={<UserCheck className="h-8 w-8 text-primary" />}
    >
      <Tabs defaultValue="pending">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="all">All Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Pending Requests</CardTitle>
                <Button variant="outline" onClick={handleBulkApprove}><CheckCheck className="mr-2 h-4 w-4"/>Approve Selected</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead className="w-[50px]"><Checkbox /></TableHead><TableHead>ID</TableHead><TableHead>Member</TableHead><TableHead>Type</TableHead><TableHead>Details</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                <TableBody>{requests.filter(r => r.status === 'Pending').map(req => renderRequestRow(req, true))}</TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="all">
          <Card>
            <CardHeader><CardTitle>All Requests</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Member</TableHead><TableHead>Type</TableHead><TableHead>Details</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                <TableBody>{requests.map(req => renderRequestRow(req, false))}</TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default TeamLeadApprovals;