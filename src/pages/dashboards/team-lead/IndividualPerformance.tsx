
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams } from 'react-router-dom';

const IndividualPerformance = () => {
  const { memberId } = useParams();

  // Mock data
  const member = { id: memberId, name: 'Sarah Johnson', role: 'Project Manager' };
  const performance = {
    tasksCompleted: 30,
    onTimeDelivery: 98,
    avgRating: 4.9,
    skills: ['React', 'TypeScript', 'Project Management', 'Figma'],
  };

  return (
    <DashboardLayout
      role="team-lead"
      title={member.name}
      description={`Performance details for ${member.name}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="items-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarFallback className="text-3xl">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{member.name}</CardTitle>
              <p className="text-muted-foreground">{member.role}</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {performance.skills.map(skill => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Tasks Completed</span>
                  <span className="text-sm font-medium text-primary">{performance.tasksCompleted}</span>
                </div>
                <Progress value={(performance.tasksCompleted / 40) * 100} />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">On-Time Delivery</span>
                  <span className="text-sm font-medium text-primary">{performance.onTimeDelivery}%</span>
                </div>
                <Progress value={performance.onTimeDelivery} />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Average Rating</span>
                  <span className="text-sm font-medium text-primary">{performance.avgRating} / 5.0</span>
                </div>
                <Progress value={(performance.avgRating / 5) * 100} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IndividualPerformance;
