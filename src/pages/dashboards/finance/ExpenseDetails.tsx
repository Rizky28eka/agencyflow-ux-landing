import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Receipt, ArrowLeft, Edit, Check, X, FileText, Download, Calendar, DollarSign } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ExpenseDetails = () => {
  const { expenseId } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState({
    id: expenseId || 'EXP-001',
    date: '2024-01-22',
    category: 'Software',
    description: 'Figma Subscription (Annual)',
    amount: 540,
    status: 'Approved',
    submittedBy: 'Mike Chen',
    submittedDate: '2024-01-22',
    approvedBy: 'Finance Manager',
    approvedDate: '2024-01-23',
    paymentMethod: 'Company Credit Card',
    vendor: 'Figma Inc.',
    receiptUrl: '/placeholder-receipt.pdf',
    notes: 'Annual subscription for design team. Includes advanced features and team collaboration tools.',
    tags: ['Design Tools', 'Annual Subscription', 'Team License'],
    project: 'General Operations',
    billable: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    description: expense.description,
    amount: expense.amount,
    category: expense.category,
    notes: expense.notes,
  });

  const handleEdit = () => {
    setExpense(prev => ({ ...prev, ...editForm }));
    setIsEditing(false);
    toast.success('Expense updated successfully!');
  };

  const handleApprove = () => {
    setExpense(prev => ({ ...prev, status: 'Approved', approvedDate: new Date().toISOString().split('T')[0] }));
    toast.success('Expense approved successfully!');
  };

  const handleReject = () => {
    setExpense(prev => ({ ...prev, status: 'Rejected' }));
    toast.success('Expense rejected');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'secondary';
      case 'Pending': return 'default';
      case 'Rejected': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <DashboardLayout
      role="finance"
      title={`Expense ${expense.id}`}
      description={`Details for expense submitted by ${expense.submittedBy}`}
      headerIcon={<Receipt className="h-8 w-8 text-primary" />}
      headerAction={
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/dashboard/finance/expenses')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Expenses
          </Button>
          {expense.status === 'Pending' && (
            <>
              <Button variant="outline" onClick={handleReject}>
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button onClick={handleApprove}>
                <Check className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </>
          )}
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Expense</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Input
                    id="edit-description"
                    value={editForm.description}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-amount">Amount</Label>
                  <Input
                    id="edit-amount"
                    type="number"
                    step="0.01"
                    value={editForm.amount}
                    onChange={(e) => setEditForm(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select value={editForm.category} onValueChange={(value) => setEditForm(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Software">Software</SelectItem>
                      <SelectItem value="Travel">Travel</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-notes">Notes</Label>
                  <Textarea
                    id="edit-notes"
                    value={editForm.notes}
                    onChange={(e) => setEditForm(prev => ({ ...prev, notes: e.target.value }))}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleEdit}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{expense.description}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline">{expense.category}</Badge>
                    <Badge variant={getStatusColor(expense.status)}>{expense.status}</Badge>
                    {expense.billable && <Badge variant="secondary">Billable</Badge>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">${expense.amount.toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground">{expense.date}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Expense Date</p>
                      <p className="font-medium">{expense.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Method</p>
                      <p className="font-medium">{expense.paymentMethod}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Receipt className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Vendor</p>
                      <p className="font-medium">{expense.vendor}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Project</p>
                      <p className="font-medium">{expense.project}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                      <p className="font-medium">{expense.submittedDate}</p>
                    </div>
                  </div>
                  {expense.approvedDate && (
                    <div className="flex items-center space-x-3">
                      <Check className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Approved</p>
                        <p className="font-medium">{expense.approvedDate}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">Notes</h4>
                <p className="text-muted-foreground">{expense.notes}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {expense.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Approval History */}
          <Card>
            <CardHeader>
              <CardTitle>Approval History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Expense Submitted</p>
                    <p className="text-sm text-muted-foreground">
                      By {expense.submittedBy} on {expense.submittedDate}
                    </p>
                  </div>
                </div>
                {expense.status === 'Approved' && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Expense Approved</p>
                      <p className="text-sm text-muted-foreground">
                        By {expense.approvedBy} on {expense.approvedDate}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Receipt */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Receipt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Receipt Preview</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
            </CardContent>
          </Card>

          {/* Expense Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expense ID:</span>
                  <span className="font-mono">{expense.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Submitted By:</span>
                  <span className="font-medium">{expense.submittedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{expense.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Billable:</span>
                  <span className="font-medium">{expense.billable ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Receipt className="mr-2 h-4 w-4" />
                Duplicate Expense
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Export to CSV
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ExpenseDetails;