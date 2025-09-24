
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const ClientCustomReports = () => {
  return (
    <DashboardLayout
      role="client"
      title="Custom Reports"
      description="Generate custom reports for your projects."
      headerIcon={<FileText className="h-8 w-8 text-primary" />}
    >
        <Card>
            <CardHeader><CardTitle>Report Generator</CardTitle></CardHeader>
            <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Select Project</Label>
                        <Select defaultValue="all">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Projects</SelectItem>
                                <SelectItem value="p1">Website Redesign</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Select Date Range</Label>
                        <Select defaultValue="last30">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="last30">Last 30 Days</SelectItem>
                                <SelectItem value="last90">Last 90 Days</SelectItem>
                                <SelectItem value="all-time">All Time</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="space-y-4">
                    <Label>Select Metrics to Include</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 rounded-md border p-4">
                        <div className="flex items-center space-x-2"><Checkbox id="m1" defaultChecked /><Label htmlFor="m1">Project Progress</Label></div>
                        <div className="flex items-center space-x-2"><Checkbox id="m2" defaultChecked /><Label htmlFor="m2">Task Completion</Label></div>
                        <div className="flex items-center space-x-2"><Checkbox id="m3" /><Label htmlFor="m3">Budget vs. Actual</Label></div>
                        <div className="flex items-center space-x-2"><Checkbox id="m4" defaultChecked /><Label htmlFor="m4">Hours Logged</Label></div>
                        <div className="flex items-center space-x-2"><Checkbox id="m5" /><Label htmlFor="m5">Risks Identified</Label></div>
                    </div>
                </div>
                <div>
                    <Button className="w-full md:w-auto bg-gradient-primary">
                        <Download className="mr-2 h-4 w-4" />
                        Generate & Download Report
                    </Button>
                </div>
            </CardContent>
        </Card>
    </DashboardLayout>
  );
};

export default ClientCustomReports;
