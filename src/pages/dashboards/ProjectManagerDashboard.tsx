
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Calendar, CheckSquare, Clock, TrendingUp, Plus, FileText, Target, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ProjectManagerDashboard = () => {

  const handleAction = (action: string) => {
    toast.success(`${action} action completed successfully!`);
  };

  return (
    <DashboardLayout
      role="project-manager"
      title="Project Manager Dashboard"
      description="Project oversight and team coordination"
      headerIcon={<Users className="h-8 w-8 text-primary" />}
      headerAction={
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-gradient-primary"><Plus className="mr-2 h-4 w-4" /> New Project</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Create New Project</DialogTitle></DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2"><Label>Project Name</Label><Input placeholder="e.g., Q3 Marketing Campaign" /></div>
                    <div className="space-y-2"><Label>Client</Label><Input placeholder="e.g., TechCorp" /></div>
                    <div className="space-y-2"><Label>Start Date</Label><Input type="date" /></div>
                    <div className="space-y-2"><Label>End Date</Label><Input type="date" /></div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                    <DialogClose asChild><Button type="button" onClick={() => handleAction('Project Creation')}>Create Project</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      }
    >

        {/* Project Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12</div>
              <p className="text-xs text-muted-foreground">8 on track, 4 need attention</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tasks Completed</CardTitle>
              <CheckSquare className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">184</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team Members</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">18</div>
              <p className="text-xs text-muted-foreground">Across all projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Completion</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">87%</div>
              <p className="text-xs text-muted-foreground">On-time delivery</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Project Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">In Progress</span>
                <span className="text-xl font-bold text-primary">8</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">Pending Review</span>
                <span className="text-xl font-bold text-accent">4</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">Completed This Month</span>
                <span className="text-xl font-bold text-primary">6</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full justify-start" variant="outline"><Plus className="mr-2 h-4 w-4" /> Create New Project</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader><DialogTitle>Create New Project</DialogTitle></DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2"><Label>Project Name</Label><Input placeholder="e.g., Q3 Marketing Campaign" /></div>
                            <div className="space-y-2"><Label>Client</Label><Input placeholder="e.g., TechCorp" /></div>
                            <div className="space-y-2"><Label>Start Date</Label><Input type="date" /></div>
                            <div className="space-y-2"><Label>End Date</Label><Input type="date" /></div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                            <DialogClose asChild><Button type="button" onClick={() => handleAction('Project Creation')}>Create Project</Button></DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full justify-start" variant="outline"><Calendar className="mr-2 h-4 w-4" /> Schedule Meeting</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader><DialogTitle>Schedule Meeting</DialogTitle></DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2"><Label>Meeting Title</Label><Input placeholder="e.g., Project Alpha Sync-up" /></div>
                            <div className="space-y-2"><Label>Date & Time</Label><Input type="datetime-local" /></div>
                            <div className="space-y-2"><Label>Agenda</Label><Textarea placeholder="Key discussion topics..." /></div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                            <DialogClose asChild><Button type="button" onClick={() => handleAction('Meeting Scheduling')}>Schedule</Button></DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
              <Link to="/dashboard/project-manager/tasks" className="w-full">
                <Button className="w-full justify-start" variant="outline">
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Review Tasks
                </Button>
              </Link>
              <Link to="/dashboard/project-manager/time-report" className="w-full">
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  Time Tracking Report
                </Button>
              </Link>
              <Link to="/dashboard/project-manager/resource-management" className="w-full">
                <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Resource Management
                </Button>
              </Link>
              <Link to="/dashboard/project-manager/risk-management" className="w-full">
                <Button className="w-full justify-start" variant="outline">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Risk Management
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
    </DashboardLayout>
  );
};

export default ProjectManagerDashboard;
