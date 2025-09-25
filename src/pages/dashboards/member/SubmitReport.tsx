
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, DollarSign, Upload } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const MemberSubmitReport = () => {
  return (
    <DashboardLayout
      role="member"
      title="Submit Reports & Claims"
      description="Keep your team lead updated and submit expense claims."
      headerIcon={<FileText className="h-8 w-8 text-primary" />}
    >
      <div className="space-y-8">
        <Card>
            <CardHeader><CardTitle>Weekly Status Report</CardTitle></CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <h3 className="font-semibold">Tasks Completed This Week:</h3>
                    <Textarea placeholder="- Completed design for homepage...\n- Fixed login bug..." />
                </div>
                <div className="space-y-2">
                    <h3 className="font-semibold">Plans for Next Week:</h3>
                    <Textarea placeholder="- Start work on user profile page...\n- Attend project planning meeting..." />
                </div>
                <div className="space-y-2">
                    <h3 className="font-semibold">Blockers / Issues:</h3>
                    <Textarea placeholder="- Waiting for API documentation from backend team..." />
                </div>
                <Button className="w-full md:w-auto">Submit Report</Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle>Submit Expense Claim</CardTitle></CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="exp-desc">Expense Description</Label>
                    <Input id="exp-desc" placeholder="e.g., Taxi to client meeting" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="exp-cat">Category</Label>
                        <Input id="exp-cat" placeholder="e.g., Travel" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="exp-amount">Amount</Label>
                        <Input id="exp-amount" type="number" placeholder="45.00" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Receipt</Label>
                    <div className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg">
                        <Button variant="outline"><Upload className="mr-2 h-4 w-4"/> Upload Receipt</Button>
                    </div>
                </div>
                <Button className="w-full md:w-auto"><DollarSign className="mr-2 h-4 w-4"/>Submit Claim</Button>
            </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MemberSubmitReport;
