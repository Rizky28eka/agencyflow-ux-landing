
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Download, Printer, Receipt } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const InvoiceDetails = () => {
  const { invoiceId } = useParams();

  // Mock data based on invoiceId
  const invoiceData = {
    'INV-2024-001': {
      id: 'INV-2024-001',
      date: '2024-01-01',
      dueDate: '2024-01-15',
      amount: 99.00,
      status: 'paid' as const,
      plan: 'Professional Plan',
      period: 'January 1, 2024 - January 31, 2024',
      client: {
        name: 'Maksim Lakna',
        company: 'AgencyFlow Inc.',
        address: '123 Design St, Creativity City, 10101',
        email: 'maksim@agencyflow.com'
      },
      items: [
        {
          description: 'Professional Plan Subscription',
          quantity: 1,
          price: 99.00,
          total: 99.00,
        },
      ],
    },
    'INV-2023-012': {
      id: 'INV-2023-012',
      date: '2023-12-01',
      dueDate: '2023-12-15',
      amount: 99.00,
      status: 'paid' as const,
      plan: 'Professional Plan',
      period: 'December 1, 2023 - December 31, 2023',
      client: {
        name: 'Maksim Lakna',
        company: 'AgencyFlow Inc.',
        address: '123 Design St, Creativity City, 10101',
        email: 'maksim@agencyflow.com'
      },
      items: [
        {
          description: 'Professional Plan Subscription',
          quantity: 1,
          price: 99.00,
          total: 99.00,
        },
      ],
    }
  };

  const invoice = invoiceData[invoiceId as keyof typeof invoiceData] || invoiceData['INV-2024-001'];

  const handlePrint = () => {
    window.print();
  }

  const handleDownload = () => {
    // In a real app, this would trigger a PDF generation and download
    toast.info(`Downloading invoice ${invoice.id} as PDF...`);
  }

  return (
    <DashboardLayout
      role="owner"
      title={`Invoice ${invoice.id}`}
      description={`Details for invoice from ${invoice.date}`}
      headerIcon={<Receipt className="h-6 w-6 text-primary" />}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-xl sm:text-2xl truncate">Invoice</CardTitle>
              <CardDescription className="truncate">#{invoice.id}</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={handlePrint} className="w-full sm:w-auto">
                <Printer className="mr-2 h-4 w-4" /> 
                <span className="hidden sm:inline">Print</span>
                <span className="sm:hidden">Print</span>
              </Button>
              <Button onClick={handleDownload} className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" /> 
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">PDF</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
              <div className="space-y-1">
                <h4 className="font-semibold mb-2">Billed To</h4>
                <p className="font-bold">{invoice.client.name}</p>
                <p className="text-sm text-muted-foreground">{invoice.client.company}</p>
                <p className="text-sm text-muted-foreground">{invoice.client.address}</p>
                <p className="text-sm text-muted-foreground">{invoice.client.email}</p>
              </div>
              <div className="md:text-right space-y-1">
                <h4 className="font-semibold mb-2">Invoice Details</h4>
                <p className="text-sm"><span className="font-semibold">Date:</span> {invoice.date}</p>
                <p className="text-sm"><span className="font-semibold">Due Date:</span> {invoice.dueDate}</p>
                <p className="text-sm"><span className="font-semibold">Status:</span> <span className={`font-bold ${invoice.status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>{invoice.status.toUpperCase()}</span></p>
              </div>
            </div>

            <Separator className="my-6 lg:my-8" />

            <div className="space-y-4">
              <h4 className="font-semibold">Invoice Items</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 sm:px-4 font-semibold">Description</th>
                      <th className="text-center py-3 px-2 sm:px-4 font-semibold">Qty</th>
                      <th className="text-right py-3 px-2 sm:px-4 font-semibold">Price</th>
                      <th className="text-right py-3 px-2 sm:px-4 font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-2 sm:px-4">{item.description}</td>
                        <td className="text-center py-3 px-2 sm:px-4">{item.quantity}</td>
                        <td className="text-right py-3 px-2 sm:px-4">${item.price.toFixed(2)}</td>
                        <td className="text-right py-3 px-2 sm:px-4 font-bold">${item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Separator className="my-6 lg:my-8" />

            <div className="flex justify-end">
              <div className="w-full max-w-xs text-right space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${invoice.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (0%)</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>${invoice.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InvoiceDetails;
