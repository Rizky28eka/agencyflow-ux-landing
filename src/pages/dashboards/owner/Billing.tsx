
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Badge } from '@/components/ui/badge';

const OwnerBilling = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: ['Up to 3 Projects', 'Up to 5 Team Members', 'Task Management', 'Time Tracking', 'Community Support'],
      isCurrent: false,
      cta: 'Downgrade to Free',
    },
    {
      name: 'Pro',
      price: '$99',
      features: ['Unlimited Projects', 'Up to 50 Team Members', 'Advanced Analytics & Reports', 'Financial Overview', 'Client & Role Management', 'Priority Email Support'],
      isCurrent: true,
      cta: 'Current Plan',
    },
    {
      name: 'Enterprise',
      price: 'Contact Us',
      features: ['Everything in Pro', 'Unlimited Team Members', 'Admin System Settings', 'Dedicated Account Manager', 'Service Level Agreement (SLA)', '24/7 Phone Support'],
      isCurrent: false,
      cta: 'Contact Sales',
    }
  ];

  const currentPlan = plans.find(p => p.isCurrent);

  return (
    <DashboardLayout
      role="owner"
      title="Billing & Plan"
      description="Manage your subscription and billing details."
      headerIcon={<Zap className="h-8 w-8 text-primary" />}
    >
      {/* Current Plan Summary */}
      <Card className="mb-8 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle>Your Current Plan</CardTitle>
          <CardDescription>You are currently on the {currentPlan?.name} plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-2">
            <h2 className="text-3xl font-bold">{currentPlan?.price}</h2>
            <span className="text-muted-foreground">/ month</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Your plan renews on October 24, 2025.</p>
        </CardContent>
        <CardFooter>
            <Button variant="outline">Manage Billing</Button>
        </CardFooter>
      </Card>

      {/* Plan Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card key={index} className={`flex flex-col ${plan.isCurrent ? 'border-primary shadow-lg' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                {plan.isCurrent && <Badge>Current</Badge>}
              </div>
              <div className="flex items-baseline space-x-1 pt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== 'Contact Us' && <span className="text-muted-foreground">/ month</span>}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.isCurrent ? 'default' : 'outline'} disabled={plan.isCurrent}>
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default OwnerBilling;
