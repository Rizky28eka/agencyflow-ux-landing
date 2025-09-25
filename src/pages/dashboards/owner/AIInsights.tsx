
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BrainCircuit, Bot, Zap, ShieldAlert, FileText, Lock } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useState } from 'react';

const AIInsights = () => {
  // Mock current plan
  const currentPlan = 'professional'; // 'starter', 'basic', 'professional', 'business', 'enterprise'
  const canUseAI = currentPlan === 'business' || currentPlan === 'enterprise';

  const [risks, setRisks] = useState([]);

  const handleAnalyzeRisks = () => {
    setRisks([
      { description: 'Key developer on Project X has a high workload.', severity: 'High', mitigation: 'Assign a secondary developer to the project.' },
      { description: 'Client Y has a history of late payments.', severity: 'Medium', mitigation: 'Request upfront payment for the next milestone.' },
    ]);
  };

  return (
    <DashboardLayout
      role="owner"
      title="AI-Powered Insights"
      description="Leverage AI to get smart insights and automate tasks."
      headerIcon={<BrainCircuit className="h-8 w-8 text-primary" />}
    >
      <div className="relative">
        {!canUseAI && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg">
                <Lock className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-2xl font-bold mb-2">Upgrade to Unlock AI Insights</h3>
                <p className="text-muted-foreground mb-6">This feature is available on the Business plan and above.</p>
                <Button size="lg" className="bg-gradient-primary">Upgrade Your Plan</Button>
            </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Zap className="mr-2 h-5 w-5" /> AI-Powered Project Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Let AI suggest an optimal project schedule based on your team's availability and historical data.</p>
              <Button disabled={!canUseAI}>Generate Schedule</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><ShieldAlert className="mr-2 h-5 w-5" /> AI-Powered Risk Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Our AI will analyze your projects to identify potential risks and suggest mitigation strategies.</p>
              <Button disabled={!canUseAI} onClick={handleAnalyzeRisks}>Analyze Risks</Button>
              {risks.length > 0 && (
                <div className="mt-4 space-y-2">
                  {risks.map((risk, index) => (
                    <div key={index} className="p-2 bg-muted/50 rounded-lg">
                      <p className="font-semibold">{risk.description}</p>
                      <p className="text-sm text-muted-foreground">Severity: {risk.severity}</p>
                      <p className="text-sm text-muted-foreground">Suggestion: {risk.mitigation}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center"><FileText className="mr-2 h-5 w-5" /> AI-Powered Project Summaries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Automatically generate a summary of any project's progress, status, and team performance.</p>
              <div className="flex gap-4">
                <Input placeholder="Enter project name..." className="flex-1" disabled={!canUseAI} />
                <Button disabled={!canUseAI}>Generate Summary</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIInsights;
