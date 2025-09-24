import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MessageSquare } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const MemberTeamChat = () => {
  const messages = [
    { user: 'Sarah J.', text: 'Hey team, the new mockups for the homepage are ready for review!', time: '10:30 AM' },
    { user: 'You', text: "Great! I'll take a look this afternoon.", time: '10:31 AM' },
    { user: 'Mike C.', text: 'Awesome, can’t wait to start implementing them.', time: '10:32 AM' },
  ];

  return (
    <DashboardLayout
      role="member"
      title="Team Chat"
      description="Communicate with your team members in real-time."
      headerIcon={<MessageSquare className="h-8 w-8 text-primary" />}
    >
      <Card className="h-[70vh] flex flex-col">
        <CardHeader>
          <CardTitle>#general</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-2 ${msg.user === 'You' ? 'justify-end' : ''}`}
            >
              {msg.user !== 'You' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {msg.user
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-xs rounded-lg p-3 ${
                  msg.user === 'You'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.user === 'You'
                      ? 'text-primary-foreground/70'
                      : 'text-muted-foreground'
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
        <div className="p-4 border-t">
          <div className="relative">
            <Input placeholder="Type a message..." className="pr-12" />
            <Button
              size="icon"
              className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default MemberTeamChat;