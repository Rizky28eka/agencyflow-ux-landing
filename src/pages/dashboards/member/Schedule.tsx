
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, Video, CheckSquare } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const MemberSchedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const events = {
      '2024-01-25': [
          { time: '10:00 AM', title: 'Daily Standup', type: 'meeting', details: 'Project: Mobile App' },
          { time: '2:00 PM', title: 'Design Review', type: 'meeting', details: 'Project: Website Redesign' },
          { time: 'EOD', title: 'Fix responsive layout issues', type: 'deadline', details: 'Project: Website Redesign' },
      ],
      '2024-01-28': [
        { time: '11:00 AM', title: 'Client Kick-off', type: 'meeting', details: 'Project: New Client XYZ' },
        { time: 'EOD', title: 'Implement user authentication', type: 'deadline', details: 'Project: Mobile App' },
      ]
  };

  const selectedDayEvents = date ? events[date.toISOString().split('T')[0]] || [] : [];

  return (
    <DashboardLayout
      role="member"
      title="My Schedule"
      description="View your meetings, deadlines, and events."
      headerIcon={<CalendarIcon className="h-8 w-8 text-primary" />}
    >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card>
                    <CardContent className="p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="p-3"
                        />
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader><CardTitle>Agenda for {date ? date.toLocaleDateString() : 'Today'}</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {selectedDayEvents.length > 0 ? selectedDayEvents.map((event, i) => (
                            <div key={i} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                                <div className="flex-shrink-0">
                                    {event.type === 'meeting' ? <Video className="h-5 w-5 mt-1 text-primary" /> : <CheckSquare className="h-5 w-5 mt-1 text-accent" />}
                                </div>
                                <div>
                                    <p className="font-semibold">{event.title}</p>
                                    <p className="text-sm text-muted-foreground flex items-center"><Clock className="h-3 w-3 mr-1"/>{event.time}</p>
                                    <p className="text-xs text-muted-foreground">{event.details}</p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-muted-foreground text-center py-4">No events scheduled for this day.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    </DashboardLayout>
  );
};

export default MemberSchedule;
