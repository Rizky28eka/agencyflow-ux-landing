
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Calendar } from '@/components/ui/calendar';

const MemberSchedule = () => {
  // In a real app, you would fetch events and manage state for the selected date.
  return (
    <DashboardLayout
      role="member"
      title="My Schedule"
      description="View your meetings, deadlines, and events."
      headerIcon={<CalendarIcon className="h-8 w-8 text-primary" />}
    >
        <Card>
            <CardContent className="p-0">
                <Calendar
                    mode="single"
                    className="p-3"
                />
            </CardContent>
        </Card>
    </DashboardLayout>
  );
};

export default MemberSchedule;
