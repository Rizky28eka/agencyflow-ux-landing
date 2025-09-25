
import { DashboardLayout } from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, Bell, Settings } from 'lucide-react';
import { ProfileSettings } from "@/components/profile/ProfileSettings";
import { SecuritySettings } from "@/components/profile/SecuritySettings";
import { NotificationSettings } from "@/components/profile/NotificationSettings";

const ProfilePage = () => {
  return (
    <DashboardLayout
      role="owner"
      title="Profile & Settings"
      description="Manage your account settings, profile, and notification preferences."
      headerIcon={<Settings className="h-6 w-6 text-primary" />}
    >
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <Tabs defaultValue="profile" className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          <TabsList className="flex lg:flex-col h-auto lg:h-full w-full lg:w-auto space-x-1 lg:space-x-0 lg:space-y-1 p-1">
            <TabsTrigger value="profile" className="flex-1 lg:w-full justify-start p-3">
              <User className="mr-2 h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex-1 lg:w-full justify-start p-3">
              <Shield className="mr-2 h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1 lg:w-full justify-start p-3">
              <Bell className="mr-2 h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
          </TabsList>

          <div className="lg:col-span-3">
            <TabsContent value="profile">
              <ProfileSettings />
            </TabsContent>
            <TabsContent value="security">
              <SecuritySettings />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
