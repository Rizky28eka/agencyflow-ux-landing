
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { List, Filter } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const AdminAuditLog = () => {
  const auditLog = [
    { event: 'User Login', actor: 'john@agency.com', target: 'Session', ip: '192.168.1.10', timestamp: '2025-09-24 10:00:00' },
    { event: 'Role Updated', actor: 'admin@agency.com', target: 'User: emily@agency.com', ip: '127.0.0.1', timestamp: '2025-09-24 09:30:15' },
    { event: 'Project Deleted', actor: 'sarah@agency.com', target: 'Project: Old Website', ip: '203.0.113.25', timestamp: '2025-09-23 15:12:45' },
    { event: 'User Created', actor: 'admin@agency.com', target: 'User: alex@agency.com', ip: '127.0.0.1', timestamp: '2025-09-23 11:05:00' },
    { event: 'Settings Changed', actor: 'owner@agency.com', target: 'System: Billing', ip: '198.51.100.2', timestamp: '2025-09-22 18:00:23' },
    { event: 'Login Failed', actor: 'unknown', target: 'Session', ip: '10.0.0.5', timestamp: '2025-09-22 14:20:10' },
  ];

  const getEventTypeVariant = (event: string) => {
    if (event.includes('Login') || event.includes('Created')) return 'default';
    if (event.includes('Updated') || event.includes('Changed')) return 'secondary';
    if (event.includes('Deleted')) return 'destructive';
    return 'outline';
  };

  return (
    <DashboardLayout
      role="admin"
      title="Audit Log"
      description="Track all important activities across the system."
      headerIcon={<List className="h-8 w-8 text-primary" />}
    >
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>System Events</CardTitle>
            <div className="flex items-center space-x-2">
              <Input placeholder="Filter by user or target..." className="w-64" />
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLog.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Badge variant={getEventTypeVariant(log.event)}>{log.event}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{log.actor}</TableCell>
                  <TableCell>{log.target}</TableCell>
                  <TableCell className="text-muted-foreground">{log.ip}</TableCell>
                  <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AdminAuditLog;
