
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DashboardLayout } from '@/components/DashboardLayout';
import { DollarSign } from 'lucide-react';

const pnlData = {
  revenue: 1284500,
  cogs: 450000,
  grossProfit: 834500,
  operatingExpenses: {
    salaries: 350000,
    marketing: 50000,
    rent: 60000,
    software: 25000,
  },
  operatingIncome: 349500,
  netProfit: 365200,
};

const trendData = [
  { name: 'Q1', revenue: 650000, profit: 250000 },
  { name: 'Q2', revenue: 780000, profit: 320000 },
  { name: 'Q3', revenue: 920000, profit: 410000 },
  { name: 'Q4', revenue: 1284500, profit: 365200 },
];

const ProfitAndLoss = () => {
  return (
    <DashboardLayout
      role="finance"
      title="Profit & Loss Statement"
      description="Detailed breakdown of revenue, costs, and profit."
      headerIcon={<DollarSign className="h-8 w-8 text-primary" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>P&L Statement - 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow className="font-bold"><TableCell>Revenue</TableCell><TableCell className="text-right">${pnlData.revenue.toLocaleString()}</TableCell></TableRow>
                <TableRow><TableCell className="pl-8">Cost of Goods Sold</TableCell><TableCell className="text-right">(${pnlData.cogs.toLocaleString()})</TableCell></TableRow>
                <TableRow className="font-bold border-t"><TableCell>Gross Profit</TableCell><TableCell className="text-right">${pnlData.grossProfit.toLocaleString()}</TableCell></TableRow>
                <TableRow className="font-bold pt-4"><TableCell>Operating Expenses</TableCell><TableCell></TableCell></TableRow>
                <TableRow><TableCell className="pl-8">Salaries & Wages</TableCell><TableCell className="text-right">(${pnlData.operatingExpenses.salaries.toLocaleString()})</TableCell></TableRow>
                <TableRow><TableCell className="pl-8">Marketing & Advertising</TableCell><TableCell className="text-right">(${pnlData.operatingExpenses.marketing.toLocaleString()})</TableCell></TableRow>
                <TableRow><TableCell className="pl-8">Rent & Utilities</TableCell><TableCell className="text-right">(${pnlData.operatingExpenses.rent.toLocaleString()})</TableCell></TableRow>
                <TableRow><TableCell className="pl-8">Software & Subscriptions</TableCell><TableCell className="text-right">(${pnlData.operatingExpenses.software.toLocaleString()})</TableCell></TableRow>
                <TableRow className="font-bold border-t"><TableCell>Operating Income</TableCell><TableCell className="text-right">${pnlData.operatingIncome.toLocaleString()}</TableCell></TableRow>
                <TableRow className="font-bold text-lg border-t-4 border-primary"><TableCell>Net Profit</TableCell><TableCell className="text-right">${pnlData.netProfit.toLocaleString()}</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue vs. Profit Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                <Bar dataKey="profit" fill="#10b981" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProfitAndLoss;
