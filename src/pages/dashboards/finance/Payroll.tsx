
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, Upload, DollarSign, Banknote, MoreHorizontal } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const FinancePayroll = () => {
  const payrollData = [
    { id: 'EMP-001', name: 'Sarah Johnson', role: 'Project Manager', salary: 7500, status: 'Paid', payDate: '2024-01-25' },
    { id: 'EMP-002', name: 'Mike Chen', role: 'Lead Designer', salary: 6800, status: 'Paid', payDate: '2024-01-25' },
    { id: 'EMP-003', name: 'Emily Davis', role: 'Sr. Backend Developer', salary: 7200, status: 'Pending', payDate: '2024-01-25' },
    { id: 'EMP-004', name: 'Alex Rodriguez', role: 'Marketing Lead', salary: 6500, status: 'Paid', payDate: '2024-01-25' },
  ];

  return (
    <DashboardLayout
      role="finance"
      title="Payroll Management"
      description="Process and manage employee payroll."
      headerIcon={<Banknote className="h-8 w-8 text-primary" />}
      headerAction={
        <div className="flex space-x-2">
            <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Import</Button>
            <Button><Download className="mr-2 h-4 w-4" /> Export</Button>
            <Button className="bg-gradient-primary">Run Payroll</Button>
        </div>
      }
    >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
                <CardHeader><CardTitle>Total Payroll (This Month)</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">$54,800</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Employees Paid</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">21 / 24</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Next Payroll Date</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">2024-02-25</p></CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>January 2024 Payroll</CardTitle>
                    <div className="flex items-center gap-2">
                        <Input placeholder="Search by employee name..." className="w-64" />
                        <Select>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Salary</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Pay Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payrollData.map(p => (
                            <TableRow key={p.id}>
                                <TableCell className="font-medium">{p.name}</TableCell>
                                <TableCell className="text-muted-foreground">{p.role}</TableCell>
                                <TableCell>${p.salary.toLocaleString()}</TableCell>
                                <TableCell><Badge variant={p.status === 'Paid' ? 'secondary' : 'default'}>{p.status}</Badge></TableCell>
                                <TableCell>{p.payDate}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>Edit Employee</DropdownMenuItem>
                                            <DropdownMenuItem>View Payslip</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle>Accounting Integration</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4">
                <p className="text-muted-foreground">Connect your accounting software to sync payroll data automatically.</p>
                <Button variant="outline">Connect to Xero</Button>
                <Button variant="outline">Connect to QuickBooks</Button>
            </CardContent>
        </Card>
    </DashboardLayout>
  );
};

export default FinancePayroll;
