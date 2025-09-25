import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserPlus, Users, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from 'sonner';

// --- Type Definitions ---
interface Client {
  id: number;
  name: string;
  contact_person: string;
  email: string;
  status: string;
  contract_value: number | null;
  health: string;
}

const clientFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  contact_person: z.string().min(2, 'Contact person is required'),
  email: z.string().email('Invalid email address'),
  contract_value: z.coerce.number().positive('Contract value must be positive').nullable(),
  health: z.string(),
  status: z.string(),
});

type ClientFormData = z.infer<typeof clientFormSchema>;

// --- Main Component ---
const Clients = () => {
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: clients = [], isLoading, isError, error } = useQuery<Client[]>({ 
    queryKey: ['clients'], 
    queryFn: () => api.get('/api/clients')
  });

  const createClientMutation = useMutation({
    mutationFn: (newClient: ClientFormData) => api.post('/api/clients', newClient),
    onSuccess: () => {
      toast.success('Client created successfully!');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setAddDialogOpen(false);
    },
    onError: (err) => toast.error(`Failed to create client: ${err.message}`)
  });

  const renderTableBody = () => {
    if (isLoading) return [...Array(3)].map((_, i) => <TableRow key={i}><TableCell colSpan={6}><Skeleton className="h-8 w-full" /></TableCell></TableRow>);
    if (isError) return <TableRow><TableCell colSpan={6} className="text-center text-red-500">Error: {error.message}</TableCell></TableRow>;
    if (clients.length === 0) return <TableRow><TableCell colSpan={6} className="text-center">No clients found.</TableCell></TableRow>;

    return clients.map((client) => (
      <TableRow key={client.id}>
        <TableCell><div className="flex items-center space-x-3"><Avatar><AvatarFallback>{client.name.charAt(0)}</AvatarFallback></Avatar><span className="font-medium">{client.name}</span></div></TableCell>
        <TableCell>{client.contact_person}</TableCell>
        <TableCell>${client.contract_value?.toLocaleString() || '0'}</TableCell>
        <TableCell><div className="flex items-center gap-2">{client.health === 'Good' ? <Heart className="h-4 w-4 text-green-500"/> : <Shield className="h-4 w-4 text-red-500"/>}{client.health}</div></TableCell>
        <TableCell>{client.status}</TableCell>
        <TableCell className="text-right"><Link to={`/dashboard/owner/clients/${client.id}`}><Button variant="outline" size="sm">View Details</Button></Link></TableCell>
      </TableRow>
    ));
  };

  return (
    <DashboardLayout
      title="Client Management"
      description="Manage all your clients and their projects."
      headerIcon={<Users className="h-8 w-8 text-primary" />}
      headerAction={<Button className="bg-gradient-primary" onClick={() => setAddDialogOpen(true)}><UserPlus className="mr-2 h-4 w-4" />New Client</Button>}
    >
      <AddClientDialog isOpen={isAddDialogOpen} onOpenChange={setAddDialogOpen} mutation={createClientMutation} />
      
      {/* TODO: Fetch these stats from a dedicated API endpoint e.g. /api/clients/stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card><CardHeader><CardTitle>Most Profitable Client</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">StartupXYZ</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Clients at Risk</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">1</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>All Clients</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Client</TableHead><TableHead>Contact Person</TableHead><TableHead>Contract Value</TableHead><TableHead>Health</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>{renderTableBody()}</TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};
;

interface CreateClientMutation {
  isPending: boolean;
  mutate: (newClient: ClientFormData) => void;
}

// --- Add Client Dialog Component ---
const AddClientDialog = ({ isOpen, onOpenChange, mutation }: { isOpen: boolean; onOpenChange: (open: boolean) => void; mutation: CreateClientMutation; }) => {
  const form = useForm<ClientFormData>({ resolver: zodResolver(clientFormSchema), defaultValues: { name: '', contact_person: '', email: '', contract_value: 0, health: 'Good', status: 'Active' } });
  const onSubmit = (data: ClientFormData) => mutation.mutate(data);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Add New Client</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField name="name" control={form.control} render={({ field }) => <FormItem><FormLabel>Client Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField name="contact_person" control={form.control} render={({ field }) => <FormItem><FormLabel>Contact Person</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField name="email" control={form.control} render={({ field }) => <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField name="contract_value" control={form.control} render={({ field }) => <FormItem><FormLabel>Contract Value</FormLabel><FormControl><Input type="number" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>} />
            <DialogFooter><Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? 'Creating...' : 'Create Client'}</Button></DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default Clients;
