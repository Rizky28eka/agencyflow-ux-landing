import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Crown, Zap, Rocket, CreditCard, Receipt, TrendingUp, AlertTriangle, Settings } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { PlanCard } from '@/components/billing/PlanCard';
import { BillingHistory } from '@/components/billing/BillingHistory';
import { PaymentMethods } from '@/components/billing/PaymentMethods';
import { UsageMetrics } from '@/components/billing/UsageMetrics';
import { BillingOverview } from '@/components/billing/BillingOverview';
import { SubscriptionManagement } from '@/components/billing/SubscriptionManagement';
import { toast } from 'sonner';

const BillingManagement = () => {
  const [loading, setLoading] = useState(false);
  const [currentPlanStatus, setCurrentPlanStatus] = useState<'active' | 'cancelled' | 'past_due'>('active');
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      type: 'card' as const,
      brand: 'Visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2027,
      isDefault: true,
      holderName: 'John Smith',
    },
    {
      id: '2',
      type: 'card' as const,
      brand: 'Mastercard',
      last4: '8888',
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false,
      holderName: 'John Smith',
    },
  ]);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 0,
      period: 'month',
      description: 'Perfect for small teams getting started',
      features: [
        'Up to 5 projects',
        'Up to 10 team members',
        '10GB storage',
        'Basic analytics',
        'Email support',
        'Standard integrations'
      ],
      isCurrent: false,
      icon: <Zap className="w-8 h-8 text-white" />,
      color: 'bg-gradient-to-br from-gray-500 to-gray-600',
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 99,
      period: 'month',
      description: 'For growing agencies and teams',
      features: [
        'Unlimited projects',
        'Up to 100 team members',
        '100GB storage',
        'Advanced analytics & reports',
        'Priority support',
        'Custom integrations',
        'API access',
        'Advanced permissions',
        'Client portal branding'
      ],
      isCurrent: true,
      isPopular: true,
      icon: <Rocket className="w-8 h-8 text-white" />,
      color: 'bg-gradient-to-br from-primary to-primary-light',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 299,
      period: 'month',
      description: 'For large organizations with advanced needs',
      features: [
        'Everything in Professional',
        'Unlimited team members',
        'Unlimited storage',
        'White-label solution',
        'Dedicated account manager',
        'SLA guarantee',
        'Advanced security',
        'Custom integrations',
        'On-premise deployment',
        'Training & onboarding'
      ],
      isCurrent: false,
      icon: <Crown className="w-8 h-8 text-white" />,
      color: 'bg-gradient-to-br from-accent to-accent-light',
    },
  ];

  const invoices = [
    {
      id: 'INV-2024-001',
      date: '2024-01-01',
      amount: 99.00,
      status: 'paid' as const,
      plan: 'Professional',
      period: 'January 2024',
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-01',
      amount: 99.00,
      status: 'paid' as const,
      plan: 'Professional',
      period: 'December 2023',
    },
    {
      id: 'INV-2023-011',
      date: '2023-11-01',
      amount: 99.00,
      status: 'paid' as const,
      plan: 'Professional',
      period: 'November 2023',
    },
    {
      id: 'INV-2023-010',
      date: '2023-10-01',
      amount: 99.00,
      status: 'paid' as const,
      plan: 'Professional',
      period: 'October 2023',
    },
  ];

  const currentPlanData = {
    name: 'Professional',
    price: 99,
    period: 'month',
    renewalDate: '2024-02-24',
    status: currentPlanStatus,
  };

  const nextInvoiceData = {
    amount: 99.00,
    date: '2024-02-24',
  };

  const usageData = {
    projects: { current: 18, limit: -1 }, // -1 means unlimited
    teamMembers: { current: 24, limit: 100 },
    storage: { current: 65, limit: 100, unit: 'GB' },
    apiCalls: { current: 8500, limit: 50000 },
  };

  const handlePlanSelect = (planId: string) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (planId === 'enterprise') {
        toast.success('Enterprise plan inquiry sent! Our sales team will contact you within 24 hours.');
      } else {
        toast.success(`Successfully upgraded to ${plans.find(p => p.id === planId)?.name} plan!`);
      }
    }, 2000);
  };

  const handleAddPaymentMethod = (method: any) => {
    const newMethod = {
      ...method,
      id: Date.now().toString(),
    };
    setPaymentMethods(prev => [...prev, newMethod]);
  };

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(m => m.id !== id));
    toast.success('Payment method removed successfully!');
  };

  const handleSetDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(m => ({ ...m, isDefault: m.id === id }))
    );
    toast.success('Default payment method updated!');
  };

  const handleCancelSubscription = () => {
    setCurrentPlanStatus('cancelled');
  };

  const handleReactivateSubscription = () => {
    setCurrentPlanStatus('active');
  };

  const defaultPaymentMethod = paymentMethods.find(m => m.isDefault);

  return (
    <DashboardLayout
      role="owner"
      title="Billing & Subscription"
      description="Comprehensive billing and subscription management"
      headerIcon={<CreditCard className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-to-r from-primary to-primary-light">
          <Receipt className="mr-2 h-4 w-4" />
          Download Invoice
        </Button>
      }
    >
      {/* Billing Status Alert */}
      {currentPlanData.status === 'past_due' && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Your payment is past due. Please update your payment method to avoid service interruption.
          </AlertDescription>
        </Alert>
      )}

      {currentPlanData.status === 'cancelled' && (
        <Alert className="mb-6 border-yellow-200 bg-yellow-50/50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            Your subscription is cancelled and will end on {format(new Date(currentPlanData.renewalDate), 'MMM dd, yyyy')}. 
            You can reactivate anytime before this date.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <BillingOverview 
            currentPlan={currentPlanData}
            nextInvoice={nextInvoiceData}
            paymentMethod={defaultPaymentMethod}
          />
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Scale your agency with the right plan. Upgrade or downgrade anytime with prorated billing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onSelect={handlePlanSelect}
                loading={loading}
              />
            ))}
          </div>

          {/* Plan Comparison Table */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Feature Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Feature</th>
                      <th className="text-center py-3 px-4">Starter</th>
                      <th className="text-center py-3 px-4">Professional</th>
                      <th className="text-center py-3 px-4">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Projects</td>
                      <td className="text-center py-3 px-4">5</td>
                      <td className="text-center py-3 px-4">Unlimited</td>
                      <td className="text-center py-3 px-4">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Team Members</td>
                      <td className="text-center py-3 px-4">10</td>
                      <td className="text-center py-3 px-4">100</td>
                      <td className="text-center py-3 px-4">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Storage</td>
                      <td className="text-center py-3 px-4">10GB</td>
                      <td className="text-center py-3 px-4">100GB</td>
                      <td className="text-center py-3 px-4">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Support</td>
                      <td className="text-center py-3 px-4">Email</td>
                      <td className="text-center py-3 px-4">Priority</td>
                      <td className="text-center py-3 px-4">24/7 Phone</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <UsageMetrics 
            usage={usageData}
            planName={currentPlanData.name}
          />
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <PaymentMethods
            paymentMethods={paymentMethods}
            onAdd={handleAddPaymentMethod}
            onRemove={handleRemovePaymentMethod}
            onSetDefault={handleSetDefaultPaymentMethod}
          />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <BillingHistory invoices={invoices} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <SubscriptionManagement
            currentPlan={currentPlanData}
            onCancel={handleCancelSubscription}
            onReactivate={handleReactivateSubscription}
          />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default BillingManagement;