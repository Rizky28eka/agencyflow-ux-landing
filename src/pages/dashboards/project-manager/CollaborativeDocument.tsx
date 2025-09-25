import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Save } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const CollaborativeDocument = () => {
  const viewers = [
    { name: 'Sarah J.', avatar: '/placeholder.svg' },
    { name: 'Mike C.', avatar: '/placeholder.svg' },
  ];

  return (
    <DashboardLayout
      role="project-manager"
      title="Meeting Notes 2024-01-15"
      description="A collaborative document for your project."
      headerIcon={<FileText className="h-8 w-8 text-primary" />}
      headerAction={
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
                {viewers.map(viewer => (
                    <Avatar key={viewer.name} className="w-8 h-8 border-2 border-background">
                        <AvatarImage src={viewer.avatar} />
                        <AvatarFallback>{viewer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                ))}
            </div>
            <Button><Save className="mr-2 h-4 w-4"/> Save</Button>
          </div>
      }
    >
        <Card>
            <CardContent className="p-6">
                <Textarea className="min-h-[60vh]" placeholder="Start typing your document here..." />
            </CardContent>
        </Card>
    </DashboardLayout>
  );
};

export default CollaborativeDocument;