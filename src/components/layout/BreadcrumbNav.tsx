import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useLocation } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

export const BreadcrumbNav = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbLabel = (path: string, index: number) => {
    const pathMap: Record<string, string> = {
      'dashboard': 'Dashboard',
      'owner': 'Owner',
      'admin': 'Admin',
      'project-manager': 'Project Manager',
      'team-lead': 'Team Lead',
      'member': 'Member',
      'finance': 'Finance',
      'client': 'Client',
      'analytics': 'Analytics',
      'team': 'Team',
      'settings': 'Settings',
      'billing': 'Billing',
      'goals': 'Goals',
      'reports': 'Reports',
      'clients': 'Clients',
      'crm': 'CRM',
      'users': 'Users',
      'roles': 'Roles',
      'audit-log': 'Audit Log',
      'integrations': 'Integrations',
      'security': 'Security',
      'projects': 'Projects',
      'tasks': 'Tasks',
      'resource-management': 'Resource Management',
      'risk-management': 'Risk Management',
      'time-report': 'Time Reports',
      'approvals': 'Approvals',
      'performance': 'Performance',
      'members': 'Members',
      'development': 'Development',
      'feedback': 'Feedback',
      'one-on-ones': '1-on-1 Meetings',
      'time-management': 'Time Management',
      'time': 'Time Tracking',
      'schedule': 'Schedule',
      'submit-report': 'Submit Report',
      'chat': 'Team Chat',
      'kb': 'Knowledge Base',
      'payroll': 'Payroll',
      'expenses': 'Expenses',
      'invoicing': 'Invoicing',
      'budget': 'Budget',
      'tax': 'Tax',
      'forecasting': 'Forecasting',
      'revenue': 'Revenue',
      'claims': 'Expense Claims',
      'pnl': 'P&L Statement',
      'cash-flow': 'Cash Flow',
      'messages': 'Messages',
      'ai-insights': 'AI Insights',
      'new': 'New',
      'edit': 'Edit'
    };

    // Handle dynamic IDs (numbers or specific patterns)
    if (/^\d+$/.test(path)) {
      return `#${path}`;
    }

    return pathMap[path] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  const buildPath = (index: number) => {
    return '/' + pathnames.slice(0, index + 1).join('/');
  };

  if (pathnames.length === 0) return null;

  return (
    <div className="mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathnames.map((path, index) => {
            const isLast = index === pathnames.length - 1;
            const href = buildPath(index);

            return (
              <div key={path} className="flex items-center">
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{getBreadcrumbLabel(path, index)}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>
                      {getBreadcrumbLabel(path, index)}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};