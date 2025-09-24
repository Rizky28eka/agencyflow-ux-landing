
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, BrainCircuit } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

const FinanceForecasting = () => {
  const forecastData = [
    { month: 'Oct-23', revenue: 85000, expenses: 65000, type: 'Actual' },
    { month: 'Nov-23', revenue: 88000, expenses: 66000, type: 'Actual' },
    { month: 'Dec-23', revenue: 92000, expenses: 68000, type: 'Actual' },
    { month: 'Jan-24', revenue: 95200, expenses: 70000, type: 'Actual' },
    { month: 'Feb-24', revenue: 98000, expenses: 72000, type: 'Forecast' },
    { month: 'Mar-24', revenue: 101000, expenses: 73000, type: 'Forecast' },
    { month: 'Apr-24', revenue: 105000, expenses: 75000, type: 'Forecast' },
  ];

  return (
    <DashboardLayout
      role="finance"
      title="Financial Forecasting"
      description="Model future financial scenarios based on assumptions."
      headerIcon={<BrainCircuit className="h-8 w-8 text-primary" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-8">
            <Card>
                <CardHeader><CardTitle>Forecasting Assumptions</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="growth">Monthly Growth Rate (%)</Label>
                        <Input id="growth" type="number" defaultValue="3" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-clients">New Clients per Month</Label>
                        <Input id="new-clients" type="number" defaultValue="2" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="churn">Monthly Churn Rate (%)</Label>
                        <Input id="churn" type="number" defaultValue="1" />
                    </div>
                    <Button className="w-full">Recalculate Forecast</Button>
                </CardContent>
            </Card>
        </div>

        {/* Chart & Table */}
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader><CardTitle>Revenue vs. Expenses Forecast</CardTitle></CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-80 w-full">
                        <LineChart data={forecastData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis tickFormatter={(val) => `$${val/1000}k`} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue" />
                            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Forecast Data</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Month</TableHead><TableHead>Revenue</TableHead><TableHead>Expenses</TableHead><TableHead>Net Profit</TableHead><TableHead>Type</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {forecastData.map(d => (
                                <TableRow key={d.month}>
                                    <TableCell>{d.month}</TableCell>
                                    <TableCell>${d.revenue.toLocaleString()}</TableCell>
                                    <TableCell>${d.expenses.toLocaleString()}</TableCell>
                                    <TableCell className="font-semibold">${(d.revenue - d.expenses).toLocaleString()}</TableCell>
                                    <TableCell>{d.type}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinanceForecasting;
