import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { CheckSquare, Clock, User, MessageSquare, Calendar, ArrowLeft, Play, Pause, Square, FileText, Paperclip } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task] = useState({
    id: taskId || 'TASK-001',
    title: 'Implement user authentication flow',
    description: 'Create a complete user authentication system including login, registration, password reset, and email verification functionality.',
    project: 'Mobile App Development',
    assignee: 'Mike Chen',
    reporter: 'Sarah Johnson',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2024-01-28',
    createdDate: '2024-01-20',
    estimatedHours: 16,
    loggedHours: 8.5,
    progress: 53,
    labels: ['Frontend', 'Authentication', 'Security'],
    attachments: [
      { name: 'auth_flow_diagram.png', size: '2.1 MB', type: 'image' },
      { name: 'requirements.pdf', size: '850 KB', type: 'document' },
    ],
    comments: [
      {
        author: 'Sarah Johnson',
        avatar: '/placeholder.svg',
        content: 'Please make sure to implement proper password validation according to our security guidelines.',
        timestamp: '2024-01-22 10:30 AM',
      },
      {
        author: 'Mike Chen',
        avatar: '/placeholder.svg',
        content: 'Working on the login form now. Should have the basic flow ready by tomorrow.',
        timestamp: '2024-01-23 2:15 PM',
      },
    ],
    subtasks: [
      { name: 'Create login form UI', completed: true },
      { name: 'Implement form validation', completed: true },
      { name: 'Connect to authentication API', completed: false },
      { name: 'Add password reset functionality', completed: false },
      { name: 'Write unit tests', completed: false },
    ]
  });

  const [newComment, setNewComment] = useState('');
  const [timeEntry, setTimeEntry] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerTime, setTimerTime] = useState('02:34:15');

  const handleAddComment = () => {
    if (newComment.trim()) {
      toast.success('Comment added successfully!');
      setNewComment('');
    }
  };

  const handleLogTime = () => {
    if (timeEntry) {
      toast.success(`${timeEntry} hours logged successfully!`);
      setTimeEntry('');
    }
  };

  const handleTimerToggle = () => {
    setIsTimerRunning(!isTimerRunning);
    toast.success(isTimerRunning ? 'Timer paused' : 'Timer started');
  };

  const handleStatusChange = (newStatus: string) => {
    toast.success(`Task status updated to ${newStatus}`);
  };

  return (
    <DashboardLayout
      role="member"
      title={task.title}
      description={`Task details for ${task.id}`}
      headerIcon={<CheckSquare className="h-8 w-8 text-primary" />}
      headerAction={
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/dashboard/member/tasks')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tasks
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                Log Time
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log Time for Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="hours">Hours Worked</Label>
                  <Input
                    id="hours"
                    type="number"
                    step="0.5"
                    placeholder="e.g., 2.5"
                    value={timeEntry}
                    onChange={(e) => setTimeEntry(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="work-description">Work Description</Label>
                  <Textarea
                    id="work-description"
                    placeholder="Describe what you worked on..."
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleLogTime}>Log Time</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{task.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{task.project}</Badge>
                    <Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'}>
                      {task.priority} Priority
                    </Badge>
                    <Badge variant={task.status === 'In Progress' ? 'default' : 'outline'}>
                      {task.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange('To Do')}
                  >
                    To Do
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange('In Progress')}
                  >
                    In Progress
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange('Done')}
                  >
                    Done
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-muted-foreground leading-relaxed">{task.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Assignee</p>
                      <p className="font-medium">{task.assignee}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Reporter</p>
                      <p className="font-medium">{task.reporter}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="font-medium">{task.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time Tracking</p>
                      <p className="font-medium">{task.loggedHours}h / {task.estimatedHours}h</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Progress</span>
                  <span className="text-muted-foreground">{task.progress}%</span>
                </div>
                <Progress value={task.progress} />
              </div>

              {/* Labels */}
              <div>
                <h4 className="font-semibold mb-2">Labels</h4>
                <div className="flex flex-wrap gap-2">
                  {task.labels.map((label, index) => (
                    <Badge key={index} variant="outline">{label}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subtasks */}
          <Card>
            <CardHeader>
              <CardTitle>Subtasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {task.subtasks.map((subtask, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => toast.success('Subtask updated!')}
                      className="rounded"
                    />
                    <span className={subtask.completed ? 'line-through text-muted-foreground' : ''}>
                      {subtask.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {task.comments.map((comment, index) => (
                <div key={index} className="flex space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback>
                      {comment.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.content}</p>
                  </div>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-3">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Paperclip className="mr-2 h-4 w-4" />
                    Attach File
                  </Button>
                  <Button onClick={handleAddComment}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Add Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Timer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Time Tracker
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{timerTime}</div>
                <p className="text-sm text-muted-foreground">Active timer</p>
              </div>
              <div className="flex justify-center space-x-2">
                <Button
                  size="sm"
                  variant={isTimerRunning ? "outline" : "default"}
                  onClick={handleTimerToggle}
                >
                  {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="outline">
                  <Square className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Task Info */}
          <Card>
            <CardHeader>
              <CardTitle>Task Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Task ID:</span>
                  <span className="font-mono">{task.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span>{task.createdDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due Date:</span>
                  <span className="font-medium">{task.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated:</span>
                  <span>{task.estimatedHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Logged:</span>
                  <span className="font-medium">{task.loggedHours}h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attachments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Attachments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {task.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  <Paperclip className="mr-2 h-4 w-4" />
                  Add Attachment
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Assign to Someone Else
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Change Due Date
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <CheckSquare className="mr-2 h-4 w-4" />
                Create Subtask
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TaskDetailsPage;