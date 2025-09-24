
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, User, Bell, Save } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const ClientAccountSettings = () => {
  return (
    <DashboardLayout
      role="client"
      title="Account Settings"
      description="Manage your profile, users, and notification preferences."
      headerIcon={<Settings className="h-8 w-8 text-primary" />}
      headerAction={<Button className="bg-gradient-primary"><Save className="mr-2 h-4 w-4" /> Save Changes</Button>}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
            <CardHeader className="items-center">
                <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>CC</AvatarFallback>
                </Avatar>
                <CardTitle>CyberCorp</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="CyberCorp Inc." />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="contact-person">Main Contact</Label>
                    <Input id="contact-person" defaultValue="Jane Doe" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" type="email" defaultValue="jane.doe@cybercorp.com" />
                </div>
            </CardContent>
        </Card>

        {/* Settings Cards */}
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader><CardTitle className="flex items-center"><User className="mr-2" /> User Management</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">Manage users from your company who can access this dashboard.</p>
                    <Button>Invite New User</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle className="flex items-center"><Bell className="mr-2" /> Notification Preferences</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <Label htmlFor="project-updates" className="font-normal">Project Milestone Updates</Label>
                        <Switch id="project-updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <Label htmlFor="invoice-notifications" className="font-normal">New Invoice Notifications</Label>
                        <Switch id="invoice-notifications" defaultChecked />
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientAccountSettings;
