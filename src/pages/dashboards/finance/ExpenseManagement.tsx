
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Receipt, Plus, Filter } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const FinanceExpenseManagement = () => {
  const expenses = [
    { id: 'EXP-001', date: '2024-01-22', category: 'Software', description: 'Figma Subscription (Annual)', amount: 540, status: 'Paid' },
    { id: 'EXP-002', date: '2024-01-20', category: 'Marketing', description: 'Google Ads Campaign', amount: 1200, status: 'Paid' },
    { id: 'EXP-003', date: '2024-01-18', category: 'Travel', description: 'Flight for Client Meeting', amount: 850, status: 'Reimbursed' },
    { id: 'EXP-004', date: '2024-01-15', category: 'Office Supplies', description: 'New Monitors & Keyboards', amount: 2500, status: 'Paid' },
    { id: 'EXP-005', date: '2024-01-25', category: 'Travel', description: 'Mike C. - Taxi for meeting', amount: 45, status: 'Pending' },
  ];

  return (
    <DashboardLayout
      role="finance"
      title="Expense Management"
      description="Track and manage all company expenses."
      headerIcon={<Receipt className="h-8 w-8 text-primary" />}
      headerAction={<Button className="bg-gradient-primary"><Plus className="mr-2 h-4 w-4" /> Add Expense</Button>}
    >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
                <CardHeader><CardTitle>Total Expenses (This Month)</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">$68,200</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Pending Reimbursements</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">$45.00</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Top Category</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">Software</p></CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>All Expenses</CardTitle>
                    <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {expenses.map(exp => (
                            <TableRow key={exp.id}>
                                <TableCell>{exp.date}</TableCell>
                                <TableCell><Badge variant="outline">{exp.category}</Badge></TableCell>
                                <TableCell className="font-medium">{exp.description}</TableCell>
                                <TableCell><Badge variant={exp.status === 'Paid' || exp.status === 'Reimbursed' ? 'secondary' : 'default'}>{exp.status}</Badge></TableCell>
                                <TableCell className="text-right font-bold">${exp.amount.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </DashboardLayout>
  );
};

export default FinanceExpenseManagement;
