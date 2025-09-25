import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock } from 'lucide-react';

const PublicProjectStatus = () => {
  const project = {
    name: 'Website Redesign',
    description: 'A complete overhaul of the TechCorp corporate website.',
    progress: 75,
    status: 'In Progress',
  };

  const milestones = [
    { name: 'Project Kick-off', status: 'Completed' },
    { name: 'Initial Mockups', status: 'Completed' },
    { name: 'Frontend Development', status: 'In Progress' },
    { name: 'Final Delivery', status: 'Upcoming' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-3xl">{project.name}</CardTitle>
          <p className="text-muted-foreground">Project Status</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="mb-2">{project.description}</p>
              <div className="flex items-center gap-4">
                <Progress value={project.progress} className="w-full" />
                <span className="font-semibold">{project.progress}%</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Key Milestones</h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-4">
                    {milestone.status === 'Completed' ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Clock className="h-5 w-5 text-gray-400" />}
                    <p className={milestone.status === 'Completed' ? 'line-through text-muted-foreground' : ''}>{milestone.name}</p>
                    <Badge variant={milestone.status === 'Completed' ? 'secondary' : 'default'}>{milestone.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicProjectStatus;