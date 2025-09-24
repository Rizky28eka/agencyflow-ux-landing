
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { FileText, Download } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const OwnerAdvancedReports = () => {
  return (
    <DashboardLayout
      role="owner"
      title="Advanced Reports"
      description="Build and generate custom, in-depth business reports."
      headerIcon={<FileText className="h-8 w-8 text-primary" />}
    >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Report Builder</CardTitle>
                        <CardDescription>Select parameters to generate a custom report.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-2">
                            <Label className="font-semibold">1. Select Report Type</Label>
                            <Select defaultValue="qbr">
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="qbr">Quarterly Business Review</SelectItem>
                                    <SelectItem value="client-profit">Client Profitability Report</SelectItem>
                                    <SelectItem value="team-util">Team Utilization Analysis</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="font-semibold">2. Select Date Range</Label>
                            <div className="flex items-center gap-4">
                                <Input type="date" />
                                <span>to</span>
                                <Input type="date" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="font-semibold">3. Customize Metrics</Label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 rounded-md border p-4">
                                <div className="flex items-center space-x-2"><Checkbox id="m1" defaultChecked /><Label htmlFor="m1">Revenue Data</Label></div>
                                <div className="flex items-center space-x-2"><Checkbox id="m2" defaultChecked /><Label htmlFor="m2">Project Costs</Label></div>
                                <div className="flex items-center space-x-2"><Checkbox id="m3" defaultChecked /><Label htmlFor="m3">Profit Margins</Label></div>
                                <div className="flex items-center space-x-2"><Checkbox id="m4" /><Label htmlFor="m4">Team Utilization</Label></div>
                                <div className="flex items-center space-x-2"><Checkbox id="m5" /><Label htmlFor="m5">Client Satisfaction</Label></div>
                            </div>
                        </div>
                        
                        <div>
                            <Button size="lg" className="bg-gradient-primary">
                                <Download className="mr-2 h-4 w-4" />
                                Generate Report
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader><CardTitle>Recently Generated</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <p className="font-medium">Q3 Business Review</p>
                            <Button variant="ghost" size="icon"><Download className="h-5 w-5" /></Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <p className="font-medium">TechCorp Profitability</p>
                            <Button variant="ghost" size="icon"><Download className="h-5 w-5" /></Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </DashboardLayout>
  );
};

export default OwnerAdvancedReports;
