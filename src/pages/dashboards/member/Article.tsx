
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Article = () => {
  const { articleId } = useParams();

  // Mock data
  const article = {
    id: articleId,
    title: 'How to setup your local development environment',
    author: 'Sarah Johnson',
    date: '2025-09-20',
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
    >
      <Card>
        <CardContent className="p-8">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Article;
