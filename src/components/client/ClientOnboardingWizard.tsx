import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Briefcase, CreditCard, MessageSquare, PartyPopper, CheckCircle } from 'lucide-react';

const steps = [
  { 
    title: 'Welcome to the Client Portal!', 
    description: 'Let’s get your account set up in a few quick steps.' 
  },
  { 
    title: 'Confirm Your Details', 
    description: 'Please ensure your contact information is correct.' 
  },
  { 
    title: 'Portal Overview', 
    description: 'Here’s a quick look at where to find everything.' 
  },
  { 
    title: 'You’re All Set!', 
    description: 'You can now manage your projects and billing with ease.' 
  },
];

export const ClientOnboardingWizard = () => {
  const [step, setStep] = useState(0);

  const handleNext = () => setStep(prev => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 0));

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <Progress value={progress} className="mb-4" />
          <CardTitle>{steps[step].title}</CardTitle>
          <CardDescription>{steps[step].description}</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[250px]">
          {step === 0 && (
            <div className="text-center p-8">
              <PartyPopper className="h-16 w-16 text-primary mx-auto mb-4" />
              <p className="text-lg">We're excited to collaborate with you!</p>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="jane.doe@example.com" />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4 text-sm">
                <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <Briefcase className="h-6 w-6 text-primary"/>
                    <p><span className="font-semibold">Projects:</span> View project timelines, progress, and approve deliverables.</p>
                </div>
                <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <CreditCard className="h-6 w-6 text-primary"/>
                    <p><span className="font-semibold">Billing:</span> Access invoices and manage payment methods.</p>
                </div>
                <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-primary"/>
                    <p><span className="font-semibold">Messages:</span> Communicate directly with your project team.</p>
                </div>
            </div>
          )}
          {step === 3 && (
            <div className="text-center p-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg">You're ready to go!</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 0 && <Button variant="outline" onClick={handleBack}>Back</Button>}
          <div /> {/* Spacer */}
          {step < steps.length - 1 
            ? <Button onClick={handleNext}>Next</Button>
            : <Button>Get Started</Button> // In a real app, this would close the wizard
          }
        </CardFooter>
      </Card>
    </div>
  );
};