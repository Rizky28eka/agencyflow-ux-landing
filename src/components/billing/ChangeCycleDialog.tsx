
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from 'react';

export const ChangeCycleDialog = ({ isOpen, onOpenChange, currentPlan, onCycleChange }) => {
  const [selectedCycle, setSelectedCycle] = useState(currentPlan.period);

  const annualPrice = currentPlan.price * 12 * 0.9; // 10% discount for annual

  const handleSave = () => {
    onCycleChange(selectedCycle);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Billing Cycle</DialogTitle>
          <DialogDescription>
            Switch between monthly and annual billing for your {currentPlan.name} plan.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup value={selectedCycle} onValueChange={setSelectedCycle}>
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="month" id="month" />
              <Label htmlFor="month" className="flex-1">
                <p className="font-bold">Monthly Billing</p>
                <p className="text-sm text-muted-foreground">${currentPlan.price}/month</p>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="year" id="year" />
              <Label htmlFor="year" className="flex-1">
                <p className="font-bold">Annual Billing</p>
                <p className="text-sm text-muted-foreground">${annualPrice.toFixed(2)}/year (Save 10%)</p>
              </Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
