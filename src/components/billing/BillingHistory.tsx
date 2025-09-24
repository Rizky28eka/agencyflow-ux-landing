import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Receipt, Calendar, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  plan: string;
  period: string;
  downloadUrl?: string;
}

interface BillingHistoryProps {
  invoices: Invoice[];
}

export const BillingHistory = ({ invoices }: BillingHistoryProps) => {
  const navigate = useNavigate();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'paid': return 'secondary';
      case 'pending': return 'default';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'failed': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  const totalPaid = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      {/* Billing Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Paid</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${totalPaid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Invoices</CardTitle>
            <Receipt className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{invoices.length}</div>
            <p className="text-xs text-muted-foreground">Total invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Payment</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Feb 24</div>
            <p className="text-xs text-muted-foreground">$99.00</p>
          </CardContent>
        </Card>
      </div>

      {/* Billing History Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Receipt className="mr-2 h-5 w-5" />
              Billing History
            </CardTitle>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id} onClick={() => navigate(`/invoices/${invoice.id}`)} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{format(new Date(invoice.date), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{invoice.plan}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.period}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(invoice.status)} className={getStatusColor(invoice.status)}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">${invoice.amount.toFixed(2)}</TableCell>
                                      <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); toast.info(`Downloading invoice ${invoice.id}...`) }}>
                                          <Download className="h-4 w-4" />
                                        </Button>
                                      </TableCell>                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Mobile Card List */}
          <div className="sm:hidden space-y-4">
            {invoices.map((invoice) => (
              <Card key={invoice.id} onClick={() => navigate(`/invoices/${invoice.id}`)} className="cursor-pointer hover:bg-muted/50">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">{format(new Date(invoice.date), 'MMM dd, yyyy')}</p>
                    <Badge variant={getStatusVariant(invoice.status)} className={`mt-2 ${getStatusColor(invoice.status)}`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${invoice.amount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{invoice.plan}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};