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
import { format } from 'date-fns';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  brand: string;
  last4: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  holderName: string;
}


const BillingManagement = () => {
  const [loading, setLoading] = useState(false);
  const [isPaymentMethodDialogOpen, setIsPaymentMethodDialogOpen] = useState(false);
  const [currentPlanStatus, setCurrentPlanStatus] = useState<'active' | 'cancelled' | 'past_due'>('active');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
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

  const [plans, setPlans] = useState([
    {
      id: 'starter',
      name: 'Starter',
      price: 0,
      period: 'month',
      description: 'For small teams and freelancers',
      features: [
        'Up to 5 projects',
        'Up to 10 team members',
        'Basic Project Management',
        'Time Tracking',
        '10GB Storage',
        'Email Support',
      ],
      isCurrent: false,
      icon: <Zap className="w-8 h-8 text-white" />,
      color: 'bg-gradient-to-br from-gray-500 to-gray-600',
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 49,
      period: 'month',
      description: 'For growing teams that need more power',
      features: [
        'Up to 15 projects',
        'Up to 25 team members',
        'Includes all Starter features, plus:',
        'Team Lead Dashboard',
        'Standard Analytics & Reports',
        '50GB Storage',
        'Standard Integrations',
      ],
      isCurrent: false,
      icon: <Rocket className="w-8 h-8 text-white" />,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 99,
      period: 'month',
      description: 'For established agencies and businesses',
      features: [
        'Unlimited projects',
        'Up to 100 team members',
        'Includes all Basic features, plus:',
        'Project Manager Dashboard',
        'Finance Dashboard',
        'Client Portal',
        'Advanced Analytics & Reports',
        'Customizable Roles',
        '100GB Storage',
        'Priority Support',
      ],
      isCurrent: true,
      isPopular: true,
      icon: <Rocket className="w-8 h-8 text-white" />,
      color: 'bg-gradient-to-br from-primary to-primary-light',
    },
    {
      id: 'business',
      name: 'Business',
      price: 199,
      period: 'month',
      description: 'For larger businesses with more needs',
      features: [
        'Unlimited projects',
        'Up to 250 team members',
        'Includes all Professional features, plus:',
        'Owner Dashboard',
        'Goal Tracking',
        'Advanced Security (2FA)',
        '500GB Storage',
        'API Access',
        'Team Training',
      ],
      isCurrent: false,
      icon: <Crown className="w-8 h-8 text-white" />,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 299,
      period: 'month',
      description: 'For large organizations with advanced needs',
      features: [
        'Unlimited projects',
        'Unlimited team members',
        'Includes all Business features, plus:',
        'White-label Solution',
        'Single Sign-On (SSO)',
        'Audit Log',
        'Dedicated Account Manager',
        'SLA Guarantee',
      ],
      isCurrent: false,
      icon: <Crown className="w-8 h-8 text-white" />,
      color: 'bg-gradient-to-br from-accent to-accent-light',
    },
  ]);

  const [currentPlanData, setCurrentPlanData] = useState(() => {
    const currentPlan = plans.find(p => p.isCurrent);
    return {
      name: currentPlan?.name || '',
      price: currentPlan?.price || 0,
      period: currentPlan?.period || '',
      renewalDate: '2024-02-24',
      status: currentPlanStatus,
    }
  });

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
        const newPlans = plans.map(p => ({ ...p, isCurrent: p.id === planId }));
        setPlans(newPlans);
        const newPlan = newPlans.find(p => p.isCurrent);
        if (newPlan) {
          setCurrentPlanData({
            name: newPlan.name,
            price: newPlan.price,
            period: newPlan.period,
            renewalDate: '2024-03-24', // Mock new renewal date
            status: 'active',
          });
        }
        toast.success(`Successfully upgraded to ${newPlan?.name} plan!`);
      }
    }, 2000);
  };

  const handleAddPaymentMethod = (method: Omit<PaymentMethod, 'id'>) => {
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
        <TabsList className="flex overflow-x-auto whitespace-nowrap">
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
          
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                currentPlan={currentPlanData}
                onSelect={handlePlanSelect}
                loading={loading}
              />
            ))}
            </div>
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
                      <th className="text-center py-3 px-4">Basic</th>
                      <th className="text-center py-3 px-4">Professional</th>
                      <th className="text-center py-3 px-4">Business</th>
                      <th className="text-center py-3 px-4">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Team Members</td>
                      <td className="text-center py-3 px-4">10</td>
                      <td className="text-center py-3 px-4">25</td>
                      <td className="text-center py-3 px-4">100</td>
                      <td className="text-center py-3 px-4">250</td>
                      <td className="text-center py-3 px-4">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Storage</td>
                      <td className="text-center py-3 px-4">10GB</td>
                      <td className="text-center py-3 px-4">50GB</td>
                      <td className="text-center py-3 px-4">100GB</td>
                      <td className="text-center py-3 px-4">500GB</td>
                      <td className="text-center py-3 px-4">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Advanced Reports</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Customizable Roles</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">✓</td>
                      <td className="text-center py-3 px-4">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">SSO</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Audit Log</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">✓</td>
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
            isDialogOpen={isPaymentMethodDialogOpen}
            setIsDialogOpen={setIsPaymentMethodDialogOpen}
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
            onUpdatePaymentMethod={() => setIsPaymentMethodDialogOpen(true)}
          />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default BillingManagement;
