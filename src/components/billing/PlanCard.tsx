import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Rocket, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface PlanCardProps {
  plan: {
    id: string;
    name: string;
    price: number;
    period: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    isCurrent?: boolean;
    icon: React.ReactNode;
    color: string;
  };
  currentPlan: {
    name: string;
    price: number;
  };
  onSelect: (planId: string) => void;
  loading?: boolean;
}

export const PlanCard = ({ plan, currentPlan, onSelect, loading }: PlanCardProps) => {
  const isUpgrade = plan.price > currentPlan.price;
  const isDowngrade = plan.price < currentPlan.price;

  // Prorated calculation logic (simplified for demo)
  const remainingDays = 10; // Assuming 10 days left in a 30-day cycle
  const dayRateCurrent = currentPlan.price / 30;
  const dayRateNew = plan.price / 30;
  const proratedCost = (dayRateNew - dayRateCurrent) * remainingDays;

  const getDialogDescription = () => {
    if (isUpgrade) {
      return `You are about to upgrade to the ${plan.name} plan. A prorated charge of $${proratedCost.toFixed(2)} for the remaining period will be applied to your next invoice.`
    }
    if (isDowngrade) {
      return `You are about to downgrade to the ${plan.name} plan. Changes will take effect at the start of your next billing cycle. No refund will be issued for the current period.`
    }
    return `You are about to change to the ${plan.name} plan.`
  }

  
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-xl",
      plan.isCurrent && "border-primary shadow-lg ring-2 ring-primary/20",
      plan.isPopular && "border-accent shadow-lg scale-105"
    )}>
      {plan.isPopular && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg bg-gradient-to-r from-accent to-accent-light text-white">
            <Star className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}
      
      {plan.isCurrent && (
        <div className="absolute top-0 left-0">
          <Badge className="rounded-none rounded-br-lg bg-gradient-to-r from-primary to-primary-light text-white">
            Current Plan
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-8 pt-8">
        <div className={cn(
          "w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg",
          plan.color
        )}>
          {plan.icon}
        </div>
        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
        <p className="text-muted-foreground">{plan.description}</p>
        <div className="mt-6">
          <div className="flex items-baseline justify-center">
            <span className="text-5xl font-bold tracking-tight">${plan.price}</span>
            <span className="text-muted-foreground ml-2">/{plan.period}</span>
          </div>
          {plan.price > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              Billed {plan.period === 'month' ? 'monthly' : 'annually'}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-6">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              className={cn(
                "w-full h-12 font-semibold",
                plan.isCurrent 
                  ? "bg-muted text-muted-foreground cursor-not-allowed" 
                  : plan.isPopular 
                    ? "bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent shadow-lg" 
                    : "bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary"
              )}
              disabled={plan.isCurrent || loading}
            >
              {plan.isCurrent ? 'Current Plan' : plan.price === 0 ? 'Get Started' : 'Upgrade Now'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Plan Change</AlertDialogTitle>
              <AlertDialogDescription>
                {getDialogDescription()}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onSelect(plan.id)}>Confirm & Upgrade</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};