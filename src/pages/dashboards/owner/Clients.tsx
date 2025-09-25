
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserPlus, MoreHorizontal, Users, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';

const Clients = () => {
  const clients = [
    { id: 1, name: 'TechCorp', contact: 'John Doe', email: 'john.doe@techcorp.com', status: 'Active', contractValue: 150000, health: 'Good' },
    { id: 2, name: 'StartupXYZ', contact: 'Jane Smith', email: 'jane.smith@startup.xyz', status: 'Active', contractValue: 250000, health: 'At Risk' },
    { id: 3, name: 'RetailCo', contact: 'Peter Jones', email: 'peter.jones@retailco.com', status: 'Inactive', contractValue: 50000, health: 'Good' },
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
            <CardHeader><CardTitle>Most Profitable Client</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold">StartupXYZ</p></CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Clients at Risk</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold">1</p></CardContent>
        </Card>
      </div>

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
                <TableHead>Contract Value</TableHead>
                <TableHead>Health</TableHead>
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
                  <TableCell>${client.contractValue.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        {client.health === 'Good' ? <Heart className="h-4 w-4 text-green-500"/> : <Shield className="h-4 w-4 text-red-500"/>}
                        {client.health}
                    </div>
                  </TableCell>
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
