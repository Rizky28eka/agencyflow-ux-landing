
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const MemberSubmitReport = () => {
  return (
    <DashboardLayout
      role="member"
      title="Submit Weekly Report"
      description="Keep your team lead updated on your progress."
      headerIcon={<FileText className="h-8 w-8 text-primary" />}
    >
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
    </DashboardLayout>
  );
};

export default MemberSubmitReport;
