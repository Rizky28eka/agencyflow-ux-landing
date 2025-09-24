
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Download, FileText } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const FinanceReports = () => {
  const reports = [
    { title: 'Profit & Loss Statement', description: 'Analyze profitability over a selected period.' },
    { title: 'Balance Sheet', description: 'A snapshot of the company’s financial health.' },
    { title: 'Cash Flow Statement', description: 'Track the movement of cash in and out of the company.' },
    { title: 'Expense by Category', description: 'Breakdown of all expenses by category.' },
  ];

  return (
    <DashboardLayout
      role="finance"
      title="Financial Reports"
      description="Generate and download detailed financial reports."
      headerIcon={<PieChart className="h-8 w-8 text-primary" />}
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map(report => (
                <Card key={report.title}>
                    <CardHeader>
                        <CardTitle className="flex items-center"><FileText className="mr-2"/>{report.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{report.description}</CardDescription>
                        <Button className="mt-4"><Download className="mr-2 h-4 w-4"/> Generate Report</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    </DashboardLayout>
  );
};

export default FinanceReports;
