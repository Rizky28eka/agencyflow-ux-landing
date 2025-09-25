import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Save, Edit, ArrowLeft, X } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

const EditArticle = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const isEditing = !!articleId;

  const [formData, setFormData] = useState({
    title: isEditing ? 'How to setup your local development environment' : '',
    category: isEditing ? 'Development Workflow' : '',
    content: isEditing ? `Setting up a consistent development environment is crucial for productivity. This guide will walk you through the process.

## 1. Install Node.js
We use the latest LTS version of Node.js. You can download it from the official website or use a version manager like nvm.

## 2. Clone the Repository
Clone the project repository from GitHub to your local machine.

## 3. Install Dependencies
Run \`pnpm install\` to install all the project dependencies.

## 4. Run the Development Server
Run \`pnpm dev\` to start the development server.` : '',
    tags: isEditing ? ['Setup', 'Development', 'Environment'] : [],
  });

  const [newTag, setNewTag] = useState('');

  const categories = [
    'Onboarding',
    'Project Management',
    'Design Process',
    'Development Workflow',
    'Client Communication',
    'Tools & Software',
  ];

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success(isEditing ? 'Article updated successfully!' : 'Article created successfully!');
    navigate('/dashboard/member/kb');
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  return (
    <DashboardLayout
      role="member"
      title={isEditing ? "Edit Article" : "Create New Article"}
      description={isEditing ? "Update the knowledge base article." : "Create a new knowledge base article."}
      headerIcon={<Edit className="h-6 w-6 text-primary" />}
      headerAction={
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/dashboard/member/kb')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            {isEditing ? 'Update Article' : 'Create Article'}
          </Button>
        </div>
      }
    >
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Article' : 'Create New Article'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Article Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter article title..."
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button type="button" variant="outline" onClick={handleAddTag}>
                  Add Tag
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Article Content *</Label>
              <Textarea
                id="content"
                placeholder="Write your article here..."
                className="h-96"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              />
              <p className="text-sm text-muted-foreground">
                For this demo, we are using a simple textarea. In a real application, this would be a rich text editor like Tiptap or Quill.
              </p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => navigate('/dashboard/member/kb')}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? 'Update Article' : 'Create Article'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EditArticle;