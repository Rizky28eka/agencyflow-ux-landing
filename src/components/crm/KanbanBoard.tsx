
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LeadCard from './LeadCard';

const KanbanBoard = ({ stages, leads }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {stages.map(stage => (
        <div key={stage.id} className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-semibold mb-4">{stage.title}</h3>
          <div>
            {leads
              .filter(lead => lead.stage === stage.id)
              .map(lead => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
