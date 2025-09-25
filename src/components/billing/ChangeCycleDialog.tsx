// src/components/billing/ChangeCycleDialog.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ChangeCycleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan: {
    name: string;
    price: number;
    period: "month" | "year";
  };
  onCycleChange: (cycle: "month" | "year") => void;
}

export const ChangeCycleDialog = ({
  isOpen,
  onOpenChange,
  currentPlan,
  onCycleChange,
}: ChangeCycleDialogProps) => {
  const [selectedCycle, setSelectedCycle] = useState<"month" | "year">(
    currentPlan.period
  );

  const annualPrice = currentPlan.price * 12 * 0.9; // 10% discount for annual

  const handleSave = () => {
    onCycleChange(selectedCycle);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-[95%] sm:w-full">
        <DialogHeader>
          <DialogTitle>Change Billing Cycle</DialogTitle>
          <DialogDescription>
            Choose between <span className="font-medium">monthly</span> or{" "}
            <span className="font-medium">annual</span> billing for your{" "}
            <span className="font-semibold">{currentPlan.name}</span> plan.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup
            value={selectedCycle}
            onValueChange={(val: "month" | "year") => setSelectedCycle(val)}
            className="grid gap-4 sm:grid-cols-2"
          >
            {/* Monthly Option */}
            <div
              className={`flex items-start space-x-3 p-4 rounded-xl border transition hover:border-primary cursor-pointer ${
                selectedCycle === "month" ? "border-primary bg-primary/5" : ""
              }`}
            >
              <RadioGroupItem value="month" id="month" />
              <Label htmlFor="month" className="flex-1 cursor-pointer">
                <p className="font-semibold">Monthly Billing</p>
                <p className="text-sm text-muted-foreground">
                  ${currentPlan.price}/month
                </p>
              </Label>
            </div>

            {/* Annual Option */}
            <div
              className={`flex items-start space-x-3 p-4 rounded-xl border transition hover:border-primary cursor-pointer ${
                selectedCycle === "year" ? "border-primary bg-primary/5" : ""
              }`}
            >
              <RadioGroupItem value="year" id="year" />
              <Label htmlFor="year" className="flex-1 cursor-pointer">
                <p className="font-semibold">Annual Billing</p>
                <p className="text-sm text-muted-foreground">
                  ${annualPrice.toFixed(2)}/year{" "}
                  <span className="text-green-600 font-medium">(Save 10%)</span>
                </p>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="w-full sm:w-auto">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};