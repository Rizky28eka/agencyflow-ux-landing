import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Database, Shield, Bell, Server, Save } from 'lucide-react';
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
        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              Database Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="db-host">Database Host</Label>
              <Input id="db-host" defaultValue="localhost:5432" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="db-name">Database Name</Label>
              <Input id="db-name" defaultValue="agencyflow_prod" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backup-frequency">Backup Frequency</Label>
              <Input id="backup-frequency" defaultValue="Daily at 2:00 AM" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retention-period">Retention Period</Label>
              <Input id="retention-period" defaultValue="30 days" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Security Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input id="session-timeout" defaultValue="60" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-policy">Password Policy</Label>
              <Input id="password-policy" defaultValue="8+ chars, mixed case, numbers" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="failed-attempts">Max Failed Login Attempts</Label>
              <Input id="failed-attempts" defaultValue="5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lockout-duration">Lockout Duration (minutes)</Label>
              <Input id="lockout-duration" defaultValue="15" />
            </div>
          </CardContent>
        </Card>

        {/* Server Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="mr-2 h-5 w-5" />
              Server Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="server-port">Server Port</Label>
              <Input id="server-port" defaultValue="8080" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-connections">Max Connections</Label>
              <Input id="max-connections" defaultValue="1000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cache-size">Cache Size (MB)</Label>
              <Input id="cache-size" defaultValue="512" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="log-level">Log Level</Label>
              <Input id="log-level" defaultValue="INFO" />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              System Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="system-alerts">System Alerts</Label>
              <input type="checkbox" id="system-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="error-notifications">Error Notifications</Label>
              <input type="checkbox" id="error-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-alerts">Maintenance Alerts</Label>
              <input type="checkbox" id="maintenance-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="backup-notifications">Backup Notifications</Label>
              <input type="checkbox" id="backup-notifications" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminSystemSettings;