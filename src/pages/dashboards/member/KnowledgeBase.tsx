
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Book, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';

const KnowledgeBase = () => {
  const categories = [
    { name: 'Onboarding', articles: 5, color: 'bg-blue-100 text-blue-800' },
    { name: 'Project Management', articles: 12, color: 'bg-green-100 text-green-800' },
    { name: 'Design Process', articles: 8, color: 'bg-purple-100 text-purple-800' },
    { name: 'Development Workflow', articles: 15, color: 'bg-orange-100 text-orange-800' },
  ];

  const recentArticles = [
    { id: 1, title: 'How to setup your local development environment', author: 'Sarah Johnson', date: '2024-01-20', category: 'Development Workflow' },
    { id: 2, title: 'Our design handoff process', author: 'Mike Chen', date: '2024-01-18', category: 'Design Process' },
    { id: 3, title: 'Submitting your weekly report', author: 'Emily Davis', date: '2024-01-15', category: 'Project Management' },
    { id: 4, title: 'Getting started with Figma', author: 'Alex Rodriguez', date: '2024-01-12', category: 'Design Process' },
    { id: 5, title: 'Code review best practices', author: 'Sarah Johnson', date: '2024-01-10', category: 'Development Workflow' },
  ];

  const popularArticles = [
    { id: 6, title: 'Setting up your development environment', views: 245 },
    { id: 7, title: 'Project workflow guidelines', views: 189 },
    { id: 8, title: 'Design system documentation', views: 156 },
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
        {/* Search */}
        <div className="relative">
          <Input placeholder="Search articles..." className="pr-12 h-12 text-lg" />
          <Button size="icon" className="absolute top-1/2 right-3 -translate-y-1/2">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {category.name}
                  <Badge className={category.color}>{category.articles}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Browse {category.articles} articles in this category</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Articles */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6">Recent Articles</h3>
            <div className="space-y-4">
              {recentArticles.map(article => (
                <Link to={`/dashboard/member/kb/${article.id}`} key={article.id}>
                  <Card className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-lg">{article.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>By {article.author}</span>
                            <span>•</span>
                            <span>{article.date}</span>
                          </div>
                        </div>
                        <Badge variant="outline">{article.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Articles */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6">Popular Articles</h3>
            <div className="space-y-3">
              {popularArticles.map(article => (
                <Link to={`/dashboard/member/kb/${article.id}`} key={article.id}>
                  <Card className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-1">{article.title}</h4>
                      <p className="text-xs text-muted-foreground">{article.views} views</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KnowledgeBase;
