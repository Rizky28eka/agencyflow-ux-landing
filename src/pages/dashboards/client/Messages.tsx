import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, MessageSquare, Paperclip } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const ClientMessages = () => {
  const messages = [
    {
      user: 'Project Manager',
      text: 'Hi Jane, just wanted to let you know we’ve pushed the latest designs for the homepage. Let us know what you think!',
      time: 'Yesterday',
    },
    {
      user: 'You',
      text: 'Thanks for the update! I will review them this afternoon and get back to you with feedback.',
      time: '9:05 AM',
    },
  ];

  return (
    <DashboardLayout
      role="client"
      title="Communication"
      description="Direct messages with your project manager."
      headerIcon={<MessageSquare className="h-8 w-8 text-primary" />}
    >
      <Card className="h-[70vh] flex flex-col">
        <CardHeader>
          <CardTitle>Project: Website Redesign</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-2 ${
                msg.user === 'You' ? 'justify-end' : ''
              }`}
            >
              {msg.user !== 'You' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>PM</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-md rounded-lg p-3 ${
                  msg.user === 'You'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm font-semibold">{msg.user}</p>
                <p className="text-sm mt-1">{msg.text}</p>
                <p
                  className={`text-xs mt-2 text-right ${
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
            <Input
              placeholder="Type a message to the project team..."
              className="pr-24"
            />
            <div className="absolute top-1/2 right-1 -translate-y-1/2 flex items-center">
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button size="icon" className="h-8 w-8">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default ClientMessages;