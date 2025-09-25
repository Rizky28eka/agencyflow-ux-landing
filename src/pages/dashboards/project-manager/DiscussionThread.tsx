import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const DiscussionThread = () => {
  const posts = [
    { user: 'Alex R.', avatar: '/placeholder.svg', time: '2 hours ago', content: 'I think we should focus more on social media for the Q3 campaign.' },
    { user: 'Sarah J.', avatar: '/placeholder.svg', time: '1 hour ago', content: 'I agree. We should also consider influencer marketing.' },
  ];

  return (
    <DashboardLayout
      role="project-manager"
      title="Q3 Marketing Strategy"
      description="A discussion thread for your project."
      headerIcon={<MessageSquare className="h-8 w-8 text-primary" />}
    >
        <div className="space-y-6">
            {posts.map((post, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={post.avatar} />
                            <AvatarFallback>{post.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{post.user}</p>
                            <p className="text-xs text-muted-foreground">{post.time}</p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>{post.content}</p>
                    </CardContent>
                </Card>
            ))}

            <Card>
                <CardHeader><CardTitle>Add a reply</CardTitle></CardHeader>
                <CardContent>
                    <Textarea placeholder="Write your reply..." />
                    <Button className="mt-4"><Send className="mr-2 h-4 w-4"/> Post Reply</Button>
                </CardContent>
            </Card>
        </div>
    </DashboardLayout>
  );
};

export default DiscussionThread;