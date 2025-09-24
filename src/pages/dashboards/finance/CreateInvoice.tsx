
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Plus, Trash2 } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CreateInvoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { timeEntries } = location.state || {};

  const [items, setItems] = useState(timeEntries ? timeEntries.map(t => ({ description: t.task, quantity: t.hours, price: t.rate })) : [{ description: '', quantity: 1, price: 0 }]);

  const handleAddItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <DashboardLayout
      role="finance"
      title="Create Invoice"
      description="Fill in the details to create a new client invoice."
      headerIcon={<FileText className="h-8 w-8 text-primary" />}
    >
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>New Invoice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Client</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select a client" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="techcorp">TechCorp</SelectItem>
                    <SelectItem value="startupxyz">StartupXYZ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Invoice Number</Label>
                <Input defaultValue="INV-0127" />
              </div>
              <div className="space-y-2">
                <Label>Issue Date</Label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input type="date" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Invoice Items</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-24">Quantity</TableHead>
                    <TableHead className="w-32 text-right">Price</TableHead>
                    <TableHead className="w-32 text-right">Total</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell><Input value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} /></TableCell>
                      <TableCell><Input type="number" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))} /></TableCell>
                      <TableCell><Input type="number" value={item.price} className="text-right" onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))} /></TableCell>
                      <TableCell className="text-right font-medium">${(item.quantity * item.price).toFixed(2)}</TableCell>
                      <TableCell><Button variant="ghost" size="icon" onClick={() => handleRemoveItem(index)}><Trash2 className="h-4 w-4" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="outline" size="sm" className="mt-4" onClick={handleAddItem}><Plus className="mr-2 h-4 w-4" /> Add Item</Button>
            </div>

            <div className="flex justify-end">
              <div className="w-full max-w-xs text-right space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => navigate('/dashboard/finance/invoicing')}>Cancel</Button>
                <Button>Save and Send Invoice</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CreateInvoice;
