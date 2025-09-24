
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LeadCard = ({ lead }) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h4 className="font-semibold">{lead.name}</h4>
        <p className="text-sm text-muted-foreground">{lead.company}</p>
        <p className="text-sm font-bold mt-2">${lead.value.toLocaleString()}</p>
      </CardContent>
    </Card>
  );
};

export default LeadCard;
