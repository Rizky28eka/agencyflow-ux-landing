import { Button } from '@/components/ui/button';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';

const HeroSection = () => {
  const features = [
    'Project Management',
    'Client Portal',
    'Team Collaboration',
    'Financial Hub'
  ];

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-up">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                🚀 All-in-one platform for creative agencies
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Streamline Your
                <span className="text-gradient block">Creative Agency</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Manage projects, clients, teams, and finances in one powerful platform. 
                Built specifically for creative agencies that demand excellence.
              </p>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={feature} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-light text-primary-foreground shadow-premium hover-lift"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary/20 hover:bg-primary/5"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"></div>
                  ))}
                </div>
                <span>500+ agencies trust us</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">★★★★★</span>
                <span>4.9/5 rating</span>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Mockup */}
          <div className="relative animate-fade-in">
            <div className="relative z-10">
              {/* Main Dashboard Preview */}
              <div className="bg-card rounded-2xl shadow-premium border p-6 hover-lift">
                <div className="space-y-4">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <h3 className="font-semibold">Dashboard Overview</h3>
                      <p className="text-sm text-muted-foreground">Welcome back, Sarah</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent"></div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-primary">12</div>
                      <div className="text-sm text-muted-foreground">Active Projects</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-accent">8</div>
                      <div className="text-sm text-muted-foreground">Team Members</div>
                    </div>
                  </div>

                  {/* Project List Preview */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Recent Projects</h4>
                    {[
                      { name: 'Brand Redesign', client: 'TechCorp', status: 'In Progress' },
                      { name: 'Website Launch', client: 'StartupXYZ', status: 'Review' },
                      { name: 'Marketing Campaign', client: 'RetailCo', status: 'Planning' }
                    ].map((project, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{project.name}</div>
                          <div className="text-xs text-muted-foreground">{project.client}</div>
                        </div>
                        <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {project.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full animate-float"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;