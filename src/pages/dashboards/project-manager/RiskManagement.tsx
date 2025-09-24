
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertTriangle, Plus, MoreHorizontal } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const RiskManagement = () => {
  const risks = [
    {
      id: 'RISK-001',
      description: 'Key developer might leave mid-project.',
      project: 'Mobile App Development',
      impact: 'High',
      probability: 'Medium',
      status: 'Open',
    },
    {
      id: 'RISK-002',
      description: 'Client may request significant scope changes.',
      project: 'Website Redesign',
      impact: 'Medium',
      probability: 'High',
      status: 'Mitigated',
    },
    {
      id: 'RISK-003',
      description: 'Third-party API may have reliability issues.',
      project: 'E-commerce Platform',
      impact: 'High',
      probability: 'Low',
      status: 'Open',
    },
    {
      id: 'RISK-004',
      description: 'Budget overrun due to unforeseen hardware costs.',
      project: 'Mobile App Development',
      impact: 'Medium',
      probability: 'Medium',
      status: 'Closed',
    },
  ];

  const getBadgeVariant = (level: string) => {
    switch (level) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout
      role="project-manager"
      title="Risk Management"
      description="Identify, assess, and mitigate project risks."
      headerIcon={<AlertTriangle className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add New Risk
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Risk Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {risks.map((risk) => (
                <TableRow key={risk.id}>
                  <TableCell className="font-medium">{risk.id}</TableCell>
                  <TableCell>{risk.description}</TableCell>
                  <TableCell className="text-muted-foreground">{risk.project}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(risk.impact)}>{risk.impact}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(risk.probability)}>{risk.probability}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={risk.status === 'Open' ? 'default' : 'outline'}>{risk.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Edit Risk</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default RiskManagement;
