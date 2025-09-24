
import { DashboardLayout } from '@/components/DashboardLayout';
import KanbanBoard from '@/components/crm/KanbanBoard';
import { DollarSign } from 'lucide-react';

const stages = [
  { id: 'new-lead', title: 'New Lead' },
  { id: 'contacted', title: 'Contacted' },
  { id: 'proposal', title: 'Proposal Sent' },
  { id: 'won', title: 'Won' },
  { id: 'lost', title: 'Lost' },
];

const leads = [
  { id: 1, name: 'John Doe', company: 'TechCorp', value: 50000, stage: 'proposal' },
  { id: 2, name: 'Jane Smith', company: 'StartupXYZ', value: 75000, stage: 'contacted' },
  { id: 3, name: 'Peter Jones', company: 'RetailCo', value: 25000, stage: 'new-lead' },
  { id: 4, name: 'Susan Williams', company: 'BigCorp', value: 100000, stage: 'won' },
];

const CRM = () => {
  return (
    <DashboardLayout
      role="owner"
      title="Sales CRM"
      description="Manage your sales pipeline and leads."
      headerIcon={<DollarSign className="h-8 w-8 text-primary" />}
    >
      <KanbanBoard stages={stages} leads={leads} />
    </DashboardLayout>
  );
};

export default CRM;
