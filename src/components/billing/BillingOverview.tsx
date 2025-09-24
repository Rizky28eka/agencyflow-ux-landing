import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, CartesianGrid, XAxis, YAxis, Line, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CreditCard, DollarSign, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { format, addDays } from 'date-fns';

const usageHistory = [
  { month: 'Jan', projects: 10, members: 5, storage: 20 },
  { month: 'Feb', projects: 12, members: 6, storage: 25 },
  { month: 'Mar', projects: 15, members: 7, storage: 30 },
  { month: 'Apr', projects: 14, members: 8, storage: 35 },
  { month: 'May', projects: 16, members: 9, storage: 40 },
  { month: 'Jun', projects: 18, members: 10, storage: 45 },
];

interface BillingOverviewProps {
  currentPlan: {
    name: string;
    price: number;
    period: string;
    renewalDate: string;
    status: 'active' | 'cancelled' | 'past_due';
  };
  nextInvoice: {
    amount: number;
    date: string;
  };
  paymentMethod?: {
    brand: string;
    last4: string;
  };
}

export const BillingOverview = ({ currentPlan, nextInvoice, paymentMethod }: BillingOverviewProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'past_due': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'secondary';
      case 'cancelled': return 'outline';
      case 'past_due': return 'destructive';
      default: return 'secondary';
    }
  };

  const daysUntilRenewal = Math.ceil(
    (new Date(currentPlan.renewalDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-6">
      {/* Current Subscription Status */}
      <Card className="bg-gradient-to-r from-primary/5 via-background to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              {getStatusIcon(currentPlan.status)}
              <span className="ml-2">Current Subscription</span>
            </span>
            <Badge variant={getStatusVariant(currentPlan.status)} className="capitalize">
              {currentPlan.status.replace('_', ' ')}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Current Plan</p>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                <span className="text-lg font-semibold text-primary">
                  ${currentPlan.price}/{currentPlan.period}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Next Renewal</p>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">
                  {format(new Date(currentPlan.renewalDate), 'MMM dd, yyyy')}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {daysUntilRenewal > 0 ? `${daysUntilRenewal} days remaining` : 'Renewal overdue'}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Payment Method</p>
              {paymentMethod ? (
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">
                    {paymentMethod.brand} •••• {paymentMethod.last4}
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-semibold">No payment method</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Invoice</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${nextInvoice.amount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Due {format(new Date(nextInvoice.date), 'MMM dd, yyyy')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Billing Cycle</CardTitle>
            <Calendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground capitalize">{currentPlan.period}ly</div>
            <p className="text-xs text-muted-foreground">
              {currentPlan.period === 'month' ? 'Billed every month' : 'Billed annually'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Annual Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {currentPlan.period === 'year' ? '$238' : '$0'}
            </div>
            <p className="text-xs text-muted-foreground">
              {currentPlan.period === 'year' ? 'vs monthly billing' : 'Switch to annual'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="projects" stroke="#3b82f6" strokeWidth={2} name="Projects" />
                <Line type="monotone" dataKey="members" stroke="#8b5cf6" strokeWidth={2} name="Team Members" />
                <Line type="monotone" dataKey="storage" stroke="#10b981" strokeWidth={2} name="Storage (GB)" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};