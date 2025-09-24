import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Clock, Download, File, Send, Briefcase, ThumbsUp, ThumbsDown, Eye } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { toast } from 'sonner';

const ClientProjectDetails = () => {
  const timeline = [
    { status: 'Completed', title: 'Project Kick-off', date: '2024-01-01' },
    { status: 'Completed', title: 'Initial Mockups Delivered', date: '2024-01-15' },
    { status: 'In Progress', title: 'Frontend Development', date: 'Est. 2024-02-10' },
    { status: 'Upcoming', title: 'Final Delivery', date: 'Est. 2024-02-15' },
  ];

  const deliverables = [
    { name: 'Homepage_Mockup_v2.fig', size: '5.8 MB', type: 'Figma File' },
    { name: 'Brand_Guidelines.pdf', size: '12.2 MB', type: 'PDF Document' },
  ];

  const approvals = [
      { name: 'Homepage Final Design', type: 'Design Mockup' },
      { name: 'Project Timeline Adjustment', type: 'Schedule Change' },
  ];

  const handleApproval = (action: string) => {
      toast.success(`Action [${action}] recorded successfully.`);
  }

  return (
    <DashboardLayout
      role="client"
      title="Project: Website Redesign"
      description="View timeline, deliverables, and provide feedback."
      headerIcon={<Briefcase className="h-8 w-8 text-primary" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Timeline & Feedback */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader><CardTitle>Project Timeline</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.status === 'Completed' ? 'bg-green-500' : item.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-300'}`}>
                        {item.status === 'Completed' ? <CheckCircle className="h-5 w-5 text-white" /> : <Clock className="h-5 w-5 text-white" />}
                      </div>
                      {index < timeline.length - 1 && <div className="h-8 w-px bg-gray-300 mx-auto"></div>}
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle>Send Feedback</CardTitle>
                <CardDescription>Have a question or feedback? Let the project manager know.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea placeholder="Type your feedback here..." />
                <Button><Send className="mr-2 h-4 w-4" /> Send Feedback</Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Approvals & Deliverables */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="border-primary bg-primary/5">
            <CardHeader><CardTitle>Awaiting Your Approval</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {approvals.map((item, index) => (
                <div key={index} className="p-3 border rounded-lg bg-background">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.type}</p>
                    <div className="flex gap-2 mt-3">
                        <Button size="sm" className="w-full" onClick={() => handleApproval('Approved')}><ThumbsUp className="mr-2 h-4 w-4"/>Approve</Button>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => handleApproval('Changes Requested')}><ThumbsDown className="mr-2 h-4 w-4"/>Request Changes</Button>
                    </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Deliverables</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {deliverables.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <File className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{file.type} - {file.size}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon"><Download className="h-5 w-5" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientProjectDetails;