
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Plus, MoreHorizontal, Repeat } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { GenerateInvoiceFromTime } from '@/components/invoicing/GenerateInvoiceFromTime';
import { useNavigate } from 'react-router-dom';

const FinanceInvoicing = () => {
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const navigate = useNavigate();

  const invoices = [
    { id: 'INV-0123', client: 'TechCorp', issueDate: '2024-01-15', dueDate: '2024-02-15', amount: 12500, status: 'Paid' },
    { id: 'INV-0124', client: 'StartupXYZ', issueDate: '2024-01-20', dueDate: '2024-02-20', amount: 8500, status: 'Pending' },
    { id: 'INV-0125', client: 'RetailCo', issueDate: '2023-12-10', dueDate: '2024-01-10', amount: 5000, status: 'Overdue' },
    { id: 'INV-0126', client: 'ShopLocal', issueDate: '2024-01-25', dueDate: '2024-02-25', amount: 7200, status: 'Pending' },
  ];

  return (
    <DashboardLayout
      role="finance"
      title="Invoicing"
      description="Create and manage client invoices."
      headerIcon={<FileText className="h-8 w-8 text-primary" />}
      headerAction={
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsGenerateModalOpen(true)}>Generate from Time</Button>
          <Button variant="outline"><Repeat className="mr-2 h-4 w-4" /> Recurring Invoices</Button>
          <Button className="bg-gradient-primary" onClick={() => navigate('/dashboard/finance/invoicing/new')}><Plus className="mr-2 h-4 w-4" /> Create Invoice</Button>
        </div>
      }
    >
      <GenerateInvoiceFromTime isOpen={isGenerateModalOpen} onOpenChange={setIsGenerateModalOpen} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
                <CardHeader><CardTitle>Total Outstanding</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">$15,700</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Total Overdue</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold text-red-500">$5,000</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Paid (Last 30 Days)</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">$45,800</p></CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>All Invoices</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between mb-4">
                    <div className="w-1/3">
                        <Input placeholder="Search by client or ID..." />
                    </div>
                    <div className="w-1/4">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="overdue">Overdue</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Table>
                    <TableHeader><TableRow><TableHead>Invoice ID</TableHead><TableHead>Client</TableHead><TableHead>Issue Date</TableHead><TableHead>Due Date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Amount</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {invoices.map(inv => (
                            <TableRow key={inv.id}>
                                <TableCell className="font-medium">{inv.id}</TableCell>
                                <TableCell>{inv.client}</TableCell>
                                <TableCell>{inv.issueDate}</TableCell>
                                <TableCell>{inv.dueDate}</TableCell>
                                <TableCell><Badge variant={inv.status === 'Paid' ? 'secondary' : inv.status === 'Overdue' ? 'destructive' : 'default'}>{inv.status}</Badge></TableCell>
                                <TableCell className="text-right">${inv.amount.toLocaleString()}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                            <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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

export default FinanceInvoicing;
