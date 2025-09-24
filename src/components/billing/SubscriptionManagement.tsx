import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Settings, AlertTriangle, Calendar, CreditCard, RefreshCw, X } from 'lucide-react';
import { format, addMonths } from 'date-fns';
import { toast } from 'sonner';
import { ChangeCycleDialog } from './ChangeCycleDialog';

interface SubscriptionManagementProps {
  currentPlan: {
    name: string;
    price: number;
    period: string;
    renewalDate: string;
    status: 'active' | 'cancelled' | 'past_due';
  };
  onCancel: () => void;
  onReactivate: () => void;
  onUpdatePaymentMethod: () => void;
}

export const SubscriptionManagement = ({ currentPlan, onCancel, onReactivate, onUpdatePaymentMethod }: SubscriptionManagementProps) => {
  const [autoRenew, setAutoRenew] = useState(true);
  const [cancelReason, setCancelReason] = useState('');
  const [isCycleDialogOpen, setIsCycleDialogOpen] = useState(false);

  const handleCycleChange = (newCycle: string) => {
    // In a real app, you would make an API call to update the subscription
    toast.success(`Billing cycle changed to ${newCycle}ly.`);
  };

  const handleCancelSubscription = () => {
    onCancel();
    toast.success('Subscription cancelled. You can continue using the service until your current period ends.');
  };

  const handleReactivateSubscription = () => {
    onReactivate();
    toast.success('Subscription reactivated successfully!');
  };

  const handleToggleAutoRenew = (enabled: boolean) => {
    setAutoRenew(enabled);
    toast.success(`Auto-renewal ${enabled ? 'enabled' : 'disabled'} successfully!`);
  };

  return (
    <div className="space-y-6">
      {/* Subscription Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Subscription Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Auto-renewal Setting */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="auto-renew" className="font-medium">Auto-renewal</Label>
              <p className="text-sm text-muted-foreground">
                Automatically renew your subscription on {format(new Date(currentPlan.renewalDate), 'MMM dd, yyyy')}
              </p>
            </div>
            <Switch
              id="auto-renew"
              checked={autoRenew}
              onCheckedChange={handleToggleAutoRenew}
            />
          </div>

          {/* Billing Cycle */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="space-y-1">
              <Label className="font-medium">Billing Cycle</Label>
              <p className="text-sm text-muted-foreground">
                Currently billed {currentPlan.period}ly
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsCycleDialogOpen(true)}>
              <Calendar className="mr-2 h-4 w-4" />
              Change Cycle
            </Button>
          </div>

          {/* Payment Method */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="space-y-1">
              <Label className="font-medium">Payment Method</Label>
              <p className="text-sm text-muted-foreground">
                Visa •••• 4242
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={onUpdatePaymentMethod}>
              <CreditCard className="mr-2 h-4 w-4" />
              Update
            </Button>
          </div>
        </CardContent>
      </Card>

      <ChangeCycleDialog 
        isOpen={isCycleDialogOpen} 
        onOpenChange={setIsCycleDialogOpen} 
        currentPlan={currentPlan} 
        onCycleChange={handleCycleChange} 
      />

      {/* Subscription Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentPlan.status === 'active' ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Pause Subscription</h4>
                  <p className="text-sm text-muted-foreground">
                    Temporarily pause your subscription for up to 3 months
                  </p>
                </div>
                <Button variant="outline" className="mt-4 sm:mt-0"> 
                  Pause
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-red-600">Cancel Subscription</h4>
                  <p className="text-sm text-muted-foreground">
                    Cancel your subscription. You'll retain access until {format(new Date(currentPlan.renewalDate), 'MMM dd, yyyy')}
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="mt-4 sm:mt-0">
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancel Subscription</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Your subscription will be cancelled, but you'll retain access to all features until {format(new Date(currentPlan.renewalDate), 'MMM dd, yyyy')}.
                        </AlertDescription>
                      </Alert>
                      <div className="space-y-2">
                        <Label htmlFor="cancel-reason">Help us improve - Why are you cancelling? (Optional)</Label>
                        <Textarea
                          id="cancel-reason"
                          placeholder="Let us know how we can improve..."
                          value={cancelReason}
                          onChange={(e) => setCancelReason(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Keep Subscription</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant="destructive" onClick={handleCancelSubscription}>
                          Confirm Cancellation
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50/50 border-green-200">
              <div>
                <h4 className="font-medium text-green-800">Reactivate Subscription</h4>
                <p className="text-sm text-green-600">
                  Resume your subscription and regain access to all features
                </p>
              </div>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={handleReactivateSubscription}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reactivate
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};