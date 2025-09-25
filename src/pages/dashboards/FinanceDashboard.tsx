import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, PieChart, CreditCard, Receipt, Calculator, FileText, Target, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';

const FinanceDashboard = () => {
  const financeMetrics = {
    monthlyRevenue: 95200,
    outstandingInvoices: 23800,
    profitMargin: 28.5,
    overduePayments: 8400,
    totalAssets: 284500,
    monthlyExpenses: 68200,
    netProfit: 27100,
    pendingInvoices: 18,
    overdueAccounts: 5
  };

  const cashFlowAlert = financeMetrics.overduePayments > 5000;
  
  const recentTransactions = [
    { id: 'TRX-001', description: 'Invoice #INV-0124 - StartupXYZ', amount: 8500, type: 'income', date: '2024-01-24' },
    { id: 'TRX-002', description: 'Office Rent - January', amount: -4500, type: 'expense', date: '2024-01-24' },
    { id: 'TRX-003', description: 'Software Subscriptions', amount: -1200, type: 'expense', date: '2024-01-23' },
    { id: 'TRX-004', description: 'Invoice #INV-0123 - TechCorp', amount: 12500, type: 'income', date: '2024-01-22' },
  ];

  const upcomingPayments = [
    { description: 'Payroll - January 2024', amount: 54800, dueDate: '2024-01-31', type: 'payroll' },
    { description: 'Office Utilities', amount: 850, dueDate: '2024-02-01', type: 'utilities' },
    { description: 'Software Renewals', amount: 2400, dueDate: '2024-02-05', type: 'subscriptions' },
  ];
  return (
    <DashboardLayout
      title="Finance Dashboard"
      description="Financial overview and expense management"
      headerIcon={<DollarSign className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      }
      requiresPermission={{ resource: 'finance', action: 'read' }}
    >

        {/* Cash Flow Alert */}
        {cashFlowAlert && (
          <Alert variant="destructive" className="mb-6">
            <DollarSign className="h-4 w-4" />
            <AlertDescription>
              ${financeMetrics.overduePayments.toLocaleString()} in overdue payments from {financeMetrics.overdueAccounts} accounts require immediate attention.
              <Link to="/dashboard/finance/invoicing" className="underline ml-1">Review invoices</Link>
            </AlertDescription>
          </Alert>
        )}
        {/* Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${financeMetrics.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding Invoices</CardTitle>
              <CreditCard className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${financeMetrics.outstandingInvoices.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{financeMetrics.pendingInvoices} pending invoices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Profit Margin</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{financeMetrics.profitMargin}%</div>
              <p className="text-xs text-muted-foreground">+2.1% improvement</p>
            </CardContent>
          </Card>

          <Card className={cashFlowAlert ? "border-orange-200 bg-orange-50/50" : ""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overdue Payments</CardTitle>
              <Target className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${financeMetrics.overduePayments.toLocaleString()}</div>
              <p className="text-xs text-orange-600">{financeMetrics.overdueAccounts} accounts overdue</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Receipt className="mr-2 h-5 w-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Payments */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5" />
                Upcoming Payments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{payment.description}</p>
                    <p className="text-xs text-muted-foreground">Due: {payment.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">${payment.amount.toLocaleString()}</p>
                    <Badge variant="outline" className="text-xs">
                      {payment.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        {/* Finance Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/dashboard/finance/invoicing">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <FileText className="mr-2 h-5 w-5" />
                  Invoicing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Create and manage invoices</p>
                <div className="mt-3 text-2xl font-bold text-primary">{financeMetrics.pendingInvoices}</div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/dashboard/finance/expenses">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Receipt className="mr-2 h-5 w-5" />
                  Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Track and categorize expenses</p>
                <div className="mt-3 text-2xl font-bold text-accent">${(financeMetrics.monthlyExpenses / 1000).toFixed(0)}k</div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/dashboard/finance/payroll">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calculator className="mr-2 h-5 w-5" />
                  Payroll
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Manage employee payroll</p>
                <div className="mt-3 text-sm font-bold text-primary">Next: Jan 31</div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/dashboard/finance/reports">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <PieChart className="mr-2 h-5 w-5" />
                  Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Financial analysis and insights</p>
                <div className="mt-3 text-sm font-bold text-accent">P&L, Cash Flow</div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/dashboard/finance/pnl">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Profit & Loss
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View P&L statements</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/dashboard/finance/cash-flow">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Cash Flow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Analyze cash flow statements</p>
              </CardContent>
            </Card>
          </Link>
        </div>
    </DashboardLayout>
  );
};

export default FinanceDashboard;