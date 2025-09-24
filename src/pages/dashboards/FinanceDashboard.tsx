import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, PieChart, CreditCard, Receipt, Calculator, FileText, Target, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';

const FinanceDashboard = () => {
  return (
    <DashboardLayout
      role="finance"
      title="Finance Dashboard"
      description="Financial overview and expense management"
      headerIcon={<DollarSign className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      }
    >

        {/* Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$95,200</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding Invoices</CardTitle>
              <CreditCard className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$23,800</div>
              <p className="text-xs text-muted-foreground">18 pending invoices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Profit Margin</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">28.5%</div>
              <p className="text-xs text-muted-foreground">+2.1% improvement</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overdue Payments</CardTitle>
              <Target className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$8,400</div>
              <p className="text-xs text-orange-600">5 accounts overdue</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Financial Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Financial Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">Total Assets</span>
                <span className="text-xl font-bold text-primary">$284,500</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">Monthly Expenses</span>
                <span className="text-xl font-bold text-accent">$68,200</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">Net Profit</span>
                <span className="text-xl font-bold text-primary">$27,100</span>
              </div>
            </CardContent>
          </Card>

          {/* Financial Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5" />
                Financial Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
            <Link to="/dashboard/finance/expenses" className="w-full">
              <Button className="w-full justify-start" variant="outline">
                <Receipt className="mr-2 h-4 w-4" />
                Expense Management
              </Button>
            </Link>
                          <Link to="/dashboard/finance/invoicing" className="w-full">
                            <Button className="w-full justify-start" variant="outline">
                              <FileText className="mr-2 h-4 w-4" />
                              Invoice Management
                            </Button>
                          </Link>            <Link to="/dashboard/finance/reports" className="w-full">
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                Financial Reports
              </Button>
            </Link>
            <Link to="/dashboard/finance/budget" className="w-full">
              <Button className="w-full justify-start" variant="outline">
                <PieChart className="mr-2 h-4 w-4" />
                Budget Planning
              </Button>
            </Link>
            <Link to="/dashboard/finance/tax" className="w-full">
                <Button className="w-full justify-start" variant="outline">
                    <Calculator className="mr-2 h-4 w-4" />
                    Tax Calculations
                </Button>
            </Link>
            </CardContent>
          </Card>
        </div>
    </DashboardLayout>
  );
};

export default FinanceDashboard;