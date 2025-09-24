
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Save } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const MemberSettings = () => {
  return (
    <DashboardLayout
      role="member"
      title="My Profile"
      description="Update your personal information and account settings."
      headerIcon={<User className="h-8 w-8 text-primary" />}
      headerAction={<Button className="bg-gradient-primary"><Save className="mr-2 h-4 w-4" /> Save Changes</Button>}
    >
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>MC</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Picture</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="Mike Chen" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="mike@agency.com" readOnly />
                    </div>
                </div>
                <div className="space-y-4 border-t pt-6">
                    <h3 className="font-semibold">Change Password</h3>
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                    </div>
                </div>
            </CardContent>
        </Card>
    </DashboardLayout>
  );
};

export default MemberSettings;
