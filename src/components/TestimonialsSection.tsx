import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      content: "AgencyFlow transformed how we manage our creative projects. The client portal alone has improved our client relationships tremendously.",
      author: "Sarah Chen",
      role: "Creative Director",
      company: "PixelStudio",
      avatar: "🎨",
      rating: 5
    },
    {
      content: "Finally, a platform that understands agency workflows. The financial tracking features have given us unprecedented visibility into project profitability.",
      author: "Marcus Rodriguez", 
      role: "Agency Owner",
      company: "BrandCraft",
      avatar: "🚀",
      rating: 5
    },
    {
      content: "Our team productivity has increased by 40% since implementing AgencyFlow. The collaboration tools are intuitive and powerful.",
      author: "Emily Watson",
      role: "Project Manager", 
      company: "CreativeHub",
      avatar: "⭐",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Loved by Creative Teams
            <span className="text-gradient block">Worldwide</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            See why hundreds of agencies trust AgencyFlow to power their creative workflows
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.author}
              className="bg-card rounded-2xl p-8 shadow-premium hover-lift space-y-6 animate-fade-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Rating Stars */}
              <div className="flex space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-lg leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center space-x-4 pt-4 border-t">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-muted-foreground">Agencies Trust Us</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-accent">4.9/5</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">99.9%</div>
            <div className="text-muted-foreground">Uptime Guaranteed</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;