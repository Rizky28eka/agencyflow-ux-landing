
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Shield, Lock } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const AdminSecurity = () => {
  // Mock current plan
  const currentPlan = 'professional'; // 'free', 'professional', 'enterprise'
  const isPremium = currentPlan === 'professional' || currentPlan === 'enterprise';

  return (
    <DashboardLayout
      role="admin"
      title="Security Settings"
      description="Configure SSO, password policies, and other security features."
      headerIcon={<Shield className="h-8 w-8 text-primary" />}
    >
      <div className="space-y-8">
        <Card>
            <CardHeader><CardTitle>General Security</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="2fa" className="font-normal">Require Two-Factor Authentication (2FA)</Label>
                    <Switch id="2fa" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password-policy">Password Policy</Label>
                    <Input id="password-policy" defaultValue="8+ chars, mixed case, numbers" />
                </div>
            </CardContent>
        </Card>

        <div className="relative">
          {!isPremium && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg">
                  <Lock className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Upgrade to Unlock SSO</h3>
                  <p className="text-muted-foreground mb-6">This feature is available on the Enterprise plan.</p>
                  <Button size="lg" className="bg-gradient-primary">Upgrade Your Plan</Button>
              </div>
          )}
          <Card>
            <CardHeader>
              <CardTitle>Single Sign-On (SSO)</CardTitle>
              <CardDescription>Allow users to log in with your identity provider.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                      <Label htmlFor="enable-sso" className="font-medium">Enable SSO</Label>
                      <p className="text-sm text-muted-foreground">Allow users to sign in with SSO.</p>
                  </div>
                  <Switch id="enable-sso" disabled={!isPremium} />
              </div>

              <div className="space-y-4">
                  <h4 className="font-semibold">SAML Configuration</h4>
                  <div className="space-y-2">
                      <Label htmlFor="idp-url">Identity Provider URL</Label>
                      <Input id="idp-url" placeholder="https://idp.example.com/sso/saml" disabled={!isPremium} />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="issuer-url">Issuer URL</Label>
                      <Input id="issuer-url" placeholder="http://www.okta.com/exk..." disabled={!isPremium} />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="x509-cert">X.509 Certificate</Label>
                      <Input id="x509-cert" type="file" disabled={!isPremium} />
                  </div>
              </div>

              <div className="flex justify-end">
                  <Button disabled={!isPremium}>Save SSO Settings</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSecurity;
