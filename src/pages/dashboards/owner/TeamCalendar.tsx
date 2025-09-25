import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

const TeamCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const teamEvents = {
      '2024-01-25': [
          { time: '10:00 AM', title: 'Daily Standup', user: 'Mike C.' },
          { time: '2:00 PM', title: 'Design Review', user: 'Sarah J.' },
      ],
      '2024-01-28': [
        { time: '11:00 AM', title: 'Client Kick-off', user: 'Sarah J.' },
      ]
  };

  const selectedDayEvents = date ? teamEvents[date.toISOString().split('T')[0]] || [] : [];

  const teams = ['Development', 'Design', 'Marketing'];

  return (
    <DashboardLayout
      role="owner"
      title="Shared Team Calendar"
      description="View events and availability across all teams."
      headerIcon={<CalendarIcon className="h-8 w-8 text-primary" />}
    >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader><CardTitle>Filter Teams</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        {teams.map(team => (
                            <div key={team} className="flex items-center space-x-2">
                                <Checkbox id={team} defaultChecked />
                                <Label htmlFor={team}>{team}</Label>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-3">
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
                <Card className="mt-8">
                    <CardHeader><CardTitle>Agenda for {date ? date.toLocaleDateString() : 'Today'}</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {selectedDayEvents.length > 0 ? selectedDayEvents.map((event, i) => (
                            <div key={i} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                                <div>
                                    <p className="font-semibold">{event.title} <span className="text-sm text-muted-foreground">({event.user})</span></p>
                                    <p className="text-sm text-muted-foreground">{event.time}</p>
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

export default TeamCalendar;