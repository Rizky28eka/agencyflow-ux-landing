
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Save, Edit } from 'lucide-react';

const EditArticle = () => {
  const handleSave = () => {
    console.log('Saving article...');
  };

  return (
    <DashboardLayout
      role="member"
      title="Edit Article"
      description="Create or edit a knowledge base article."
      headerIcon={<Edit className="h-6 w-6 text-primary" />}
      headerAction={
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Article
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Article Title</Label>
          <Input id="title" placeholder="Enter article title..." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Article Content</Label>
          <Textarea id="content" placeholder="Write your article here..." className="h-96" />
          <p className="text-sm text-muted-foreground">For this demo, we are using a simple textarea. In a real application, this would be a rich text editor like Tiptap or Quill.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditArticle;
