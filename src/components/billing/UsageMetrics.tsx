import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, Database, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface UsageData {
  projects: { current: number; limit: number };
  teamMembers: { current: number; limit: number };
  storage: { current: number; limit: number; unit: string };
  apiCalls: { current: number; limit: number };
}

interface UsageMetricsProps {
  usage: UsageData;
  planName: string;
}

export const UsageMetrics = ({ usage, planName }: UsageMetricsProps) => {
  const usageHistory = [
    { month: 'Oct', projects: 8, members: 18, storage: 45 },
    { month: 'Nov', projects: 12, members: 20, storage: 52 },
    { month: 'Dec', projects: 15, members: 22, storage: 58 },
    { month: 'Jan', projects: 18, members: 24, storage: 65 },
  ];

  const getUsagePercentage = (current: number, limit: number) =>
    limit === -1 ? 0 : (current / limit) * 100;

  const getUsageStatus = (percentage: number) => {
    if (percentage >= 90) return { color: 'text-red-600', bg: 'bg-red-100', status: 'Critical' };
    if (percentage >= 75) return { color: 'text-yellow-600', bg: 'bg-yellow-100', status: 'Warning' };
    return { color: 'text-green-600', bg: 'bg-green-100', status: 'Good' };
  };

  const usageItems = [
    {
      icon: <Briefcase className="h-5 w-5" />,
      label: 'Active Projects',
      current: usage.projects.current,
      limit: usage.projects.limit,
      unit: 'projects',
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: 'Team Members',
      current: usage.teamMembers.current,
      limit: usage.teamMembers.limit,
      unit: 'members',
    },
    {
      icon: <Database className="h-5 w-5" />,
      label: 'Storage Used',
      current: usage.storage.current,
      limit: usage.storage.limit,
      unit: usage.storage.unit,
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: 'API Calls',
      current: usage.apiCalls.current,
      limit: usage.apiCalls.limit,
      unit: 'calls/month',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Current Usage Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg sm:text-xl font-semibold">
            <TrendingUp className="mr-2 h-5 w-5" />
            Current Usage – {planName} Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {usageItems.map((item, index) => {
              const percentage = getUsagePercentage(item.current, item.limit);
              const status = getUsageStatus(percentage);
              const isUnlimited = item.limit === -1;

              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm sm:text-base">
                        {item.current.toLocaleString()} {isUnlimited ? item.unit : `/ ${item.limit.toLocaleString()} ${item.unit}`}
                      </div>
                      {!isUnlimited && percentage >= 75 && (
                        <Badge
                          variant="outline"
                          className={`${status.color} ${status.bg} text-xs font-medium`}
                        >
                          {status.status}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {!isUnlimited && (
                    <div className="space-y-1">
                      <Progress
                        value={percentage}
                        className={`h-2 rounded-full ${percentage >= 90 ? '[&>*]:bg-red-500' : percentage >= 75 ? '[&>*]:bg-yellow-500' : ''}`}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{percentage.toFixed(1)}% used</span>
                        <span>{(item.limit - item.current).toLocaleString()} remaining</span>
                      </div>
                    </div>
                  )}

                  {isUnlimited && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">Unlimited</Badge>
                      <span>No limits on this plan</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Usage Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold">Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full overflow-x-auto">
            <ChartContainer config={{}} className="h-full w-full min-w-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="projects" stroke="#3b82f6" strokeWidth={2} name="Projects" />
                  <Line type="monotone" dataKey="members" stroke="#8b5cf6" strokeWidth={2} name="Team Members" />
                  <Line type="monotone" dataKey="storage" stroke="#10b981" strokeWidth={2} name="Storage (GB)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Usage Alerts */}
      {usageItems.some(item => getUsagePercentage(item.current, item.limit) >= 75) && (
        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800 text-lg sm:text-xl font-semibold">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Usage Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {usageItems
                .filter(item => getUsagePercentage(item.current, item.limit) >= 75)
                .map((item, index) => {
                  const percentage = getUsagePercentage(item.current, item.limit);
                  return (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg bg-background gap-3"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-lg bg-yellow-100 flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-muted-foreground">
                            {percentage.toFixed(1)}% of limit reached
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Upgrade Plan
                      </Button>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};