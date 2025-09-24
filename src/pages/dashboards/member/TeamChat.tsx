import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MessageSquare, Hash, User } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useState } from 'react';

const MemberTeamChat = () => {
  const [messages, setMessages] = useState([
    { user: 'Sarah J.', text: 'Hey team, the new mockups for the homepage are ready for review!', time: '10:30 AM' },
    { user: 'You', text: "Great! I'll take a look this afternoon.", time: '10:31 AM' },
    { user: 'Mike C.', text: 'Awesome, can’t wait to start implementing them.', time: '10:32 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    setMessages([...messages, { user: 'You', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setNewMessage('');
  };

  const channels = ['general', 'project-alpha', 'random'];
  const directMessages = ['Sarah J.', 'Mike C.', 'Emily D.'];

  return (
    <DashboardLayout
      role="member"
      title="Team Chat"
      description="Communicate with your team members in real-time."
      headerIcon={<MessageSquare className="h-8 w-8 text-primary" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 h-[75vh]">
        {/* Sidebar */}
        <div className="md:col-span-1 bg-muted/50 rounded-lg p-4 flex flex-col space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Channels</h3>
            <div className="space-y-1">
              {channels.map(channel => (
                <Button key={channel} variant="ghost" className="w-full justify-start">
                  <Hash className="h-4 w-4 mr-2" />
                  {channel}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Direct Messages</h3>
            <div className="space-y-1">
              {directMessages.map(dm => (
                <Button key={dm} variant="ghost" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  {dm}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="md:col-span-3">
          <Card className="h-full flex flex-col">
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
                <Input 
                  placeholder="Type a message..." 
                  className="pr-12" 
                  value={newMessage} 
                  onChange={(e) => setNewMessage(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  size="icon"
                  className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MemberTeamChat;