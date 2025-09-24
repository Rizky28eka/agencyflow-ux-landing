import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, Users, MessageSquare, FileText, Eye } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';

const ClientProjects = () => {
  const projects = [
    { 
      name: 'Website Redesign', 
      status: 'In Progress', 
      progress: 75, 
      startDate: '2024-01-01',
      expectedCompletion: '2024-02-15',
      teamSize: 5,
      lastUpdate: '2 hours ago'
    },
    { 
      name: 'Mobile App Development', 
      status: 'Planning', 
      progress: 25, 
      startDate: '2024-01-15',
      expectedCompletion: '2024-03-20',
      teamSize: 8,
      lastUpdate: '1 day ago'
    },
    { 
      name: 'Brand Identity Package', 
      status: 'Review', 
      progress: 90, 
      startDate: '2023-12-01',
      expectedCompletion: '2024-01-30',
      teamSize: 3,
      lastUpdate: '3 hours ago'
    },
  ];

  return (
    <DashboardLayout
      role="client"
      title="My Projects"
      description="View project status and progress"
      headerIcon={<Briefcase className="h-8 w-8 text-primary" />}
      headerAction={
        <Button className="bg-gradient-primary">
          <MessageSquare className="mr-2 h-4 w-4" />
          Contact Team
        </Button>
      }
    >
      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            <Briefcase className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Team Members</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">16</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Progress</CardTitle>
            <Calendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">63%</div>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">Last updated: {project.lastUpdate}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    project.status === 'Review' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status}
                  </span>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{project.progress}% Complete</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Start Date</p>
                    <p className="text-muted-foreground">{project.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Expected Completion</p>
                    <p className="text-muted-foreground">{project.expectedCompletion}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Team Size</p>
                    <p className="text-muted-foreground">{project.teamSize} members</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button size="sm" className="flex-1">
                  <FileText className="mr-2 h-4 w-4" />
                  View Deliverables
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ClientProjects;