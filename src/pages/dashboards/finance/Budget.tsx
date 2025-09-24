
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calculator, Plus } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const FinanceBudget = () => {
  const budgetItems = [
    { category: 'Marketing & Advertising', budgeted: 15000, spent: 12500 },
    { category: 'Software & Subscriptions', budgeted: 8000, spent: 7800 },
    { category: 'Salaries & Wages', budgeted: 55000, spent: 54800 },
    { category: 'Office & Utilities', budgeted: 5000, spent: 5200 }, // Over budget
    { category: 'Travel & Entertainment', budgeted: 3000, spent: 1500 },
  ];

  const totalBudgeted = budgetItems.reduce((acc, item) => acc + item.budgeted, 0);
  const totalSpent = budgetItems.reduce((acc, item) => acc + item.spent, 0);

  return (
    <DashboardLayout
      role="finance"
      title="Budget Planning"
      description="Set, track, and manage budgets across all departments."
      headerIcon={<Calculator className="h-8 w-8 text-primary" />}
      headerAction={<Button className="bg-gradient-primary"><Plus className="mr-2 h-4 w-4" /> New Budget Item</Button>}
    >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
                <CardHeader><CardTitle>Total Budget (This Quarter)</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">${totalBudgeted.toLocaleString()}</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Total Spent</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold">${totalSpent.toLocaleString()}</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Remaining Budget</CardTitle></CardHeader>
                <CardContent><p className="text-3xl font-bold text-green-600">${(totalBudgeted - totalSpent).toLocaleString()}</p></CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader><CardTitle>Budget by Category</CardTitle></CardHeader>
            <CardContent className="space-y-6">
                {budgetItems.map(item => {
                    const percentage = (item.spent / item.budgeted) * 100;
                    const isOverBudget = item.spent > item.budgeted;
                    return (
                        <div key={item.category}>
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-semibold">{item.category}</p>
                                <p className={`text-sm font-medium ${isOverBudget ? 'text-red-500' : 'text-muted-foreground'}`}>
                                    ${item.spent.toLocaleString()} / ${item.budgeted.toLocaleString()}
                                </p>
                            </div>
                            <Progress value={isOverBudget ? 100 : percentage} className={isOverBudget ? '[&>*]:bg-red-500' : ''} />
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    </DashboardLayout>
  );
};

export default FinanceBudget;
