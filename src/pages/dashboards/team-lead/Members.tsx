
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, MessageSquare, CalendarPlus } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Link } from 'react-router-dom';

const TeamLeadMembers = () => {
  const teamMembers = [
    { id: 2, name: 'Mike Chen', role: 'Frontend Developer', onTimeRate: '98%', currentTask: 'Implement user authentication flow' },
    { id: 1, name: 'Sarah Johnson', role: 'UI/UX Designer', onTimeRate: '95%', currentTask: 'Design new homepage mockups' },
    { id: 4, name: 'Alex Rodriguez', role: 'QA Engineer', onTimeRate: '99%', currentTask: 'Write API documentation for checkout' },
    { id: 3, name: 'Emily Davis', role: 'Sr. Backend Developer', onTimeRate: '92%', currentTask: 'Create database schema for profiles' },
  ];

  return (
    <DashboardLayout
      role="team-lead"
      title="My Team Members"
      description="View details and performance of your team members."
      headerIcon={<Users className="h-8 w-8 text-primary" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader className="items-center">
                <Avatar className="w-20 h-20 mb-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle>{member.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{member.role}</p>
            </CardHeader>
            <CardContent className="text-center space-y-4">
                <div>
                    <p className="text-xs text-muted-foreground">On-Time Delivery</p>
                    <p className="font-semibold text-lg">{member.onTimeRate}</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground">Currently Working On</p>
                    <p className="font-semibold truncate">{member.currentTask}</p>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                    <Link to={`/dashboard/team-lead/members/${member.id}`} className="w-full">
                        <Button variant="outline" className="w-full">View Full Profile</Button>
                    </Link>
                    <div className="flex gap-2">
                        <Button variant="secondary" className="w-full"><MessageSquare className="mr-2 h-4 w-4"/> Feedback</Button>
                        <Button variant="secondary" className="w-full"><CalendarPlus className="mr-2 h-4 w-4"/> 1-on-1</Button>
                    </div>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default TeamLeadMembers;
