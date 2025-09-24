
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DashboardLayout } from '@/components/DashboardLayout';
import { DollarSign } from 'lucide-react';

const cashFlowData = {
  operating: {
    netIncome: 365200,
    depreciation: 50000,
    accountsReceivable: -25000,
    total: 390200,
  },
  investing: {
    equipmentPurchase: -100000,
    total: -100000,
  },
  financing: {
    loan: 50000,
    total: 50000,
  },
  netChange: 340200,
  beginningBalance: 150000,
  endBalance: 490200,
};

const CashFlow = () => {
  return (
    <DashboardLayout
      role="finance"
      title="Cash Flow Statement"
      description="Detailed breakdown of cash inflows and outflows."
      headerIcon={<DollarSign className="h-8 w-8 text-primary" />}
    >
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Statement - 2025</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="font-bold"><TableCell>Cash Flow from Operating Activities</TableCell><TableCell></TableCell></TableRow>
              <TableRow><TableCell className="pl-8">Net Income</TableCell><TableCell className="text-right">${cashFlowData.operating.netIncome.toLocaleString()}</TableCell></TableRow>
              <TableRow><TableCell className="pl-8">Depreciation</TableCell><TableCell className="text-right">${cashFlowData.operating.depreciation.toLocaleString()}</TableCell></TableRow>
              <TableRow><TableCell className="pl-8">Change in Accounts Receivable</TableCell><TableCell className="text-right">(${Math.abs(cashFlowData.operating.accountsReceivable).toLocaleString()})</TableCell></TableRow>
              <TableRow className="font-bold border-t"><TableCell>Net Cash from Operating Activities</TableCell><TableCell className="text-right">${cashFlowData.operating.total.toLocaleString()}</TableCell></TableRow>

              <TableRow className="font-bold pt-4"><TableCell>Cash Flow from Investing Activities</TableCell><TableCell></TableCell></TableRow>
              <TableRow><TableCell className="pl-8">Purchase of Equipment</TableCell><TableCell className="text-right">(${Math.abs(cashFlowData.investing.equipmentPurchase).toLocaleString()})</TableCell></TableRow>
              <TableRow className="font-bold border-t"><TableCell>Net Cash from Investing Activities</TableCell><TableCell className="text-right">(${Math.abs(cashFlowData.investing.total).toLocaleString()})</TableCell></TableRow>

              <TableRow className="font-bold pt-4"><TableCell>Cash Flow from Financing Activities</TableCell><TableCell></TableCell></TableRow>
              <TableRow><TableCell className="pl-8">Loan from Bank</TableCell><TableCell className="text-right">${cashFlowData.financing.loan.toLocaleString()}</TableCell></TableRow>
              <TableRow className="font-bold border-t"><TableCell>Net Cash from Financing Activities</TableCell><TableCell className="text-right">${cashFlowData.financing.total.toLocaleString()}</TableCell></TableRow>

              <TableRow className="font-bold border-t-4 border-primary"><TableCell>Net Change in Cash</TableCell><TableCell className="text-right">${cashFlowData.netChange.toLocaleString()}</TableCell></TableRow>
              <TableRow><TableCell>Beginning Cash Balance</TableCell><TableCell className="text-right">${cashFlowData.beginningBalance.toLocaleString()}</TableCell></TableRow>
              <TableRow className="font-bold border-t"><TableCell>Ending Cash Balance</TableCell><TableCell className="text-right">${cashFlowData.endBalance.toLocaleString()}</TableCell></TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default CashFlow;
