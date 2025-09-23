import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const FinalCTASection = () => {
  const benefits = [
    'No setup fees',
    '14-day free trial',
    'Cancel anytime',
    'Full feature access'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary-light to-accent relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-white/5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
          {/* Main Headline */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Ready to Transform Your
              <span className="block">Creative Agency?</span>
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of agencies already using AgencyFlow to streamline their 
              operations, delight clients, and boost profitability.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center space-x-2 text-white/90">
                <CheckCircle className="h-5 w-5 text-white" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-large hover-lift px-8 py-4 text-lg font-semibold"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-4 text-lg"
            >
              Schedule Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-white/80">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30"></div>
                  ))}
                </div>
                <span className="text-sm">500+ agencies trust us</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <span className="text-yellow-300">★★★★★</span>
                <span className="text-sm">4.9/5 rating</span>
              </div>
              
              <div className="text-sm">
                <span className="font-semibold">99.9%</span> uptime guarantee
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <p className="text-white/70 text-sm max-w-md mx-auto">
            No credit card required. Get full access to all features during your free trial.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;