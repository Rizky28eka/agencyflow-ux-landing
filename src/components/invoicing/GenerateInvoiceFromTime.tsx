
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

const timeEntries = [
  { id: 1, user: 'Alice Johnson', task: 'Design homepage mockup', hours: 25.5, rate: 100 },
  { id: 2, user: 'Bob Williams', task: 'Implement user auth', hours: 40, rate: 100 },
  { id: 3, user: 'Charlie Brown', task: 'Fix responsive issues', hours: 15, rate: 100 },
];

export const GenerateInvoiceFromTime = ({ isOpen, onOpenChange }) => {
  const navigate = useNavigate();
  const totalHours = timeEntries.reduce((acc, entry) => acc + entry.hours, 0);
  const totalAmount = timeEntries.reduce((acc, entry) => acc + entry.hours * entry.rate, 0);

  const handleGenerate = () => {
    navigate('/dashboard/finance/invoicing/new', { state: { timeEntries } });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Generate Invoice from Time Entries</DialogTitle>
          <DialogDescription>
            Select a project and date range to generate an invoice from logged time.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Project</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select a project" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="website-redesign">Website Redesign</SelectItem>
                  <SelectItem value="mobile-app">Mobile App</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input type="date" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Time Entries</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Member</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead className="text-right">Hours</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.user}</TableCell>
                    <TableCell>{entry.task}</TableCell>
                    <TableCell className="text-right">{entry.hours.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${entry.rate.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${(entry.hours * entry.rate).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end">
            <div className="w-full max-w-xs text-right space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Total Hours:</span>
                <span>{totalHours.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleGenerate}>Generate Invoice</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
