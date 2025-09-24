
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Building, Users, Shield, Bell, Save, CreditCard, Zap } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const OwnerSettings = () => {
  const handleSaveChanges = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <DashboardLayout
      role="owner"
      title="Company Settings"
      description="System configuration and preferences"
      headerIcon={<Settings className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary" onClick={handleSaveChanges}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="mr-2 h-5 w-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="Creative Agency Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-email">Company Email</Label>
              <Input id="company-email" type="email" defaultValue="hello@creativeagency.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-phone">Phone Number</Label>
              <Input id="company-phone" defaultValue="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-address">Address</Label>
              <Input id="company-address" defaultValue="123 Business St, City, State 12345" />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <Input id="currency" defaultValue="USD" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input id="language" defaultValue="English" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-format">Date Format</Label>
              <Input id="date-format" defaultValue="MM/DD/YYYY" />
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/dashboard/admin/roles" className="w-full">
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Manage User Roles
              </Button>
            </Link>
            <Link to="/dashboard/admin/settings" className="w-full">
              <Button className="w-full justify-start" variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Security Settings
              </Button>
            </Link>
            <Button className="w-full justify-start" variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <Label htmlFor="email-notifications" className="font-normal">Email Notifications</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <Label htmlFor="project-updates" className="font-normal">Project Updates</Label>
              <Switch id="project-updates" defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <Label htmlFor="financial-alerts" className="font-normal">Financial Alerts</Label>
              <Switch id="financial-alerts" />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <Label htmlFor="team-notifications" className="font-normal">Team Notifications</Label>
              <Switch id="team-notifications" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Billing and Subscription */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Billing & Subscription
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Link to="/dashboard/owner/billing">
                    <Button className="w-full justify-start" variant="outline">
                        <Zap className="mr-2 h-4 w-4" />
                        Manage Plan & Billing
                    </Button>
                </Link>
                <p className="text-xs text-muted-foreground mt-3">View your current plan, billing history, and upgrade options.</p>
            </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OwnerSettings;
