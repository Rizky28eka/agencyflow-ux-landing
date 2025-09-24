
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, DollarSign, Send } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const ClientDetails = () => {
  const { clientId } = useParams();

  // Mock data
  const client = { id: clientId, name: 'TechCorp', contact: 'John Doe', email: 'john.doe@techcorp.com' };
  const projects = [
    { id: 1, name: 'Website Redesign', status: 'In Progress', budget: 50000 },
    { id: 2, name: 'Mobile App Development', status: 'Completed', budget: 75000 },
  ];
  const invoices = [
    { id: 'INV-0123', date: '2024-01-15', amount: 12500, status: 'Paid' },
    { id: 'INV-0120', date: '2023-12-15', amount: 10000, status: 'Paid' },
  ];

  return (
    <DashboardLayout
      role="owner"
      title={client.name}
      description={`Details for client ${client.name}`}
      headerIcon={<FileText className="h-8 w-8 text-primary" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="items-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarFallback className="text-3xl">{client.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{client.name}</CardTitle>
              <p className="text-muted-foreground">{client.contact}</p>
              <p className="text-muted-foreground">{client.email}</p>
            </CardHeader>
            <CardContent className="text-center space-y-2">
                <Button onClick={() => toast.info('Sending proposal to TechCorp...')}><Send className="mr-2 h-4 w-4" /> Send Proposal</Button>
                <Button variant="outline" onClick={() => toast.info('Sending contract to TechCorp...')}>Send Contract</Button>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Budget</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>{project.name}</TableCell>
                      <TableCell>{project.status}</TableCell>
                      <TableCell className="text-right">${project.budget.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.status}</TableCell>
                      <TableCell className="text-right">${invoice.amount.toLocaleString()}</TableCell>
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

export default ClientDetails;
