
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useNavigate } from 'react-router-dom';

const TransactionDetails = () => {
  const navigate = useNavigate();

  // Mock data for a single transaction
  const transaction = {
    id: 'TRX001',
    date: '2025-09-23',
    time: '10:05 AM',
    description: 'Invoice #120 payment from ClientX',
    amount: 15000,
    type: 'Income',
    method: 'Bank Transfer',
    reference: 'INV-0120',
    client: 'ClientX Corp.'
  };

  return (
    <DashboardLayout
      role="owner"
      title={`Transaction ${transaction.id}`}
      description={`Details for transaction on ${transaction.date}`}
      headerIcon={<ArrowLeft onClick={() => navigate(-1)} className="cursor-pointer h-8 w-8 text-primary" />}
      headerAction={<Button><Printer className="mr-2 h-4 w-4" /> Print Receipt</Button>}
    >
        <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold text-green-600">+ ${transaction.amount.toLocaleString()}</CardTitle>
                <CardDescription>{transaction.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="border-t border-dashed pt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="font-medium text-muted-foreground">Transaction ID</div>
                    <div className="text-right font-mono">{transaction.id}</div>

                    <div className="font-medium text-muted-foreground">Date</div>
                    <div className="text-right">{transaction.date}</div>

                    <div className="font-medium text-muted-foreground">Time</div>
                    <div className="text-right">{transaction.time}</div>

                    <div className="font-medium text-muted-foreground">Type</div>
                    <div className="text-right">{transaction.type}</div>

                    <div className="font-medium text-muted-foreground">Payment Method</div>
                    <div className="text-right">{transaction.method}</div>

                    <div className="font-medium text-muted-foreground">Client</div>
                    <div className="text-right">{transaction.client}</div>

                    <div className="font-medium text-muted-foreground">Reference</div>
                    <div className="text-right font-mono">{transaction.reference}</div>
                </div>
            </CardContent>
        </Card>
    </DashboardLayout>
  );
};

export default TransactionDetails;
