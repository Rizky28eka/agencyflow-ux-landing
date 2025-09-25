import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/DashboardLayout';

const TaskDetails = () => {
  return (
    <DashboardLayout
      role="project-manager"
      title="Task Details"
      description="Detailed view of a task."
    >
      <Card>
        <CardHeader><CardTitle>Task Details</CardTitle></CardHeader>
        <CardContent>
          <p>Details about the task will be displayed here.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default TaskDetails;