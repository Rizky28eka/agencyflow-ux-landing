import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AuthForm } from '@/components/AuthForm';
import { SocialAuth } from '@/components/SocialAuth';
import { ArrowLeft, Building2, Shield, Users, Zap } from 'lucide-react';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') as 'signin' | 'signup' || 'signin';
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const navigate = useNavigate();

  const getTitle = () => {
    return mode === 'signin' ? 'Welcome Back' : 'Create Your Account';
  };

  const getDescription = () => {
    return mode === 'signin' ? 'Sign in to your AgencyFlow account' : 'Join thousands of agencies using AgencyFlow';
  };

  const features = [
    {
      icon: <Building2 className="h-5 w-5 text-primary" />,
      title: 'Project Management',
      description: 'Streamline workflows with intuitive project boards'
    },
    {
      icon: <Users className="h-5 w-5 text-accent" />,
      title: 'Team Collaboration',
      description: 'Keep everyone connected and productive'
    },
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: 'Client Portal',
      description: 'Give clients transparency and control'
    },
    {
      icon: <Zap className="h-5 w-5 text-accent" />,
      title: 'Financial Hub',
      description: 'Track budgets and monitor profitability'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent"></div>
            <span className="text-xl font-bold">AgencyFlow</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/')}><ArrowLeft className="mr-2 h-4 w-4" />Back to Home</Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Features */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold">The All-in-One Platform for<span className="text-gradient block">Creative Agencies</span></h1>
              <p className="text-lg text-muted-foreground">Manage projects, clients, teams, and finances in one powerful platform.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-muted flex items-center justify-center">{feature.icon}</div>
                  <div><h3 className="font-semibold text-sm">{feature.title}</h3><p className="text-xs text-muted-foreground">{feature.description}</p></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Auth Form */}
          <div className="order-1 lg:order-2">
            <Card className="w-full max-w-md mx-auto shadow-premium">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl">{getTitle()}</CardTitle>
                <CardDescription className="text-base">{getDescription()}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <AuthForm mode={mode} onModeChange={setMode} />
                <SocialAuth />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;