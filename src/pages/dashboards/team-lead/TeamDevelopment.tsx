
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Plus, Star } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const TeamDevelopment = () => {
  const teamSkills = [
    {
      name: 'Mike Chen',
      avatar: '/placeholder.svg',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 80 },
        { name: 'Node.js', level: 60 },
      ],
      trainingPath: 'Advanced Frontend',
      pathProgress: 75,
    },
    {
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg',
      skills: [
        { name: 'Figma', level: 95 },
        { name: 'User Research', level: 85 },
        { name: 'Prototyping', level: 70 },
      ],
      trainingPath: 'UX Leadership',
      pathProgress: 50,
    },
    {
      name: 'Alex Rodriguez',
      avatar: '/placeholder.svg',
      skills: [
        { name: 'Cypress', level: 80 },
        { name: 'Playwright', level: 70 },
        { name: 'CI/CD', level: 65 },
      ],
      trainingPath: 'QA Automation',
      pathProgress: 90,
    },
  ];

  return (
    <DashboardLayout
      role="team-lead"
      title="Team Development"
      description="Track and manage team skills and training paths."
      headerIcon={<Star className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <Plus className="mr-2 h-4 w-4" />
          New Training Path
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamSkills.map((member, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{member.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold mb-2">Skills</h4>
                <div className="space-y-3">
                  {member.skills.map(skill => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2">Training Path</h4>
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <p className="font-medium">{member.trainingPath}</p>
                    <Badge>{member.pathProgress}%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default TeamDevelopment;
