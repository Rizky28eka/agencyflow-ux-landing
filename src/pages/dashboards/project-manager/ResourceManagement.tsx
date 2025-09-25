
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, SlidersHorizontal } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Pie, PieChart as RechartsPieChart, Cell } from 'recharts';

const ResourceManagement = () => {
  const teamWorkload = [
    {
      name: 'Sarah Johnson',
      role: 'UI/UX Designer',
      totalAllocation: 90,
      projects: [
        { name: 'Project A', allocation: 40, color: 'bg-blue-500' },
        { name: 'Project C', allocation: 50, color: 'bg-purple-500' },
      ],
    },
    {
      name: 'Mike Chen',
      role: 'Frontend Developer',
      totalAllocation: 100,
      projects: [
        { name: 'Project A', allocation: 60, color: 'bg-blue-500' },
        { name: 'Project B', allocation: 40, color: 'bg-green-500' },
      ],
    },
    {
      name: 'Emily Davis',
      role: 'Backend Developer',
      totalAllocation: 70,
      projects: [
        { name: 'Project B', allocation: 70, color: 'bg-green-500' },
      ],
    },
    {
      name: 'Alex Rodriguez',
      role: 'QA Engineer',
      totalAllocation: 50,
      projects: [
        { name: 'Project C', allocation: 50, color: 'bg-purple-500' },
      ],
    },
  ];

  const capacityData = [
    { type: 'Allocated', value: 78, fill: '#3b82f6' }, // Using hex for primary color
    { type: 'Available', value: 22, fill: '#f1f5f9' }, // Using hex for muted color
  ];

  return (
    <DashboardLayout
      role="project-manager"
      title="Resource Management"
      description="Allocate resources and plan team capacity."
      headerIcon={<Users className="h-8 w-8 text-primary" />}
    >
      {/* Filters */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-2">
          <Select defaultValue="all-teams">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-teams">All Teams</SelectItem>
              <SelectItem value="design-team">Design Team</SelectItem>
              <SelectItem value="dev-team">Development Team</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            This Month
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Sync with Calendar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Sync Calendars</DialogTitle></DialogHeader>
              <div className="py-4">
                <p className="text-muted-foreground">Choose a calendar to sync task deadlines with:</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Button variant="outline">Google Calendar</Button>
                  <Button variant="outline">Outlook Calendar</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Adjust Allocation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Adjust Team Member Allocation</DialogTitle></DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Team Member</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select a member..." /></SelectTrigger><SelectContent><SelectItem value="sarah">Sarah Johnson</SelectItem></SelectContent></Select>
                </div>
                <div className="space-y-2">
                  <Label>Project</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select a project..." /></SelectTrigger><SelectContent><SelectItem value="project-a">Project A</SelectItem></SelectContent></Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allocation">New Allocation (%)</Label>
                  <Input id="allocation" type="number" placeholder="e.g., 50" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                <DialogClose asChild><Button type="button">Update Allocation</Button></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Team Workload List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Team Workload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {teamWorkload.map((member, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                    <p className="text-sm font-bold">{member.totalAllocation}% Allocated</p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-4 flex overflow-hidden">
                    {member.projects.map((p, pIndex) => (
                      <div
                        key={pIndex}
                        className={`${p.color} h-full`}
                        style={{ width: `${p.allocation}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Overall Capacity */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Overall Team Capacity</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ChartContainer config={{}} className="h-48 w-full">
                <RechartsPieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie data={capacityData} dataKey="value" nameKey="type" innerRadius={50} outerRadius={70} strokeWidth={2}>
                    {capacityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ChartContainer>
              <div className="text-center mt-4">
                <p className="text-3xl font-bold">{capacityData.find(d => d.type === 'Allocated')?.value}%</p>
                <p className="text-muted-foreground">Allocated Capacity</p>
              </div>
              <div className="w-full mt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="flex items-center"><div className="w-2 h-2 rounded-full" style={{backgroundColor: '#3b82f6'}}></div><span className="ml-2">Allocated</span></span> <span>78%</span></div>
                  <div className="flex justify-between"><span className="flex items-center"><div className="w-2 h-2 rounded-full" style={{backgroundColor: '#f1f5f9'}}></div><span className="ml-2">Available</span></span> <span>22%</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResourceManagement;
