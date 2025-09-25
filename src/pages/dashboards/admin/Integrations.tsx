
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, Slack, Github, Gitlab, Figma, History } from 'lucide-react'; // Using lucide for logos
import { DashboardLayout } from '@/components/DashboardLayout';

const AdminIntegrations = () => {
  const integrations = [
    {
      name: 'Slack',
      description: 'Get real-time project notifications in your Slack channels.',
      logo: <Slack className="h-8 w-8" />,
      isConnected: true,
      lastSync: '2 minutes ago',
    },
    {
      name: 'GitHub',
      description: 'Link commits and pull requests to your tasks and projects.',
      logo: <Github className="h-8 w-8" />,
      isConnected: true,
      lastSync: '5 minutes ago',
    },
    {
      name: 'Google Drive',
      description: 'Attach documents and files from Google Drive directly to projects.',
      logo: <Gitlab className="h-8 w-8" />, // Placeholder, no GDrive icon in lucide
      isConnected: false,
      lastSync: null,
    },
    {
        name: 'Figma',
        description: 'Embed and preview Figma files within your project tasks.',
        logo: <Figma className="h-8 w-8" />,
        isConnected: false,
        lastSync: null,
    }
  ];

  return (
    <DashboardLayout
      role="admin"
      title="Integrations"
      description="Connect third-party apps to extend functionality."
      headerIcon={<Share2 className="h-8 w-8 text-primary" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {integrations.map((integration, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                  {integration.logo}
                </div>
                <div>
                  <CardTitle>{integration.name}</CardTitle>
                  <Badge variant={integration.isConnected ? 'default' : 'secondary'}>
                    {integration.isConnected ? 'Connected' : 'Not Connected'}
                  </Badge>
                  {integration.isConnected && <p className="text-xs text-muted-foreground mt-1">Last sync: {integration.lastSync}</p>}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{integration.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="w-full" variant={integration.isConnected ? 'outline' : 'default'}>
                {integration.isConnected ? 'Manage' : 'Connect'}
              </Button>
              {integration.isConnected && <Button variant="secondary" size="icon"><History className="h-4 w-4"/></Button>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default AdminIntegrations;
