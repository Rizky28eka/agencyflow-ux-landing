
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Smartphone } from 'lucide-react';

export const SecuritySettings = () => {
  return (
    <div className="space-y-8">
      {/* Change Password */}
      <div>
        <h3 className="text-lg font-medium">Password</h3>
        <p className="text-sm text-muted-foreground">
          Update your password here. It's recommended to use a strong, unique password.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input id="currentPassword" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input id="newPassword" type="password" />
        </div>
      </div>
      <Button>Update Password</Button>

      <Separator />

      {/* Two-Factor Authentication */}
      <div>
        <h3 className="text-lg font-medium">Two-Factor Authentication (2FA)</h3>
        <p className="text-sm text-muted-foreground">
          Add an extra layer of security to your account.
        </p>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center">
                <ShieldCheck className="h-6 w-6 mr-3 text-green-600" />
                <div>
                    <CardTitle>2FA is Enabled</CardTitle>
                    <CardDescription>You are using an authenticator app.</CardDescription>
                </div>
            </div>
            <Button variant="destructive">Disable</Button>
        </CardHeader>
        <CardContent>
            <div className="text-sm text-muted-foreground mt-4">
                <p className="font-semibold mb-2">Authenticator App</p>
                <p>To disable 2FA, please enter a code from your authenticator app.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};
