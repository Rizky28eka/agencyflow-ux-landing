import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Send, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// --- Type Definitions ---
interface Client {
  id: number;
  name: string;
  contact_person: string;
  email: string;
  status: string;
  contract_value: number;
  health: string;
}

const clientFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  contact_person: z.string().min(2, 'Contact person is required'),
  email: z.string().email('Invalid email address'),
  contract_value: z.coerce.number().positive('Contract value must be positive'),
  health: z.string(),
  status: z.string(),
});

type ClientFormData = z.infer<typeof clientFormSchema>;

// --- Main Component ---
const ClientDetails = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const { data: client, isLoading, isError, error } = useQuery<Client>({ 
    queryKey: ['client', clientId], 
    queryFn: () => api.get(`/api/clients/${clientId}`),
    enabled: !!clientId,
  });

  const updateClientMutation = useMutation({
    mutationFn: (updatedClient: ClientFormData) => api.put(`/api/clients/${clientId}`, updatedClient),
    onSuccess: () => {
      toast.success('Client updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client', clientId] });
      setEditDialogOpen(false);
    },
    onError: (err) => toast.error(`Failed to update client: ${err.message}`)
  });

  const deleteClientMutation = useMutation({
    mutationFn: () => api.delete(`/api/clients/${clientId}`),
    onSuccess: () => {
      toast.success('Client deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      navigate('/dashboard/owner/clients');
    },
    onError: (err) => toast.error(`Failed to delete client: ${err.message}`)
  });

  // TODO: Fetch projects and invoices from dedicated endpoints
  const projects: unknown[] = []; 
  const invoices: unknown[] = [];

  if (isLoading) return <DashboardLayout title="Loading Client..." description="Please wait..." headerIcon={<FileText />}><Skeleton className="h-96 w-full" /></DashboardLayout>;
  if (isError) return <DashboardLayout title="Error" description="Failed to load client" headerIcon={<FileText />}><p>{error.message}</p></DashboardLayout>;
  if (!client) return <DashboardLayout title="Not Found" description="Client could not be found" headerIcon={<FileText />}><p>Client not found.</p></DashboardLayout>;

  return (
    <DashboardLayout
      title={client.name}
      description={`Details for client ${client.name}`}
      headerIcon={<FileText className="h-8 w-8 text-primary" />}
      headerAction={
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/dashboard/owner/clients')}><ArrowLeft className="mr-2 h-4 w-4" />Back to Clients</Button>
          <Button onClick={() => setEditDialogOpen(true)}><Edit className="mr-2 h-4 w-4" />Edit Client</Button>
        </div>
      }
    >
      <EditClientDialog isOpen={isEditDialogOpen} onOpenChange={setEditDialogOpen} client={client} mutation={updateClientMutation} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="items-center">
              <Avatar className="w-24 h-24 mb-4"><AvatarFallback className="text-3xl">{client.name.charAt(0)}</AvatarFallback></Avatar>
              <CardTitle className="text-2xl">{client.name}</CardTitle>
              <p className="text-muted-foreground">{client.contact_person}</p>
              <p className="text-muted-foreground">{client.email}</p>
            </CardHeader>
            <CardContent className="text-center space-y-2">
                <Button onClick={() => toast.info(`Sending proposal to ${client.name}...`)}><Send className="mr-2 h-4 w-4" /> Send Proposal</Button>
                <Dialog>
                  <DialogTrigger asChild><Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" />Delete Client</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Are you sure?</DialogTitle></DialogHeader>
                    <p>This action cannot be undone. This will permanently delete the client <strong>{client.name}</strong>.</p>
                    <DialogFooter>
                      <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                      <Button variant="destructive" onClick={() => deleteClientMutation.mutate()} disabled={deleteClientMutation.isPending}>
                        {deleteClientMutation.isPending ? 'Deleting...' : 'Delete'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <Card><CardHeader><CardTitle>Projects (TODO)</CardTitle></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Project</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Budget</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell colSpan={3} className="text-center">No projects for this client.</TableCell></TableRow></TableBody></Table></CardContent></Card>
          <Card><CardHeader><CardTitle>Invoices (TODO)</CardTitle></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell colSpan={4} className="text-center">No invoices for this client.</TableCell></TableRow></TableBody></Table></CardContent></Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

interface UpdateClientMutation {
  isPending: boolean;
  mutate: (updatedClient: ClientFormData) => void;
}

// --- Edit Client Dialog Component ---
const EditClientDialog = ({ isOpen, onOpenChange, client, mutation }: { isOpen: boolean; onOpenChange: (open: boolean) => void; client: Client; mutation: UpdateClientMutation; }) => {
  const form = useForm<ClientFormData>({ resolver: zodResolver(clientFormSchema), defaultValues: client });
  const onSubmit = (data: ClientFormData) => mutation.mutate(data);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Edit Client: {client.name}</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField name="name" control={form.control} render={({ field }) => <FormItem><FormLabel>Client Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField name="contact_person" control={form.control} render={({ field }) => <FormItem><FormLabel>Contact Person</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField name="email" control={form.control} render={({ field }) => <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField name="contract_value" control={form.control} render={({ field }) => <FormItem><FormLabel>Contract Value</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
            <DialogFooter><Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? 'Saving...' : 'Save Changes'}</Button></DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ClientDetails;
