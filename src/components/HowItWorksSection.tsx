import { UserPlus, Settings, Rocket } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Sign Up & Setup',
      description: 'Create your account, invite team members, and configure your workspace in minutes.',
      details: ['Quick onboarding', 'Team invitations', 'Custom workflows']
    },
    {
      icon: Settings,
      title: 'Configure & Customize',
      description: 'Set up your projects, client portals, and financial tracking to match your agency\'s needs.',
      details: ['Project templates', 'Client branding', 'Custom fields']
    },
    {
      icon: Rocket,
      title: 'Launch & Scale',
      description: 'Start managing projects efficiently and watch your agency productivity soar.',
      details: ['Live collaboration', 'Real-time insights', 'Automated workflows']
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Get Started in
            <span className="text-gradient"> 3 Simple Steps</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            From setup to success in under 30 minutes
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="flex justify-between">
              <div className="w-1/3 h-0.5 bg-gradient-to-r from-primary to-accent mt-6"></div>
              <div className="w-1/3 h-0.5 bg-gradient-to-r from-accent to-primary mt-6"></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div 
                key={step.title}
                className="text-center space-y-6 animate-fade-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Step Icon */}
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent shadow-premium">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center shadow-soft">
                    {index + 1}
                  </div>
                </div>

                {/* Step Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Step Details */}
                  <div className="space-y-2">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-center justify-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                        <span className="text-sm font-medium">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 text-primary font-medium">
            ⚡ Setup takes less than 30 minutes
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;