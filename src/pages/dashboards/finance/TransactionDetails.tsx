
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useNavigate } from 'react-router-dom';

const TransactionDetails = () => {
  const navigate = useNavigate();
  const { transactionId } = useParams();

  // Mock data based on transactionId
  const transactionData = {
    'TRX-001': {
      id: 'TRX-001',
      date: '2024-01-24',
      time: '10:05 AM',
      description: 'Invoice #INV-0124 - StartupXYZ',
      amount: 8500,
      type: 'Income',
      method: 'Bank Transfer',
      reference: 'INV-0124',
      client: 'StartupXYZ'
    },
    'TRX-002': {
      id: 'TRX-002',
      date: '2024-01-24',
      time: '09:15 AM',
      description: 'Office Rent - January',
      amount: -4500,
      type: 'Expense',
      method: 'Bank Transfer',
      reference: 'RENT-JAN-2024',
      client: 'Property Management Co.'
    }
  };

  const transaction = transactionData[transactionId as keyof typeof transactionData] || transactionData['TRX-001'];

  return (
    <DashboardLayout
      role="finance"
      title={`Transaction ${transaction.id}`}
      description={`Details for transaction on ${transaction.date}`}
      headerIcon={<DollarSign className="h-8 w-8 text-primary" />}
      headerAction={
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button>
            <Printer className="mr-2 h-4 w-4" />
            Print Receipt
          </Button>
        </div>
      }
    >
        <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
                <CardTitle className={`text-4xl font-bold ${transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'Income' ? '+' : '-'} ${Math.abs(transaction.amount).toLocaleString()}
                </CardTitle>
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
