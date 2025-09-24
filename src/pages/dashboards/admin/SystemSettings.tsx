
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Database, Shield, Bell, Server, Save, Palette, Image as ImageIcon, Globe } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const AdminSystemSettings = () => {
  return (
    <DashboardLayout
      role="admin"
      title="System Settings"
      description="Platform configuration and maintenance"
      headerIcon={<Settings className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Branding Card */}
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center"><Palette className="mr-2 h-5 w-5" /> Branding (White-Label)</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Company Logo</Label>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center"><ImageIcon className="h-8 w-8 text-muted-foreground"/></div>
                            <Button variant="outline">Upload Logo</Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Primary Color</Label>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer border-2 border-ring"></div>
                            <div className="w-8 h-8 rounded-full bg-green-500 cursor-pointer"></div>
                            <div className="w-8 h-8 rounded-full bg-red-500 cursor-pointer"></div>
                            <div className="w-8 h-8 rounded-full bg-purple-500 cursor-pointer"></div>
                            <div className="w-8 h-8 rounded-full bg-orange-500 cursor-pointer"></div>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="custom-domain">Custom Domain</Label>
                        <Input id="custom-domain" placeholder="e.g., portal.yourcompany.com" />
                    </div>
                    <Button>Configure Domain</Button>
                </div>
            </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Shield className="mr-2 h-5 w-5" /> Security Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
                <Label htmlFor="2fa" className="font-normal">Require Two-Factor Authentication (2FA)</Label>
                <Switch id="2fa" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input id="session-timeout" defaultValue="60" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-policy">Password Policy</Label>
              <Input id="password-policy" defaultValue="8+ chars, mixed case, numbers" />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5" /> System Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="system-alerts" className="font-normal">Critical System Alerts</Label>
              <Switch id="system-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="backup-notifications" className="font-normal">Backup Status</Label>
              <Switch id="backup-notifications" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Database className="mr-2 h-5 w-5" /> Database Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="db-host">Database Host</Label>
              <Input id="db-host" defaultValue="localhost:5432" readOnly/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="backup-frequency">Backup Frequency</Label>
              <Input id="backup-frequency" defaultValue="Daily at 2:00 AM" />
            </div>
          </CardContent>
        </Card>

        {/* Server Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Server className="mr-2 h-5 w-5" /> Server Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="log-level">Log Level</Label>
              <Input id="log-level" defaultValue="INFO" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="cache-size">Cache Size (MB)</Label>
              <Input id="cache-size" defaultValue="512" />
            </div>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
};

export default AdminSystemSettings;
