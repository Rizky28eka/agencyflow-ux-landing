import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Download, Calendar, DollarSign, Receipt, FileText } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const ClientBilling = () => {
  const invoices = [
    { 
      id: 'INV-2024-001', 
      project: 'Website Redesign', 
      amount: 5250, 
      status: 'Paid', 
      dueDate: '2024-01-15',
      paidDate: '2024-01-12'
    },
    { 
      id: 'INV-2024-002', 
      project: 'Mobile App Development', 
      amount: 8500, 
      status: 'Pending', 
      dueDate: '2024-01-30',
      paidDate: null
    },
    { 
      id: 'INV-2023-045', 
      project: 'Brand Identity Package', 
      amount: 3200, 
      status: 'Paid', 
      dueDate: '2023-12-20',
      paidDate: '2023-12-18'
    },
  ];

  const paymentMethods = [
    { type: 'Credit Card', last4: '4242', brand: 'Visa', isDefault: true },
    { type: 'Bank Account', last4: '1234', brand: 'Chase', isDefault: false },
  ];

  return (
    <DashboardLayout
      role="client"
      title="Invoices & Billing"
      description="Manage payments and billing information"
      headerIcon={<CreditCard className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <Download className="mr-2 h-4 w-4" />
          Download All
        </Button>
      }
    >
      {/* Billing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$16,950</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding</CardTitle>
            <Receipt className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$8,500</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid Invoices</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Payment</CardTitle>
            <Calendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Jan 30</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{invoice.id}</h4>
                    <p className="text-sm text-muted-foreground">{invoice.project}</p>
                    <p className="text-xs text-muted-foreground">
                      Due: {invoice.dueDate}
                      {invoice.paidDate && ` • Paid: ${invoice.paidDate}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">${invoice.amount.toLocaleString()}</div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {invoice.status}
                    </div>
                    <div className="flex items-center mt-1">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      {invoice.status === 'Pending' && (
                        <Button size="sm" className="ml-2">
                          <DollarSign className="mr-2 h-4 w-4" />
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map((method, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{method.brand} •••• {method.last4}</h4>
                    <p className="text-sm text-muted-foreground">{method.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {method.isDefault && (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      Default
                    </span>
                  )}
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
            
            <Button className="w-full" variant="outline">
              <CreditCard className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClientBilling;