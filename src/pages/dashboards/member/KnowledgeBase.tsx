
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Book, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';

const KnowledgeBase = () => {
  const categories = [
    { name: 'Onboarding', articles: 5 },
    { name: 'Project Management', articles: 12 },
    { name: 'Design Process', articles: 8 },
    { name: 'Development Workflow', articles: 15 },
  ];

  const recentArticles = [
    { id: 1, title: 'How to setup your local development environment' },
    { id: 2, title: 'Our design handoff process' },
    { id: 3, title: 'Submitting your weekly report' },
  ];

  return (
    <DashboardLayout
      role="member"
      title="Knowledge Base"
      description="Find articles, tutorials, and documentation."
      headerIcon={<Book className="h-8 w-8 text-primary" />}
      headerAction={
        <Link to="/dashboard/member/kb/new">
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            New Article
          </Button>
        </Link>
      }
    >
      <div className="space-y-8">
        <div className="relative">
          <Input placeholder="Search articles..." className="pr-12 h-12 text-lg" />
          <Button size="icon" className="absolute top-1/2 right-3 -translate-y-1/2">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{category.articles} articles</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4">Recent Articles</h3>
          <div className="space-y-4">
            {recentArticles.map(article => (
              <Link to={`/dashboard/member/kb/${article.id}`} key={article.id}>
                <Card className="hover:bg-muted/50">
                  <CardContent className="p-4">
                    <p className="font-semibold">{article.title}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KnowledgeBase;
