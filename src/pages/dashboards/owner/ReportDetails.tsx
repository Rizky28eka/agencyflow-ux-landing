
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DashboardLayout } from '@/components/DashboardLayout';
import { FileText, ArrowUp, ArrowDown, DollarSign, BarChart, PieChart } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart as ReBarChart, Pie, PieChart as RePieChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const revenueData = [
  { month: 'Jul', revenue: 18600 },
  { month: 'Aug', revenue: 30500 },
  { month: 'Sep', revenue: 23700 },
];

const costData = [
    { name: 'Salaries', value: 80000, fill: 'var(--color-salaries)' },
    { name: 'Marketing', value: 35000, fill: 'var(--color-marketing)' },
    { name: 'Software', value: 25000, fill: 'var(--color-software)' },
    { name: 'Other', value: 10000, fill: 'var(--color-other)' },
];


const OwnerReportDetails = () => {
  const reportData = {
    title: 'Q3 Business Review',
    dateRange: 'July 1, 2025 - September 30, 2025',
  };

  return (
    <DashboardLayout
      role="owner"
      title={reportData.title}
      description={`Generated for the period: ${reportData.dateRange}`}
      headerIcon={<FileText className="h-8 w-8 text-primary" />}
    >
      <div className="grid gap-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$573,839</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last quarter</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Costs</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$150,392</div>
                    <p className="text-xs text-muted-foreground">+12.5% from last quarter</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">73.8%</div>
                    <p className="text-xs text-muted-foreground">+8.6% from last quarter</p>
                </CardContent>
            </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Revenue Over Time</CardTitle>
                    <CardDescription>Comparison of monthly revenue for Q3.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <ReBarChart data={revenueData}>
                                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`}/>
                                <Tooltip />
                                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </ReBarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Cost Breakdown</CardTitle>
                    <CardDescription>Breakdown of major cost centers for Q3.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ChartContainer
                        config={{
                            salaries: { label: 'Salaries', color: 'hsl(var(--chart-1))' },
                            marketing: { label: 'Marketing', color: 'hsl(var(--chart-2))' },
                            software: { label: 'Software', color: 'hsl(var(--chart-3))' },
                            other: { label: 'Other', color: 'hsl(var(--chart-4))' },
                        }}
                        className="mx-auto aspect-square h-[250px]"
                    >
                        <RePieChart>
                            <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                            <Pie data={costData} dataKey="value" nameKey="name" />
                        </RePieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OwnerReportDetails;
