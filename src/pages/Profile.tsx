
import { DashboardLayout } from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, Bell } from 'lucide-react';
import { ProfileSettings } from "@/components/profile/ProfileSettings";
import { SecuritySettings } from "@/components/profile/SecuritySettings";
import { NotificationSettings } from "@/components/profile/NotificationSettings";

const ProfilePage = () => {
  return (
    <DashboardLayout
      role="owner"
      title="Profile & Settings"
      description="Manage your account settings, profile, and notification preferences."
    >
      <div className="max-w-5xl mx-auto">
        <Tabs defaultValue="profile" className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <TabsList className="flex flex-col h-full w-full md:w-auto">
            <TabsTrigger value="profile" className="w-full justify-start p-3">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="w-full justify-start p-3">
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="w-full justify-start p-3">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <div className="md:col-span-3">
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
