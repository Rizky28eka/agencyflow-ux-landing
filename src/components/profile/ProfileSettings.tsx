
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { Camera } from 'lucide-react';

export const ProfileSettings = () => {
  const { user } = useAuth();

  // Mock data, in a real app this would be from your auth context/state
  const profile = {
    firstName: user?.user_metadata?.first_name || 'Maksim',
    lastName: user?.user_metadata?.last_name || 'Lakna',
    email: user?.email || 'maksim.lakna@example.com',
    jobTitle: user?.user_metadata?.job_title || 'Owner',
    company: user?.user_metadata?.company || 'AgencyFlow',
    timezone: 'Pacific Standard Time',
    bio: 'Leading the charge in revolutionizing agency workflows.'
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">Public Profile</h3>
        <p className="text-sm text-muted-foreground">
          This information will be displayed publicly.
        </p>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
            <Avatar className="w-24 h-24">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="text-3xl">ML</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                <Camera className="h-4 w-4" />
                <span className="sr-only">Change photo</span>
            </Button>
        </div>
        <div>
            <p className="font-bold text-xl">{`${profile.firstName} ${profile.lastName}`}</p>
            <p className="text-muted-foreground">{profile.jobTitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" defaultValue={profile.firstName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" defaultValue={profile.lastName} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue={profile.email} disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input id="jobTitle" defaultValue={profile.jobTitle} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" defaultValue={profile.company} />
        </div>
        <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" defaultValue={profile.bio} />
        </div>
      </div>

      <Button>Update Profile</Button>
    </div>
  );
};
