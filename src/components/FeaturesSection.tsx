import { 
  Kanban, 
  Users, 
  DollarSign, 
  MessageSquare, 
  BarChart3, 
  Shield,
  Clock,
  Zap
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Kanban,
      title: 'Project Management',
      description: 'Streamline your workflow with intuitive project boards, task assignments, and real-time progress tracking.',
      benefits: ['Kanban boards', 'Timeline views', 'Task dependencies', 'Progress tracking'],
      image: '📊'
    },
    {
      icon: Users,
      title: 'Client Portal',
      description: 'Give clients transparency with a dedicated portal to view project progress, share feedback, and approve deliverables.',
      benefits: ['Real-time updates', 'Feedback system', 'File sharing', 'Approval workflows'],
      image: '🤝'
    },
    {
      icon: DollarSign,
      title: 'Finance Hub',
      description: 'Track budgets, manage invoices, and monitor profitability across all projects with comprehensive financial tools.',
      benefits: ['Budget tracking', 'Invoice generation', 'Expense management', 'Profit analysis'],
      image: '💰'
    },
    {
      icon: MessageSquare,
      title: 'Team Collaboration',
      description: 'Keep your team connected with integrated communication tools, file sharing, and collaborative workspaces.',
      benefits: ['Team chat', 'File versioning', 'Comment system', 'Notifications'],
      image: '💬'
    }
  ];

  const additionalFeatures = [
    { icon: BarChart3, title: 'Advanced Analytics', description: 'Data-driven insights' },
    { icon: Shield, title: 'Enterprise Security', description: 'Bank-level protection' },
    { icon: Clock, title: 'Time Tracking', description: 'Accurate billing' },
    { icon: Zap, title: 'Automation', description: 'Workflow efficiency' }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Everything Your Agency Needs
            <span className="text-gradient block">In One Platform</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            From project inception to final delivery, AgencyFlow provides all the tools 
            your creative team needs to succeed.
          </p>
        </div>

        {/* Main Features */}
        <div className="space-y-20">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {feature.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-sm font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Visual */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="relative">
                  <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-2xl p-8 shadow-premium hover-lift">
                    <div className="text-8xl text-center opacity-50 mb-4">
                      {feature.image}
                    </div>
                    <div className="bg-card rounded-lg p-6 shadow-soft">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="h-3 bg-primary/20 rounded w-1/3"></div>
                          <div className="h-6 w-6 rounded bg-accent/20"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-muted rounded w-full"></div>
                          <div className="h-2 bg-muted rounded w-2/3"></div>
                          <div className="h-2 bg-muted rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="mt-20 pt-20 border-t">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Plus More Powerful Features</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with enterprise-grade capabilities to scale with your growing agency
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div 
                key={feature.title}
                className="bg-card rounded-lg p-6 shadow-soft hover-lift text-center space-y-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;