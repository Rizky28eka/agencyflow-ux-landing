import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { hasPermission, getRoleDisplayName } from '@/lib/rolePermissions';
import { 
  Crown, Users, DollarSign, TrendingUp, Settings, BarChart3, Building, Zap,
  Shield, UserCheck, Calendar, CheckSquare, Clock, Star, Target, Plus,
  FileText, PieChart, CreditCard, Receipt, Calculator, Briefcase,
  Home, LogOut, User, Bell, List, Share2, AlertTriangle, Banknote, MessageSquare, BrainCircuit,
  Trophy, Award, Book, Handshake
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { NotificationList } from './NotificationList';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Role } from '@/lib/rolePermissions';
import { usePlan } from '@/hooks/use-plan';

const roleNavigation = {
  owner: [
    { title: 'Dashboard', url: '/dashboard/owner', icon: Home },
    { title: 'Analytics', url: '/dashboard/owner/analytics', icon: BarChart3 },
    { title: 'Team', url: '/dashboard/owner/team', icon: Users },
    { title: 'Clients', url: '/dashboard/owner/clients', icon: Handshake },
    { title: 'CRM', url: '/dashboard/owner/crm', icon: Users },
    { title: 'Finance', url: '/dashboard/owner/finance', icon: DollarSign },
    { title: 'Goal Tracking', url: '/dashboard/owner/goals', icon: Target },
    { title: 'Billing & Plan', url: '/billing', icon: CreditCard },
    { title: 'Settings', url: '/dashboard/owner/settings', icon: Settings },
    { title: 'Advanced Reports', url: '/dashboard/owner/reports', icon: FileText },
    { title: 'AI Insights', url: '/dashboard/owner/ai-insights', icon: BrainCircuit },
  ],
  admin: [
    { title: 'Dashboard', url: '/dashboard/admin', icon: Home },
    { title: 'Users', url: '/dashboard/admin/users', icon: Users },
    { title: 'Roles', url: '/dashboard/admin/roles', icon: Shield },
    { title: 'Reports', url: '/dashboard/admin/reports', icon: FileText },
    { title: 'Audit Log', url: '/dashboard/admin/audit-log', icon: List },
    { title: 'Integrations', url: '/dashboard/admin/integrations', icon: Share2 },
    { title: 'Security', url: '/dashboard/admin/security', icon: Shield },
    { title: 'Settings', url: '/dashboard/admin/settings', icon: Settings },
  ],
  'project-manager': [
    { title: 'Dashboard', url: '/dashboard/project-manager', icon: Home },
    { title: 'Projects', url: '/dashboard/project-manager/projects', icon: Briefcase },
    { title: 'All Tasks', url: '/dashboard/project-manager/tasks', icon: CheckSquare },
    { title: 'Resource Mgmt', url: '/dashboard/project-manager/resource-management', icon: Users },
    { title: 'Risk Mgmt', url: '/dashboard/project-manager/risk-management', icon: AlertTriangle },
    { title: 'Time Reports', url: '/dashboard/project-manager/time-report', icon: Clock },
    { title: 'Team Coordination', url: '/dashboard/project-manager/team', icon: UserCheck },
  ],
  member: [
    { title: 'Dashboard', url: '/dashboard/member', icon: Home },
    { title: 'My Tasks', url: '/dashboard/member/tasks', icon: CheckSquare },
    { title: 'Time Tracking', url: '/dashboard/member/time', icon: Clock },
    { title: 'Schedule', url: '/dashboard/member/schedule', icon: Calendar },
    { title: 'Submit Report', url: '/dashboard/member/submit-report', icon: FileText },
    { title: 'Team Chat', url: '/dashboard/member/chat', icon: MessageSquare },
    { title: 'Knowledge Base', url: '/dashboard/member/kb', icon: Book },
    { title: 'Settings', url: '/dashboard/member/settings', icon: Settings },
  ],
  'team-lead': [
    { title: 'Dashboard', url: '/dashboard/team-lead', icon: Home },
    { title: 'Approvals', url: '/dashboard/team-lead/approvals', icon: UserCheck },
    { title: 'Team Performance', url: '/dashboard/team-lead/performance', icon: TrendingUp },
    { title: 'Team Members', url: '/dashboard/team-lead/members', icon: Users },
    { title: '1-on-1 Meetings', url: '/dashboard/team-lead/one-on-ones', icon: Calendar },
    { title: 'Task Assignment', url: '/dashboard/team-lead/tasks', icon: CheckSquare },
    { title: 'Development', url: '/dashboard/team-lead/development', icon: Star },
    { title: 'Feedback', url: '/dashboard/team-lead/feedback', icon: MessageSquare },
    { title: 'Time Mgmt', url: '/dashboard/team-lead/time-management', icon: Clock },
  ],
  finance: [
    { title: 'Dashboard', url: '/dashboard/finance', icon: Home },
    { title: 'Payroll', url: '/dashboard/finance/payroll', icon: Banknote },
    { title: 'Revenue Tracking', url: '/dashboard/finance/revenue', icon: DollarSign },
    { title: 'Expense Management', url: '/dashboard/finance/expenses', icon: Receipt },
    { title: 'Expense Claims', url: '/dashboard/finance/claims', icon: UserCheck },
    { title: 'Invoicing', url: '/dashboard/finance/invoicing', icon: FileText },
    { title: 'Financial Reports', url: '/dashboard/finance/reports', icon: PieChart },
    { title: 'Forecasting', url: '/dashboard/finance/forecasting', icon: BrainCircuit },
    { title: 'Budget Planning', url: '/dashboard/finance/budget', icon: Calculator },
    { title: 'Tax Calculations', url: '/dashboard/finance/tax', icon: Calculator },
    { title: 'P&L Statement', url: '/dashboard/finance/pnl', icon: BarChart3 },
    { title: 'Cash Flow', url: '/dashboard/finance/cash-flow', icon: TrendingUp },
  ],
  client: [
    { title: 'Dashboard', url: '/dashboard/client', icon: Home },
    { title: 'My Projects', url: '/dashboard/client/projects', icon: Briefcase },
    { title: 'Invoices & Billing', url: '/dashboard/client/billing', icon: CreditCard },
    { title: 'Communication', url: '/dashboard/client/messages', icon: FileText },
    { title: 'Settings', url: '/dashboard/client/settings', icon: Settings },
    { title: 'Custom Reports', url: '/dashboard/client/reports', icon: FileText },
  ],
};

interface DashboardSidebarProps {
  role: string;
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const { state, isMobile, toggleSidebar } = useSidebar();
  const { user } = useAuth();
  const { plan } = usePlan();
  const location = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const navigation = roleNavigation[role as keyof typeof roleNavigation] || [];
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = async () => {
    try {
      // Mock logout - in production this would use real auth
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      toast({
        title: "Signed out",
        description: "You've been successfully logged out.",
      });
      
      navigate('/auth');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "An unknown error occurred.",
          variant: "destructive"
        });
      }
    }
  };
  
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
              <p className="text-xs text-muted-foreground">{user ? getRoleDisplayName(user.role) : role.replace('-', ' ')}</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                if (item.url.includes('ai-insights') && !['business', 'enterprise'].includes(plan)) {
                    return null;
                }

                return (
                <SidebarMenuItem key={item.url}>
                  {/* Only show navigation items the user has permission for */}
                  {user && hasPermission(user.role, getResourceFromUrl(item.url), 'read') ? (
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
                  ) : null}
                </SidebarMenuItem>
              )})}
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
                <Popover>
                  <PopoverTrigger asChild>
                    <SidebarMenuButton
                      tooltip={state === 'collapsed' ? 'Notifications' : undefined}
                      className="relative"
                    >
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                      <Badge className="absolute top-1 right-1 h-4 w-4 p-0 flex items-center justify-center text-xs">2</Badge>
                    </SidebarMenuButton>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" side="right" align="start">
                    <NotificationList />
                  </PopoverContent>
                </Popover>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
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

// Helper function to extract resource from URL
const getResourceFromUrl = (url: string): string => {
  if (url.includes('/analytics')) return 'analytics';
  if (url.includes('/team')) return 'team';
  if (url.includes('/finance')) return 'finance';
  if (url.includes('/settings')) return 'settings';
  if (url.includes('/billing')) return 'billing';
  if (url.includes('/goals')) return 'goals';
  if (url.includes('/users')) return 'users';
  if (url.includes('/roles')) return 'roles';
  if (url.includes('/audit')) return 'audit';
  if (url.includes('/projects')) return 'projects';
  if (url.includes('/tasks')) return 'tasks';
  if (url.includes('/approvals')) return 'approvals';
  if (url.includes('/performance')) return 'performance';
  if (url.includes('/time')) return 'time';
  if (url.includes('/reports')) return 'reports';
  if (url.includes('/messages')) return 'messages';
  if (url.includes('/schedule')) return 'schedule';
  if (url.includes('/submit-report')) return 'reports';
  if (url.includes('/chat')) return 'chat';
  if (url.includes('/ai-insights')) return 'ai-insights';
  if (url.includes('/clients')) return 'clients';
  if (url.includes('/crm')) return 'crm';
  if (url.includes('/kb')) return 'knowledge';
  if (url.includes('/security')) return 'security';
  if (url.includes('/integrations')) return 'integrations';
  if (url.includes('/payroll')) return 'payroll';
  if (url.includes('/expenses')) return 'expenses';
  if (url.includes('/invoicing')) return 'invoicing';
  if (url.includes('/budget')) return 'budget';
  if (url.includes('/tax')) return 'tax';
  if (url.includes('/forecasting')) return 'forecasting';
  if (url.includes('/revenue')) return 'revenue';
  if (url.includes('/claims')) return 'claims';
  if (url.includes('/pnl')) return 'finance';
  if (url.includes('/cash-flow')) return 'finance';
  
  return 'dashboard'; // Default resource
};