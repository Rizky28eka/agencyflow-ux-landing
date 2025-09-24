
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Plus } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const TeamLeadOneOnOne = () => {
  const teamMembers = [
    { id: 1, name: 'Mike Chen', role: 'Frontend Developer', lastMeeting: '2024-01-15', nextMeeting: '2024-02-15' },
    { id: 2, name: 'Sarah Johnson', role: 'UI/UX Designer', lastMeeting: '2024-01-18', nextMeeting: '2024-02-18' },
    { id: 3, name: 'Alex Rodriguez', role: 'QA Engineer', lastMeeting: '2024-01-10', nextMeeting: 'Not Scheduled' },
  ];

  const handleSchedule = () => {
    toast.success('1-on-1 meeting scheduled successfully!');
  };

  return (
    <DashboardLayout
      role="team-lead"
      title="1-on-1 Meetings"
      description="Schedule and track your 1-on-1s with team members."
      headerIcon={<Calendar className="h-8 w-8 text-primary" />}
      headerAction={
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-gradient-primary"><Plus className="mr-2 h-4 w-4" /> Schedule New 1-on-1</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Schedule 1-on-1</DialogTitle></DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2"><Label>Team Member</Label><Input defaultValue="Mike Chen" /></div>
                    <div className="space-y-2"><Label>Date & Time</Label><Input type="datetime-local" /></div>
                    <div className="space-y-2"><Label>Talking Points</Label><Textarea placeholder="Key discussion topics..." /></div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                    <DialogClose asChild><Button type="button" onClick={handleSchedule}>Schedule</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      }
    >
      <Card>
        <CardHeader><CardTitle>Meeting Schedule</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.map(member => (
            <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar><AvatarImage src="/placeholder.svg" /><AvatarFallback>{member.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback></Avatar>
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">Next: <span className={`font-semibold ${member.nextMeeting === 'Not Scheduled' ? 'text-red-500' : ''}`}>{member.nextMeeting}</span></p>
                <p className="text-xs text-muted-foreground">Last: {member.lastMeeting}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default TeamLeadOneOnOne;
