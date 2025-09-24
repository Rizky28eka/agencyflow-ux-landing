
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GanttChart = ({ tasks }) => {
  const formattedTasks = tasks.map(task => ({
    ...task,
    range: [new Date(task.startDate).getTime(), new Date(task.endDate).getTime()],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Gantt Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={formattedTasks}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={['dataMin', 'dataMax']} tickFormatter={(time) => new Date(time).toLocaleDateString()} />
            <YAxis type="category" dataKey="name" width={150} />
            <Tooltip 
              labelFormatter={(label) => `Task: ${label}`}
              formatter={(value, name) => [name === 'range' ? `${new Date(value[0]).toLocaleDateString()} - ${new Date(value[1]).toLocaleDateString()}` : value, name]}
            />
            <Legend />
            <Bar dataKey="range" name="Timeline" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GanttChart;
