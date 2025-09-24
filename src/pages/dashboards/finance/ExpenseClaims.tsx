
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Check, X, Receipt } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const FinanceExpenseClaims = () => {
  const claims = [
    { id: 'CLM-005', member: 'Mike Chen', date: '2024-01-26', description: 'Client Dinner', amount: 180, status: 'Pending' },
    { id: 'CLM-004', member: 'Sarah Johnson', date: '2024-01-25', description: 'Taxi fare for meeting', amount: 45, status: 'Approved' },
    { id: 'CLM-003', member: 'Alex Rodriguez', date: '2024-01-22', description: 'Online Course Subscription', amount: 200, status: 'Approved' },
    { id: 'CLM-002', member: 'Emily Davis', date: '2024-01-21', description: 'Project-related software', amount: 75, status: 'Rejected' },
    { id: 'CLM-001', member: 'Mike Chen', date: '2024-01-20', description: 'Team Lunch', amount: 150, status: 'Approved' },
  ];

  return (
    <DashboardLayout
      role="finance"
      title="Expense Claims"
      description="Review and process expense claims from employees."
      headerIcon={<Receipt className="h-8 w-8 text-primary" />}
    >
        <Card>
            <CardHeader><CardTitle>Pending Claims</CardTitle></CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Claim ID</TableHead>
                            <TableHead>Employee</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {claims.map(claim => (
                            <TableRow key={claim.id}>
                                <TableCell>{claim.id}</TableCell>
                                <TableCell>{claim.member}</TableCell>
                                <TableCell>{claim.date}</TableCell>
                                <TableCell>{claim.description}</TableCell>
                                <TableCell><Badge variant={claim.status === 'Approved' ? 'secondary' : claim.status === 'Rejected' ? 'destructive' : 'default'}>{claim.status}</Badge></TableCell>
                                <TableCell className="text-right">${claim.amount.toLocaleString()}</TableCell>
                                <TableCell className="text-right">
                                    {claim.status === 'Pending' && (
                                    <div className="space-x-2">
                                        <Button variant="outline" size="sm"><Check className="h-4 w-4 mr-1" /> Approve</Button>
                                        <Button variant="destructive" size="sm"><X className="h-4 w-4 mr-1" /> Reject</Button>
                                    </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </DashboardLayout>
  );
};

export default FinanceExpenseClaims;
