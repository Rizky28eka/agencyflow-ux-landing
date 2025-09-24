
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const FinanceRevenue = () => {
  const revenueByMonth = [
    { month: 'Oct-23', revenue: 85000 },
    { month: 'Nov-23', revenue: 88000 },
    { month: 'Dec-23', revenue: 92000 },
    { month: 'Jan-24', revenue: 95200 },
  ];

  const revenueSources = [
    { source: 'Project A Retainer', mrr: 15000, type: 'Recurring' },
    { source: 'Project B Milestone', mrr: 25000, type: 'One-time' },
    { source: 'Project C Retainer', mrr: 20000, type: 'Recurring' },
    { source: 'New Client X', mrr: 35200, type: 'One-time' },
  ];

  return (
    <DashboardLayout
      role="finance"
      title="Revenue Tracking"
      description="Monitor and analyze all incoming revenue streams."
      headerIcon={<DollarSign className="h-8 w-8 text-primary" />}
    >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
                <CardHeader><CardTitle>MRR (Monthly Recurring)</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">$35,000</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>One-Time Revenue (This Month)</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">$60,200</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>YTD Revenue</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">$1,345,700</p></CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader><CardTitle className="flex items-center"><TrendingUp className="mr-2"/>Monthly Revenue</CardTitle></CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-80 w-full">
                        <BarChart data={revenueByMonth}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" />
                            <YAxis tickFormatter={(val) => `$${val/1000}k`} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Top Revenue Sources (This Month)</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Source</TableHead><TableHead>Type</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {revenueSources.map((s, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">{s.source}</TableCell>
                                    <TableCell>{s.type}</TableCell>
                                    <TableCell className="text-right">${s.mrr.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </DashboardLayout>
  );
};

export default FinanceRevenue;
