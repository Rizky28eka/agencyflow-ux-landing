
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, CreditCard, Receipt, PieChart, Download, ArrowUp, ArrowDown } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart as RechartsPieChart, Cell, Legend } from 'recharts';

const OwnerFinance = () => {
  // Mock data
  const revenueBreakdownData = [
    { service: 'Web Dev', value: 450000, fill: '#3b82f6' },
    { service: 'UX/UI Design', value: 320000, fill: '#8b5cf6' },
    { service: 'Marketing', value: 250000, fill: '#10b981' },
    { service: 'Maintenance', value: 150000, fill: '#f97316' },
  ];

  const profitTrendsData = [
    { month: 'Jan', profit: 25000 },
    { month: 'Feb', profit: 28000 },
    { month: 'Mar', profit: 32000 },
    { month: 'Apr', profit: 30000 },
    { month: 'May', profit: 35000 },
    { month: 'Jun', profit: 42000 },
  ];

  const recentTransactions = [
    { id: 'TRX001', date: '2025-09-23', description: 'Invoice #120 payment from ClientX', amount: 15000, type: 'Income' },
    { id: 'TRX002', date: '2025-09-22', description: 'Software Subscription (Figma)', amount: -540, type: 'Expense' },
    { id: 'TRX003', date: '2025-09-22', description: 'Project Alpha milestone payment', amount: 25000, type: 'Income' },
    { id: 'TRX004', date: '2025-09-21', description: 'Office Supplies', amount: -850, type: 'Expense' },
    { id: 'TRX005', date: '2025-09-20', description: 'Invoice #119 payment from ClientY', amount: 8500, type: 'Income' },
  ];

  return (
    <DashboardLayout
      role="owner"
      title="Financial Overview"
      description="Revenue, expenses, and financial health"
      headerIcon={<DollarSign className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <Download className="mr-2 h-4 w-4" />
          Financial Report
        </Button>
      }
    >
      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$1,284,500</div>
            <p className="text-xs text-muted-foreground">+18.2% from last year</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$365,200</div>
            <p className="text-xs text-muted-foreground">28.4% margin</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$45,800</div>
            <p className="text-xs text-muted-foreground">12 invoices pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Expenses</CardTitle>
            <Receipt className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$89,300</div>
            <p className="text-xs text-muted-foreground">Within budget</p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Profit Trends (Last 6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64 w-full">
              <BarChart data={profitTrendsData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                <ChartTooltip cursor={{ fill: 'hsl(var(--muted) / 0.5)' }} content={<ChartTooltipContent />} />
                <Bar dataKey="profit" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5" />
              Revenue Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer config={{}} className="h-64 w-full">
              <RechartsPieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie data={revenueBreakdownData} dataKey="value" nameKey="service" innerRadius={50} strokeWidth={2}>
                  {revenueBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend />
              </RechartsPieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((trx) => (
                <TableRow key={trx.id}>
                  <TableCell className="font-medium">{trx.id}</TableCell>
                  <TableCell>{trx.date}</TableCell>
                  <TableCell>{trx.description}</TableCell>
                  <TableCell className={`text-right font-semibold ${trx.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                    <div className="flex items-center justify-end">
                      {trx.type === 'Income' ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                      ${Math.abs(trx.amount).toLocaleString()}
                    </div>
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

export default OwnerFinance;
