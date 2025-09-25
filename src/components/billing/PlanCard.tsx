import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

export const PlanCard = ({
  plan,
  currentPlan,
  onSelect,
  loading,
}: PlanCardProps) => {
  const isUpgrade = plan.price > currentPlan.price;
  const isDowngrade = plan.price < currentPlan.price;

  const remainingDays = 10; // demo only
  const dayRateCurrent = currentPlan.price / 30;
  const dayRateNew = plan.price / 30;
  const proratedCost = (dayRateNew - dayRateCurrent) * remainingDays;

  const getDialogDescription = () => {
    if (isUpgrade) {
      return `You are about to upgrade to the ${
        plan.name
      } plan. A prorated charge of $${proratedCost.toFixed(
        2
      )} for the remaining period will be applied to your next invoice.`;
    }
    if (isDowngrade) {
      return `You are about to downgrade to the ${plan.name} plan. Changes will take effect at the start of your next billing cycle. No refund will be issued for the current period.`;
    }
    return `You are about to change to the ${plan.name} plan.`;
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
        plan.isCurrent && "border-primary shadow-lg ring-2 ring-primary/20",
        plan.isPopular && "border-accent shadow-lg scale-105"
      )}
    >
      {plan.isPopular && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg bg-gradient-to-r from-accent to-accent-light text-white text-xs sm:text-sm">
            <Star className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}

      {plan.isCurrent && (
        <div className="absolute top-0 left-0">
          <Badge className="rounded-none rounded-br-lg bg-gradient-to-r from-primary to-primary-light text-white text-xs sm:text-sm">
            Current Plan
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-6 pt-8 sm:pt-10">
        <div
          className={cn(
            "w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg",
            plan.color
          )}
        >
          {plan.icon}
        </div>
        <CardTitle className="text-xl sm:text-2xl font-bold">
          {plan.name}
        </CardTitle>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          {plan.description}
        </p>
        <div className="mt-6">
          <div className="flex items-baseline justify-center">
            <span className="text-4xl sm:text-5xl font-bold tracking-tight">
              ${plan.price}
            </span>
            <span className="text-muted-foreground ml-1 sm:ml-2">
              /{plan.period}
            </span>
          </div>
          {plan.price > 0 && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
              Billed {plan.period === "month" ? "monthly" : "annually"}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-4 sm:px-6">
        <div className="space-y-3">
          {plan.features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 bg-muted/40 p-2 rounded-lg"
            >
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-sm sm:text-base leading-relaxed">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-6 px-4 sm:px-6">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className={cn(
                "w-full h-11 sm:h-12 font-semibold focus-visible:ring-2 focus-visible:ring-offset-2",
                plan.isCurrent
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : plan.isPopular
                  ? "bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent shadow-lg"
                  : "bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary"
              )}
              aria-disabled={plan.isCurrent || loading}
              disabled={plan.isCurrent || loading}
            >
              {plan.isCurrent
                ? "Current Plan"
                : plan.price === 0
                ? "Get Started"
                : "Upgrade Now"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Plan Change</AlertDialogTitle>
              <AlertDialogDescription>
                {getDialogDescription()}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onSelect(plan.id)}>
                Confirm & Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
