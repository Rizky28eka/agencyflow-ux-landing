import { NavLink, useLocation } from 'react-router-dom';
import { 
  Crown, Users, DollarSign, TrendingUp, Settings, BarChart3, Building, Zap,
  Shield, UserCheck, Calendar, CheckSquare, Clock, Star, Target, Plus,
  FileText, PieChart, CreditCard, Receipt, Calculator, Briefcase,
  Home, LogOut, User, Bell
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const roleNavigation = {
  owner: [
    { 
      title: 'Dashboard Overview', 
      url: '/dashboard/owner', 
      icon: Home, 
      description: 'Main dashboard view' 
    },
    { 
      title: 'Company Analytics', 
      url: '/dashboard/owner/analytics', 
      icon: BarChart3, 
      description: 'Performance metrics' 
    },
    { 
      title: 'Team Management', 
      url: '/dashboard/owner/team', 
      icon: Users, 
      description: 'Manage all team members' 
    },
    { 
      title: 'Financial Overview', 
      url: '/dashboard/owner/finance', 
      icon: DollarSign, 
      description: 'Revenue and expenses' 
    },
    { 
      title: 'Company Settings', 
      url: '/dashboard/owner/settings', 
      icon: Settings, 
      description: 'System configuration' 
    },
  ],
  admin: [
    { 
      title: 'Dashboard Overview', 
      url: '/dashboard/admin', 
      icon: Home, 
      description: 'Main dashboard view' 
    },
    { 
      title: 'User Management', 
      url: '/dashboard/admin/users', 
      icon: Users, 
      description: 'Manage all users' 
    },
    { 
      title: 'Role Permissions', 
      url: '/dashboard/admin/roles', 
      icon: Shield, 
      description: 'Configure access levels' 
    },
    { 
      title: 'System Reports', 
      url: '/dashboard/admin/reports', 
      icon: FileText, 
      description: 'Generate system reports' 
    },
    { 
      title: 'System Settings', 
      url: '/dashboard/admin/settings', 
      icon: Settings, 
      description: 'Platform configuration' 
    },
  ],
  'project-manager': [
    { 
      title: 'Dashboard Overview', 
      url: '/dashboard/project-manager', 
      icon: Home, 
      description: 'Main dashboard view' 
    },
    { 
      title: 'Active Projects', 
      url: '/dashboard/project-manager/projects', 
      icon: Target, 
      description: 'Manage all projects' 
    },
    { 
      title: 'Team Coordination', 
      url: '/dashboard/project-manager/team', 
      icon: Users, 
      description: 'Team assignments' 
    },
    { 
      title: 'Task Management', 
      url: '/dashboard/project-manager/tasks', 
      icon: CheckSquare, 
      description: 'Track project tasks' 
    },
    { 
      title: 'Time Tracking', 
      url: '/dashboard/project-manager/time', 
      icon: Clock, 
      description: 'Monitor work hours' 
    },
    { 
      title: 'Project Reports', 
      url: '/dashboard/project-manager/reports', 
      icon: FileText, 
      description: 'Project analytics' 
    },
  ],
  'team-lead': [
    { 
      title: 'Dashboard Overview', 
      url: '/dashboard/team-lead', 
      icon: Home, 
      description: 'Main dashboard view' 
    },
    { 
      title: 'Team Performance', 
      url: '/dashboard/team-lead/performance', 
      icon: TrendingUp, 
      description: 'Track team metrics' 
    },
    { 
      title: 'Team Members', 
      url: '/dashboard/team-lead/members', 
      icon: Users, 
      description: 'Manage team members' 
    },
    { 
      title: '1-on-1 Meetings', 
      url: '/dashboard/team-lead/meetings', 
      icon: Calendar, 
      description: 'Schedule meetings' 
    },
    { 
      title: 'Task Assignment', 
      url: '/dashboard/team-lead/tasks', 
      icon: CheckSquare, 
      description: 'Assign and track tasks' 
    },
    { 
      title: 'Team Feedback', 
      url: '/dashboard/team-lead/feedback', 
      icon: Star, 
      description: 'Performance reviews' 
    },
  ],
  member: [
    { 
      title: 'Dashboard Overview', 
      url: '/dashboard/member', 
      icon: Home, 
      description: 'Main dashboard view' 
    },
    { 
      title: 'My Tasks', 
      url: '/dashboard/member/tasks', 
      icon: CheckSquare, 
      description: 'View assigned tasks' 
    },
    { 
      title: 'Time Tracking', 
      url: '/dashboard/member/time', 
      icon: Clock, 
      description: 'Log work hours' 
    },
    { 
      title: 'My Projects', 
      url: '/dashboard/member/projects', 
      icon: Target, 
      description: 'Current projects' 
    },
    { 
      title: 'Performance', 
      url: '/dashboard/member/performance', 
      icon: TrendingUp, 
      description: 'View my metrics' 
    },
    { 
      title: 'Team Calendar', 
      url: '/dashboard/member/calendar', 
      icon: Calendar, 
      description: 'Team events' 
    },
  ],
  finance: [
    { 
      title: 'Dashboard Overview', 
      url: '/dashboard/finance', 
      icon: Home, 
      description: 'Main dashboard view' 
    },
    { 
      title: 'Revenue Tracking', 
      url: '/dashboard/finance/revenue', 
      icon: DollarSign, 
      description: 'Monitor income' 
    },
    { 
      title: 'Expense Management', 
      url: '/dashboard/finance/expenses', 
      icon: Receipt, 
      description: 'Track expenses' 
    },
    { 
      title: 'Invoicing', 
      url: '/dashboard/finance/invoicing', 
      icon: FileText, 
      description: 'Manage invoices' 
    },
    { 
      title: 'Financial Reports', 
      url: '/dashboard/finance/reports', 
      icon: PieChart, 
      description: 'Generate reports' 
    },
    { 
      title: 'Budget Planning', 
      url: '/dashboard/finance/budget', 
      icon: Calculator, 
      description: 'Plan budgets' 
    },
  ],
  client: [
    { 
      title: 'Dashboard Overview', 
      url: '/dashboard/client', 
      icon: Home, 
      description: 'Main dashboard view' 
    },
    { 
      title: 'My Projects', 
      url: '/dashboard/client/projects', 
      icon: Briefcase, 
      description: 'View project status' 
    },
    { 
      title: 'Invoices & Billing', 
      url: '/dashboard/client/billing', 
      icon: CreditCard, 
      description: 'Payment information' 
    },
    { 
      title: 'Communication', 
      url: '/dashboard/client/messages', 
      icon: FileText, 
      description: 'Project updates' 
    },
    { 
      title: 'Documents', 
      url: '/dashboard/client/documents', 
      icon: FileText, 
      description: 'Project files' 
    },
    { 
      title: 'Support', 
      url: '/dashboard/client/support', 
      icon: Users, 
      description: 'Get help' 
    },
  ],
};

interface DashboardSidebarProps {
  role: string;
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const navigation = roleNavigation[role as keyof typeof roleNavigation] || [];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building className="h-4 w-4" />
          </div>
          {state === 'expanded' && (
            <div>
              <p className="text-sm font-semibold">AgencyFlow</p>
              <p className="text-xs text-muted-foreground capitalize">{role.replace('-', ' ')}</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={state === 'collapsed' ? item.title : undefined}
                  >
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={state === 'collapsed' ? 'Profile' : undefined}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={state === 'collapsed' ? 'Notifications' : undefined}
                >
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={state === 'collapsed' ? 'Logout' : undefined}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}