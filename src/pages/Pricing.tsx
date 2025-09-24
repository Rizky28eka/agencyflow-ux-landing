import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      icon: Zap,
      price: 0,
      period: 'month',
      description: 'Perfect for getting started',
      badge: null,
      features: [
        'Up to 3 projects',
        'Basic role management',
        'Standard support',
        '5GB storage',
        'Basic analytics',
        'Email notifications'
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outline' as const,
      popular: false
    },
    {
      name: 'Professional',
      icon: Rocket,
      price: 29,
      period: 'month',
      description: 'For growing teams and agencies',
      badge: 'Most Popular',
      features: [
        'Unlimited projects',
        'Advanced role management',
        'Priority support',
        '100GB storage',
        'Advanced analytics & reports',
        'Custom integrations',
        'Team collaboration tools',
        'API access',
        'Custom workflows'
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'default' as const,
      popular: true
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: 99,
      period: 'month',
      description: 'For large organizations',
      badge: 'Premium',
      features: [
        'Everything in Professional',
        'Unlimited team members',
        'Dedicated account manager',
        'Unlimited storage',
        'White-label solution',
        'Custom integrations',
        'Advanced security features',
        'SLA guarantee',
        'On-premise deployment'
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'outline' as const,
      popular: false
    }
  ];

  const handlePlanSelect = (planName: string) => {
    if (planName === 'Enterprise') {
      // Could redirect to contact form
      window.open('mailto:sales@agencyflow.com?subject=Enterprise Plan Inquiry', '_blank');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your team. Start free, upgrade as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                plan.popular 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'hover:border-primary/50'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-none rounded-bl-lg bg-primary text-primary-foreground">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center mb-4 ${
                  plan.popular 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <plan.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </CardContent>

              <CardFooter className="pt-6">
                <Button 
                  variant={plan.buttonVariant}
                  className="w-full"
                  onClick={() => handlePlanSelect(plan.name)}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, all paid plans come with a 14-day free trial. No credit card required to start.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground text-sm">
                  We accept all major credit cards, PayPal, and bank transfers for enterprise customers.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                <p className="text-muted-foreground text-sm">
                  Absolutely. You can cancel your subscription at any time. Your plan will remain active until the end of your billing period.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you offer discounts for nonprofits?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we offer special pricing for nonprofits and educational institutions. Contact us for more details.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is my data secure?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we use enterprise-grade security measures including encryption, regular backups, and SOC 2 compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;