import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Banknote, ArrowLeft, Download, Edit, DollarSign, Calendar, Clock, FileText, Calculator } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const PayrollDetails = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  // Mock data based on employeeId
  const employeeData = {
    'EMP-001': {
      id: 'EMP-001',
      name: 'Sarah Johnson',
      role: 'Project Manager',
      email: 'sarah@agency.com',
      avatar: '/placeholder.svg',
      employeeId: 'EMP-001',
      department: 'Operations',
      hireDate: '2023-03-15',
      payrollInfo: {
        baseSalary: 7500,
        overtime: 450,
        bonus: 1000,
        deductions: {
          taxes: 1890,
          insurance: 250,
          retirement: 375,
        },
        netPay: 6435,
        payPeriod: 'January 1-31, 2024',
        payDate: '2024-01-31',
        status: 'Processed',
      },
      timeTracking: {
        regularHours: 160,
        overtimeHours: 9,
        totalHours: 169,
        hourlyRate: 46.88,
      },
      benefits: [
        { name: 'Health Insurance', amount: 150, type: 'Deduction' },
        { name: 'Dental Insurance', amount: 50, type: 'Deduction' },
        { name: 'Vision Insurance', amount: 25, type: 'Deduction' },
        { name: 'Life Insurance', amount: 25, type: 'Deduction' },
        { name: '401(k) Contribution', amount: 375, type: 'Deduction' },
      ],
      payHistory: [
        { period: 'December 2023', grossPay: 8200, netPay: 6150, status: 'Paid' },
        { period: 'November 2023', grossPay: 7950, netPay: 5985, status: 'Paid' },
        { period: 'October 2023', grossPay: 7500, netPay: 5625, status: 'Paid' },
      ]
    },
    'EMP-002': {
      id: 'EMP-002',
      name: 'Mike Chen',
      role: 'Lead Designer',
      email: 'mike@agency.com',
      avatar: '/placeholder.svg',
      employeeId: 'EMP-002',
      department: 'Design',
      hireDate: '2023-06-20',
      payrollInfo: {
        baseSalary: 6800,
        overtime: 0,
        bonus: 500,
        deductions: {
          taxes: 1460,
          insurance: 250,
          retirement: 340,
        },
        netPay: 5750,
        payPeriod: 'January 1-31, 2024',
        payDate: '2024-01-31',
        status: 'Processed',
      },
      timeTracking: {
        regularHours: 160,
        overtimeHours: 0,
        totalHours: 160,
        hourlyRate: 42.50,
      },
      benefits: [
        { name: 'Health Insurance', amount: 150, type: 'Deduction' },
        { name: 'Dental Insurance', amount: 50, type: 'Deduction' },
        { name: 'Vision Insurance', amount: 25, type: 'Deduction' },
        { name: 'Life Insurance', amount: 25, type: 'Deduction' },
        { name: '401(k) Contribution', amount: 340, type: 'Deduction' },
      ],
      payHistory: [
        { period: 'December 2023', grossPay: 7300, netPay: 5475, status: 'Paid' },
        { period: 'November 2023', grossPay: 6800, netPay: 5100, status: 'Paid' },
        { period: 'October 2023', grossPay: 6800, netPay: 5100, status: 'Paid' },
      ]
    }
  };

  const [employee] = useState({
    ...(employeeData[employeeId as keyof typeof employeeData] || employeeData['EMP-001'])
  });

  const [editSalary, setEditSalary] = useState(employee.payrollInfo.baseSalary);

  const handleUpdateSalary = () => {
    toast.success('Salary updated successfully!');
  };

  const handleGeneratePayslip = () => {
    toast.success('Payslip generated and sent to employee!');
  };

  const totalDeductions = Object.values(employee.payrollInfo.deductions).reduce((sum, amount) => sum + amount, 0);
  const grossPay = employee.payrollInfo.baseSalary + employee.payrollInfo.overtime + employee.payrollInfo.bonus;

  return (
    <DashboardLayout
      role="finance"
      title={`Payroll - ${employee.name}`}
      description={`Payroll details for ${employee.payrollInfo.payPeriod}`}
      headerIcon={<Banknote className="h-8 w-8 text-primary" />}
      headerAction={
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/dashboard/finance/payroll')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Payroll
          </Button>
          <Button variant="outline" onClick={handleGeneratePayslip}>
            <Download className="mr-2 h-4 w-4" />
            Generate Payslip
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Edit Salary
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Base Salary</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="new-salary">New Base Salary</Label>
                  <Input
                    id="new-salary"
                    type="number"
                    value={editSalary}
                    onChange={(e) => setEditSalary(parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="effective-date">Effective Date</Label>
                  <Input id="effective-date" type="date" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleUpdateSalary}>Update Salary</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Employee Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={employee.avatar} alt={employee.name} />
                <AvatarFallback className="text-2xl">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{employee.name}</CardTitle>
              <p className="text-muted-foreground">{employee.role}</p>
              <Badge variant="secondary">{employee.payrollInfo.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Employee ID:</span>
                  <span className="font-mono">{employee.employeeId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-medium">{employee.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hire Date:</span>
                  <span className="font-medium">{employee.hireDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pay Date:</span>
                  <span className="font-medium">{employee.payrollInfo.payDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time Tracking Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Time Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Regular Hours:</span>
                <span className="font-medium">{employee.timeTracking.regularHours}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overtime Hours:</span>
                <span className="font-medium">{employee.timeTracking.overtimeHours}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Hours:</span>
                <span className="font-bold">{employee.timeTracking.totalHours}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hourly Rate:</span>
                <span className="font-medium">${employee.timeTracking.hourlyRate}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payroll Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5" />
                Payroll Breakdown - {employee.payrollInfo.payPeriod}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Earnings */}
                <div>
                  <h4 className="font-semibold mb-3">Earnings</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Base Salary</span>
                      <span className="font-medium">${employee.payrollInfo.baseSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overtime Pay</span>
                      <span className="font-medium">${employee.payrollInfo.overtime.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bonus</span>
                      <span className="font-medium">${employee.payrollInfo.bonus.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Gross Pay</span>
                      <span>${grossPay.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Deductions */}
                <div>
                  <h4 className="font-semibold mb-3">Deductions</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Federal & State Taxes</span>
                      <span className="font-medium">${employee.payrollInfo.deductions.taxes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Health Insurance</span>
                      <span className="font-medium">${employee.payrollInfo.deductions.insurance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>401(k) Contribution</span>
                      <span className="font-medium">${employee.payrollInfo.deductions.retirement.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total Deductions</span>
                      <span>${totalDeductions.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Net Pay */}
                <div className="bg-primary/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Net Pay</span>
                    <span className="text-2xl font-bold text-primary">
                      ${employee.payrollInfo.netPay.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Benefits & Deductions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Benefit</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employee.benefits.map((benefit, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{benefit.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{benefit.type}</Badge>
                      </TableCell>
                      <TableCell className="text-right">${benefit.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pay History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Pay History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pay Period</TableHead>
                    <TableHead>Gross Pay</TableHead>
                    <TableHead>Net Pay</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employee.payHistory.map((pay, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{pay.period}</TableCell>
                      <TableCell>${pay.grossPay.toLocaleString()}</TableCell>
                      <TableCell>${pay.netPay.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{pay.status}</Badge>
                      </TableCell>
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

export default PayrollDetails;
    },