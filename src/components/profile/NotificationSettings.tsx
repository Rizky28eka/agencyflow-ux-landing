
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const NotificationSettings = () => {
  const notificationPrefs = {
    projectUpdates: true,
    taskAssignments: true,
    teamMentions: true,
    billingAlerts: true,
    newLogins: false,
    weeklySummary: true,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Manage how you receive notifications from AgencyFlow.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h4 className="font-semibold mb-4">Email Notifications</h4>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <Label htmlFor="projectUpdates">Project Updates</Label>
                <p className="text-sm text-muted-foreground">Receive an email when there are updates on your projects.</p>
              </div>
              <Switch id="projectUpdates" defaultChecked={notificationPrefs.projectUpdates} />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <Label htmlFor="taskAssignments">Task Assignments</Label>
                <p className="text-sm text-muted-foreground">Receive an email when you are assigned a new task.</p>
              </div>
              <Switch id="taskAssignments" defaultChecked={notificationPrefs.taskAssignments} />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <Label htmlFor="teamMentions">Team Mentions</Label>
                <p className="text-sm text-muted-foreground">Receive an email when a team member mentions you.</p>
              </div>
              <Switch id="teamMentions" defaultChecked={notificationPrefs.teamMentions} />
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">System & Security Alerts</h4>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <Label htmlFor="billingAlerts">Billing Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive an email for billing-related events.</p>
              </div>
              <Switch id="billingAlerts" defaultChecked={notificationPrefs.billingAlerts} />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <Label htmlFor="newLogins">New Device Logins</Label>
                <p className="text-sm text-muted-foreground">Receive an email when a new device logs into your account.</p>
              </div>
              <Switch id="newLogins" defaultChecked={notificationPrefs.newLogins} />
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Digests</h4>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <Label htmlFor="weeklySummary">Weekly Summary</Label>
                <p className="text-sm text-muted-foreground">Receive a weekly summary of your team's activity.</p>
              </div>
              <Switch id="weeklySummary" defaultChecked={notificationPrefs.weeklySummary} />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  );
};
