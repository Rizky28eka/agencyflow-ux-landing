
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, ThumbsDown, MessageSquare, Star } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const TeamLeadFeedback = () => {
  const teamMembers = [
    { id: 1, name: 'Mike Chen', role: 'Frontend Developer' },
    { id: 2, name: 'Sarah Johnson', role: 'UI/UX Designer' },
  ];

  const receivedFeedback = [
    { from: 'Project Manager', content: 'Mike shows great initiative in adopting new technologies.', type: 'Praise' },
    { from: 'Self-reflection', content: 'Need to improve time estimation for complex tasks.', type: 'Improvement' },
  ];

  return (
    <DashboardLayout
      role="team-lead"
      title="Team Feedback"
      description="Give and review performance feedback."
      headerIcon={<Star className="h-8 w-8 text-primary" />}
    >
      <Tabs defaultValue="give">
        <TabsList className="mb-4">
          <TabsTrigger value="give">Give Feedback</TabsTrigger>
          <TabsTrigger value="received">My Feedback</TabsTrigger>
        </TabsList>
        <TabsContent value="give">
          <Card>
            <CardHeader><CardTitle>Give Feedback to Your Team</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.map(member => (
                <div key={member.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar><AvatarImage src="/placeholder.svg" /><AvatarFallback>{member.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback></Avatar>
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <Button>Give Feedback</Button>
                  </div>
                  <Textarea className="mt-4" placeholder={`Write feedback for ${member.name}...`} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="received">
          <Card>
            <CardHeader><CardTitle>Feedback I've Received</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {receivedFeedback.map((fb, i) => (
                <div key={i} className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${fb.type === 'Praise' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                    {fb.type === 'Praise' ? <ThumbsUp className="h-5 w-5 text-green-600" /> : <ThumbsDown className="h-5 w-5 text-yellow-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">From: {fb.from}</p>
                    <p className="text-muted-foreground">{fb.content}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default TeamLeadFeedback;
