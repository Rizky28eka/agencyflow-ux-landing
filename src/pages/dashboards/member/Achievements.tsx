import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Star, Trophy, Rocket } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const Achievements = () => {
  const achievements = [
    { name: 'On-Time Streak', description: 'Complete 10 tasks on time in a row.', icon: <Star className="h-8 w-8" />, earned: true },
    { name: 'Project Finisher', description: 'Be part of 5 completed projects.', icon: <Trophy className="h-8 w-8" />, earned: true },
    { name: 'Task Master', description: 'Complete 50 tasks.', icon: <Award className="h-8 w-8" />, earned: false },
    { name: 'Launch Leader', description: 'Lead a successful project launch.', icon: <Rocket className="h-8 w-8" />, earned: false },
  ];

  return (
    <DashboardLayout
      role="member"
      title="My Achievements"
      description="A collection of your earned badges and awards."
      headerIcon={<Award className="h-8 w-8 text-primary" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {achievements.map((achievement, index) => (
          <Card key={index} className={`flex flex-col items-center justify-center p-6 ${achievement.earned ? 'bg-yellow-100' : 'bg-muted/50'}`}>
            <div className={`mb-4 ${achievement.earned ? 'text-yellow-500' : 'text-muted-foreground'}`}>
              {achievement.icon}
            </div>
            <h3 className="font-semibold text-lg">{achievement.name}</h3>
            <p className="text-sm text-muted-foreground text-center">{achievement.description}</p>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Achievements;