import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQSection = () => {
  const faqs = [
    {
      question: 'How quickly can we get started with AgencyFlow?',
      answer: 'You can be up and running in under 30 minutes. Our onboarding process is designed to be quick and intuitive, with guided setup for your team, projects, and client portals.'
    },
    {
      question: 'Can clients access their project information directly?',
      answer: 'Absolutely! Each client gets their own branded portal where they can view project progress, provide feedback, approve deliverables, and communicate with your team in real-time.'
    },
    {
      question: 'How does the financial tracking work?',
      answer: 'Our Finance Hub tracks budgets, expenses, and time across all projects. You can generate invoices, monitor profitability, and get detailed financial reports to understand your agency\'s performance.'
    },
    {
      question: 'Is there a limit on team members or projects?',
      answer: 'No limits on our Pro and Enterprise plans. Start with our Free plan for up to 3 team members and 5 projects, then scale as your agency grows.'
    },
    {
      question: 'Can we customize the platform for our agency\'s needs?',
      answer: 'Yes! AgencyFlow offers extensive customization options including custom fields, workflows, branding options for client portals, and integrations with your existing tools.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We offer 24/7 support via chat and email, comprehensive documentation, video tutorials, and personalized onboarding for Enterprise customers.'
    },
    {
      question: 'How secure is our data?',
      answer: 'We use enterprise-grade security with 256-bit SSL encryption, regular backups, SOC 2 compliance, and GDPR compliance. Your data is hosted on secure servers with 99.9% uptime guarantee.'
    },
    {
      question: 'Can we integrate with other tools we already use?',
      answer: 'AgencyFlow integrates with popular tools like Slack, Google Workspace, Adobe Creative Suite, Figma, and many others. We also offer API access for custom integrations.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Frequently Asked
            <span className="text-gradient block">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about AgencyFlow
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-lg shadow-soft border px-6 hover:shadow-premium transition-premium"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 space-y-4">
          <h3 className="text-xl font-semibold">Still have questions?</h3>
          <p className="text-muted-foreground">
            Our team is here to help you get the most out of AgencyFlow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@agencyflow.com"
              className="inline-flex items-center justify-center px-6 py-3 gradient-primary text-primary-foreground rounded-lg font-medium transition-premium shadow-soft hover-lift"
            >
              Contact Support
            </a>
            <a 
              href="#"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-premium"
            >
              Schedule Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;