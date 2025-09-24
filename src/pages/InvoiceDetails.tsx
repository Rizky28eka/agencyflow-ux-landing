
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Download, Printer } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const InvoiceDetails = () => {
  const { invoiceId } = useParams();

  // Mock data - in a real app, you'd fetch this based on invoiceId
  const invoice = {
    id: invoiceId || 'INV-2024-001',
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
  };

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
    >
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50 p-6 flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Invoice</CardTitle>
              <CardDescription>#{invoice.id}</CardDescription>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Print</Button>
                <Button onClick={handleDownload}><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-semibold mb-2">Billed To</h4>
                <p className="font-bold">{invoice.client.name}</p>
                <p>{invoice.client.company}</p>
                <p>{invoice.client.address}</p>
                <p>{invoice.client.email}</p>
              </div>
              <div className="text-right">
                <h4 className="font-semibold mb-2">Invoice Details</h4>
                <p><span className="font-semibold">Date:</span> {invoice.date}</p>
                <p><span className="font-semibold">Due Date:</span> {invoice.dueDate}</p>
                <p><span className="font-semibold">Status:</span> <span className={`font-bold ${invoice.status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>{invoice.status.toUpperCase()}</span></p>
              </div>
            </div>

            <Separator className="my-8" />

            <div>
              <h4 className="font-semibold mb-4">Invoice Items</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Description</th>
                      <th className="text-center py-3 px-4 font-semibold">Qty</th>
                      <th className="text-right py-3 px-4 font-semibold">Price</th>
                      <th className="text-right py-3 px-4 font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4">{item.description}</td>
                        <td className="text-center py-3 px-4">{item.quantity}</td>
                        <td className="text-right py-3 px-4">${item.price.toFixed(2)}</td>
                        <td className="text-right py-3 px-4 font-bold">${item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Separator className="my-8" />

            <div className="flex justify-end">
                <div className="w-full max-w-xs text-right">
                    <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${invoice.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span className="text-muted-foreground">Tax (0%)</span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-4">
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
