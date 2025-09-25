// src/components/billing/PaymentMethods.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  Plus,
  Trash2,
  Shield,
  Calendar,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface PaymentMethod {
  id: string;
  type: "card" | "bank";
  brand: string;
  last4: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  holderName: string;
}

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
  onAdd: (method: Omit<PaymentMethod, "id">) => void;
  onRemove: (id: string) => void;
  onSetDefault: (id: string) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}

export const PaymentMethods = ({
  paymentMethods,
  onAdd,
  onRemove,
  onSetDefault,
  isDialogOpen,
  setIsDialogOpen,
}: PaymentMethodsProps) => {
  const [newCard, setNewCard] = useState({
    holderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof newCard>>({});

  const validate = () => {
    const newErrors: Partial<typeof newCard> = {};
    if (!newCard.holderName)
      newErrors.holderName = "Cardholder name is required.";
    if (!newCard.cardNumber || newCard.cardNumber.length < 16)
      newErrors.cardNumber = "A valid card number is required.";
    if (!newCard.expiryMonth) newErrors.expiryMonth = "Required.";
    if (!newCard.expiryYear) newErrors.expiryYear = "Required.";
    if (!newCard.cvv || newCard.cvv.length < 3)
      newErrors.cvv = "A valid CVV is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCard = async () => {
    if (!validate()) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

    const method: Omit<PaymentMethod, "id"> = {
      type: "card",
      brand: "Visa", // In real app, detect from card number
      last4: newCard.cardNumber.slice(-4),
      expiryMonth: parseInt(newCard.expiryMonth),
      expiryYear: parseInt(newCard.expiryYear),
      isDefault: paymentMethods.length === 0,
      holderName: newCard.holderName,
    };

    onAdd(method);
    setNewCard({
      holderName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    });
    setLoading(false);
    toast.success("Payment method added successfully!");
  };

  const getBrandIcon = (brand: string) => {
    return <CreditCard className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Payment Methods
            </CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary-light">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg w-[95%] sm:w-full">
                <DialogHeader>
                  <DialogTitle>Add New Payment Method</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {/* Holder Name */}
                  <div className="space-y-2">
                    <Label htmlFor="holderName">Cardholder Name</Label>
                    <Input
                      id="holderName"
                      placeholder="John Doe"
                      value={newCard.holderName}
                      onChange={(e) =>
                        setNewCard((prev) => ({
                          ...prev,
                          holderName: e.target.value,
                        }))
                      }
                    />
                    {errors.holderName && (
                      <p className="text-sm text-red-500">{errors.holderName}</p>
                    )}
                  </div>

                  {/* Card Number */}
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={newCard.cardNumber}
                      onChange={(e) =>
                        setNewCard((prev) => ({
                          ...prev,
                          cardNumber: e.target.value,
                        }))
                      }
                    />
                    {errors.cardNumber && (
                      <p className="text-sm text-red-500">{errors.cardNumber}</p>
                    )}
                  </div>

                  {/* Expiry + CVV */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Month</Label>
                      <Select
                        value={newCard.expiryMonth}
                        onValueChange={(value) =>
                          setNewCard((prev) => ({
                            ...prev,
                            expiryMonth: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem
                              key={i + 1}
                              value={(i + 1).toString().padStart(2, "0")}
                            >
                              {(i + 1).toString().padStart(2, "0")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.expiryMonth && (
                        <p className="text-sm text-red-500">
                          {errors.expiryMonth}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Year</Label>
                      <Select
                        value={newCard.expiryYear}
                        onValueChange={(value) =>
                          setNewCard((prev) => ({
                            ...prev,
                            expiryYear: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="YYYY" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => (
                            <SelectItem
                              key={i}
                              value={(new Date().getFullYear() + i).toString()}
                            >
                              {new Date().getFullYear() + i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.expiryYear && (
                        <p className="text-sm text-red-500">
                          {errors.expiryYear}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={newCard.cvv}
                        onChange={(e) =>
                          setNewCard((prev) => ({
                            ...prev,
                            cvv: e.target.value,
                          }))
                        }
                      />
                      {errors.cvv && (
                        <p className="text-sm text-red-500">{errors.cvv}</p>
                      )}
                    </div>
                  </div>

                  {/* Security Note */}
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    <Shield className="h-4 w-4" />
                    <span>Your payment information is encrypted and secure</span>
                  </div>
                </div>

                {/* Footer */}
                <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline" disabled={loading} className="w-full sm:w-auto">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button onClick={handleAddCard} disabled={loading} className="w-full sm:w-auto">
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Add Payment Method
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4"
              >
                {/* Card Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    {getBrandIcon(method.brand)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">
                        {method.brand} •••• {method.last4}
                      </h4>
                      {method.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {method.holderName}
                    </p>
                    {method.expiryMonth && method.expiryYear && (
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>
                          Expires{" "}
                          {method.expiryMonth.toString().padStart(2, "0")}/
                          {method.expiryYear}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  {!method.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSetDefault(method.id)}
                    >
                      Set Default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(method.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {paymentMethods.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No payment methods added yet</p>
                <p className="text-sm">
                  Add a payment method to manage your subscription
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};