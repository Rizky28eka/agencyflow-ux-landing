import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, MessageSquare, Calendar, TrendingUp, CheckSquare, Clock, ArrowLeft, Star, Award } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const MemberDetails = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();

  const [member] = useState({
    id: memberId || 'member-001',
    name: 'Mike Chen',
    role: 'Frontend Developer',
    email: 'mike@agency.com',
    phone: '+1 (555) 987-6543',
    avatar: '/placeholder.svg',
    status: 'Active',
    joinDate: 'June 15, 2023',
    performance: 92,
    onTimeDelivery: 96,
    tasksCompleted: 128,
    tasksPending: 12,
    currentProjects: [
      { name: 'Website Redesign', role: 'Frontend Dev', progress: 75, status: 'On Track' },
      { name: 'Mobile App', role: 'React Native Dev', progress: 45, status: 'In Progress' },
    ],
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'CSS/SCSS', level: 88 },
      { name: 'Node.js', level: 70 },
    ],
    recentTasks: [
      { name: 'Implement user authentication', status: 'Completed', date: '2024-01-24' },
      { name: 'Fix responsive layout issues', status: 'In Progress', date: '2024-01-25' },
      { name: 'Create component library', status: 'Pending', date: '2024-01-26' },
    ],
    timeEntries: [
      { date: '2024-01-24', project: 'Website Redesign', hours: 8.0, task: 'Homepage development' },
      { date: '2024-01-23', project: 'Mobile App', hours: 6.5, task: 'User auth implementation' },
      { date: '2024-01-22', project: 'Website Redesign', hours: 7.5, task: 'Component refactoring' },
    ]
  });

  const [feedback, setFeedback] = useState('');
  const [oneOnOneNotes, setOneOnOneNotes] = useState('');

  const handleSendFeedback = () => {
    toast.success('Feedback sent successfully!');
    setFeedback('');
  };

  const handleScheduleOneOnOne = () => {
    toast.success('1-on-1 meeting scheduled successfully!');
    setOneOnOneNotes('');
  };

  return (
    <DashboardLayout
      role="team-lead"
      title={member.name}
      description={`Detailed profile and performance for ${member.name}`}
      headerIcon={<User className="h-8 w-8 text-primary" />}
      headerAction={
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/dashboard/team-lead/members')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Team
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Give Feedback
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Give Feedback to {member.name}</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Textarea
                  placeholder="Write your feedback here..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleSendFeedback}>Send Feedback</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule 1-on-1
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule 1-on-1 with {member.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="meeting-date">Date & Time</Label>
                  <Input id="meeting-date" type="datetime-local" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agenda">Agenda</Label>
                  <Textarea
                    id="agenda"
                    placeholder="Meeting agenda and talking points..."
                    value={oneOnOneNotes}
                    onChange={(e) => setOneOnOneNotes(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleScheduleOneOnOne}>Schedule Meeting</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-2xl">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{member.name}</CardTitle>
              <p className="text-muted-foreground">{member.role}</p>
              <Badge variant={member.status === 'Active' ? 'secondary' : 'destructive'}>
                {member.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{member.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">{member.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Join Date:</span>
                  <span className="font-medium">{member.joinDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Overall Performance</span>
                  <span className="text-sm font-medium text-primary">{member.performance}%</span>
                </div>
                <Progress value={member.performance} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">On-Time Delivery</span>
                  <span className="text-sm font-medium text-primary">{member.onTimeDelivery}%</span>
                </div>
                <Progress value={member.onTimeDelivery} />
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{member.tasksCompleted}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">{member.tasksPending}</div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5" />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {member.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Current Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {member.currentProjects.map((project, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">Role: {project.role}</p>
                      </div>
                      <Badge variant={project.status === 'On Track' ? 'default' : 'secondary'}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckSquare className="mr-2 h-5 w-5" />
                Recent Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {member.recentTasks.map((task, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{task.name}</TableCell>
                      <TableCell>
                        <Badge variant={
                          task.status === 'Completed' ? 'secondary' :
                          task.status === 'In Progress' ? 'default' : 'outline'
                        }>
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{task.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Time Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Recent Time Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead className="text-right">Hours</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {member.timeEntries.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.project}</TableCell>
                      <TableCell className="text-muted-foreground">{entry.task}</TableCell>
                      <TableCell className="text-right font-medium">{entry.hours}h</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MemberDetails;