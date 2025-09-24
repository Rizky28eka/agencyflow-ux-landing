
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const FinanceTax = () => {
  return (
    <DashboardLayout
      role="finance"
      title="Tax Calculations"
      description="Estimate and manage tax liabilities."
      headerIcon={<Calculator className="h-8 w-8 text-primary" />}
    >
        <Card>
            <CardHeader><CardTitle>Tax Liability Estimator</CardTitle></CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="revenue">Total Revenue (YTD)</Label>
                        <Input id="revenue" type="number" placeholder="e.g., 1,345,700" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="deductions">Total Deductions (YTD)</Label>
                        <Input id="deductions" type="number" placeholder="e.g., 850,000" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="tax-rate">Effective Tax Rate (%)</Label>
                    <Input id="tax-rate" type="number" placeholder="e.g., 21" />
                </div>
                <Button>Calculate Estimated Tax</Button>
                <div className="pt-6">
                    <h3 className="text-lg font-semibold">Estimated Tax Liability:</h3>
                    <p className="text-4xl font-bold text-primary mt-2">$104,097.00</p>
                </div>
            </CardContent>
        </Card>
    </DashboardLayout>
  );
};

export default FinanceTax;
