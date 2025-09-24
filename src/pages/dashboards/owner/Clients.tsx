
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserPlus, MoreHorizontal, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';

const Clients = () => {
  const clients = [
    { id: 1, name: 'TechCorp', contact: 'John Doe', email: 'john.doe@techcorp.com', status: 'Active' },
    { id: 2, name: 'StartupXYZ', contact: 'Jane Smith', email: 'jane.smith@startup.xyz', status: 'Active' },
    { id: 3, name: 'RetailCo', contact: 'Peter Jones', email: 'peter.jones@retailco.com', status: 'Inactive' },
  ];

  return (
    <DashboardLayout
      role="owner"
      title="Client Management"
      description="Manage all your clients and their projects."
      headerIcon={<Users className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <UserPlus className="mr-2 h-4 w-4" />
          New Client
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>All Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{client.contact}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.status}</TableCell>
                  <TableCell className="text-right">
                    <Link to={`/dashboard/owner/clients/${client.id}`}>
                      <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Clients;
