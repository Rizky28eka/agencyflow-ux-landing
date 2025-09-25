
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams } from 'react-router-dom';
import { FileText, Edit, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Article = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();

  // Mock data
  const article = {
    id: articleId,
    title: 'How to setup your local development environment',
    author: 'Sarah Johnson',
    date: '2025-09-20',
    lastModified: '2025-09-22',
    category: 'Development Workflow',
    tags: ['Setup', 'Development', 'Environment'],
    content: `
      <p>Setting up a consistent development environment is crucial for productivity. This guide will walk you through the process.</p>
      <h2>1. Install Node.js</h2>
      <p>We use the latest LTS version of Node.js. You can download it from the official website or use a version manager like nvm.</p>
      <h2>2. Clone the Repository</h2>
      <p>Clone the project repository from GitHub to your local machine.</p>
      <h2>3. Install Dependencies</h2>
      <p>Run <code>pnpm install</code> to install all the project dependencies.</p>
      <h2>4. Run the Development Server</h2>
      <p>Run <code>pnpm dev</code> to start the development server.</p>
    `,
  };

  return (
    <DashboardLayout
      role="member"
      title={article.title}
      description={`Published by ${article.author} on ${article.date}`}
      headerIcon={<FileText className="h-6 w-6 text-primary" />}
      headerAction={
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/dashboard/member/kb')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to KB
          </Button>
          <Link to={`/dashboard/member/kb/${article.id}/edit`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit Article
            </Button>
          </Link>
        </div>
      }
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Article Header */}
        <Card>
          <CardHeader>
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>By {article.author}</span>
                  <span>•</span>
                  <span>Published {article.date}</span>
                  <span>•</span>
                  <span>Last modified {article.lastModified}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Category:</span>
                <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
                  {article.category}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Tags:</span>
                <div className="flex space-x-1">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Article Content */}
        <Card>
          <CardContent className="p-8">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Article;
