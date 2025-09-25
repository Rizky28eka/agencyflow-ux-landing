export type Role = 'OWNER' | 'ADMIN' | 'PROJECT_MANAGER' | 'TEAM_LEAD' | 'MEMBER' | 'FINANCE' | 'CLIENT';

export interface Permission {
  resource: string;
  actions: string[];
}

export const rolePermissions: Record<Role, Permission[]> = {
  OWNER: [
    { resource: 'company', actions: ['read', 'write', 'delete'] },
    { resource: 'users', actions: ['read', 'write', 'delete'] },
    { resource: 'projects', actions: ['read', 'write', 'delete'] },
    { resource: 'finance', actions: ['read', 'write', 'delete'] },
    { resource: 'analytics', actions: ['read', 'write'] },
    { resource: 'settings', actions: ['read', 'write'] },
    { resource: 'billing', actions: ['read', 'write'] },
    { resource: 'goals', actions: ['read', 'write', 'delete'] },
    { resource: 'reports', actions: ['read', 'write'] },
    { resource: 'clients', actions: ['read', 'write', 'delete'] },
    { resource: 'crm', actions: ['read', 'write', 'delete'] },
  ],
  ADMIN: [
    { resource: 'users', actions: ['read', 'write', 'delete'] },
    { resource: 'roles', actions: ['read', 'write'] },
    { resource: 'system', actions: ['read', 'write'] },
    { resource: 'audit', actions: ['read'] },
    { resource: 'integrations', actions: ['read', 'write'] },
    { resource: 'security', actions: ['read', 'write'] },
  ],
  PROJECT_MANAGER: [
    { resource: 'projects', actions: ['read', 'write'] },
    { resource: 'tasks', actions: ['read', 'write', 'delete'] },
    { resource: 'team', actions: ['read', 'write'] },
    { resource: 'resources', actions: ['read', 'write'] },
    { resource: 'risks', actions: ['read', 'write', 'delete'] },
    { resource: 'time', actions: ['read'] },
    { resource: 'reports', actions: ['read'] },
  ],
  TEAM_LEAD: [
    { resource: 'team', actions: ['read', 'write'] },
    { resource: 'approvals', actions: ['read', 'write'] },
    { resource: 'performance', actions: ['read', 'write'] },
    { resource: 'feedback', actions: ['read', 'write'] },
    { resource: 'tasks', actions: ['read', 'write'] },
    { resource: 'time', actions: ['read', 'write'] },
    { resource: 'development', actions: ['read', 'write'] },
  ],
  MEMBER: [
    { resource: 'tasks', actions: ['read', 'write'] },
    { resource: 'time', actions: ['read', 'write'] },
    { resource: 'profile', actions: ['read', 'write'] },
    { resource: 'schedule', actions: ['read'] },
    { resource: 'chat', actions: ['read', 'write'] },
    { resource: 'reports', actions: ['write'] },
    { resource: 'knowledge', actions: ['read', 'write'] },
  ],
  FINANCE: [
    { resource: 'finance', actions: ['read', 'write'] },
    { resource: 'payroll', actions: ['read', 'write'] },
    { resource: 'expenses', actions: ['read', 'write', 'delete'] },
    { resource: 'invoicing', actions: ['read', 'write'] },
    { resource: 'budget', actions: ['read', 'write'] },
    { resource: 'tax', actions: ['read', 'write'] },
    { resource: 'reports', actions: ['read', 'write'] },
    { resource: 'forecasting', actions: ['read', 'write'] },
    { resource: 'revenue', actions: ['read', 'write'] },
    { resource: 'claims', actions: ['read', 'write'] },
  ],
  CLIENT: [
    { resource: 'projects', actions: ['read'] },
    { resource: 'billing', actions: ['read'] },
    { resource: 'messages', actions: ['read', 'write'] },
    { resource: 'feedback', actions: ['write'] },
    { resource: 'reports', actions: ['read'] },
    { resource: 'profile', actions: ['read', 'write'] },
  ],
};

export const hasPermission = (role: Role, resource: string, action: string): boolean => {
  const permissions = rolePermissions[role];
  const resourcePermission = permissions.find(p => p.resource === resource);
  return resourcePermission?.actions.includes(action) || false;
};

export const canAccessRoute = (role: Role, route: string): boolean => {
  // Define route to resource mapping
  const routeResourceMap: Record<string, { resource: string; action: string }> = {
    // Owner routes
    '/dashboard/owner': { resource: 'company', action: 'read' },
    '/dashboard/owner/analytics': { resource: 'analytics', action: 'read' },
    '/dashboard/owner/team': { resource: 'users', action: 'read' },
    '/dashboard/owner/finance': { resource: 'finance', action: 'read' },
    '/dashboard/owner/settings': { resource: 'settings', action: 'read' },
    '/dashboard/owner/billing': { resource: 'billing', action: 'read' },
    '/dashboard/owner/goals': { resource: 'goals', action: 'read' },
    '/dashboard/owner/reports': { resource: 'reports', action: 'read' },
    '/dashboard/owner/clients': { resource: 'clients', action: 'read' },
    '/dashboard/owner/crm': { resource: 'crm', action: 'read' },
    
    // Admin routes
    '/dashboard/admin': { resource: 'users', action: 'read' },
    '/dashboard/admin/users': { resource: 'users', action: 'read' },
    '/dashboard/admin/roles': { resource: 'roles', action: 'read' },
    '/dashboard/admin/settings': { resource: 'system', action: 'read' },
    '/dashboard/admin/audit-log': { resource: 'audit', action: 'read' },
    '/dashboard/admin/integrations': { resource: 'integrations', action: 'read' },
    '/dashboard/admin/security': { resource: 'security', action: 'read' },
    
    // Project Manager routes
    '/dashboard/project-manager': { resource: 'projects', action: 'read' },
    '/dashboard/project-manager/projects': { resource: 'projects', action: 'read' },
    '/dashboard/project-manager/tasks': { resource: 'tasks', action: 'read' },
    '/dashboard/project-manager/resource-management': { resource: 'resources', action: 'read' },
    '/dashboard/project-manager/risk-management': { resource: 'risks', action: 'read' },
    '/dashboard/project-manager/time-report': { resource: 'time', action: 'read' },
    '/dashboard/project-manager/team': { resource: 'team', action: 'read' },
    
    // Team Lead routes
    '/dashboard/team-lead': { resource: 'team', action: 'read' },
    '/dashboard/team-lead/approvals': { resource: 'approvals', action: 'read' },
    '/dashboard/team-lead/performance': { resource: 'performance', action: 'read' },
    '/dashboard/team-lead/members': { resource: 'team', action: 'read' },
    '/dashboard/team-lead/tasks': { resource: 'tasks', action: 'read' },
    '/dashboard/team-lead/time-management': { resource: 'time', action: 'read' },
    '/dashboard/team-lead/development': { resource: 'development', action: 'read' },
    '/dashboard/team-lead/feedback': { resource: 'feedback', action: 'read' },
    '/dashboard/team-lead/one-on-ones': { resource: 'team', action: 'read' },
    
    // Member routes
    '/dashboard/member': { resource: 'tasks', action: 'read' },
    '/dashboard/member/tasks': { resource: 'tasks', action: 'read' },
    '/dashboard/member/time': { resource: 'time', action: 'read' },
    '/dashboard/member/settings': { resource: 'profile', action: 'read' },
    '/dashboard/member/schedule': { resource: 'schedule', action: 'read' },
    '/dashboard/member/chat': { resource: 'chat', action: 'read' },
    '/dashboard/member/submit-report': { resource: 'reports', action: 'write' },
    '/dashboard/member/kb': { resource: 'knowledge', action: 'read' },
    
    // Finance routes
    '/dashboard/finance': { resource: 'finance', action: 'read' },
    '/dashboard/finance/payroll': { resource: 'payroll', action: 'read' },
    '/dashboard/finance/expenses': { resource: 'expenses', action: 'read' },
    '/dashboard/finance/invoicing': { resource: 'invoicing', action: 'read' },
    '/dashboard/finance/budget': { resource: 'budget', action: 'read' },
    '/dashboard/finance/tax': { resource: 'tax', action: 'read' },
    '/dashboard/finance/reports': { resource: 'reports', action: 'read' },
    '/dashboard/finance/forecasting': { resource: 'forecasting', action: 'read' },
    '/dashboard/finance/revenue': { resource: 'finance', action: 'read' },
    '/dashboard/finance/claims': { resource: 'expenses', action: 'read' },
    '/dashboard/finance/pnl': { resource: 'finance', action: 'read' },
    '/dashboard/finance/cash-flow': { resource: 'finance', action: 'read' },
    
    // Client routes
    '/dashboard/client': { resource: 'projects', action: 'read' },
    '/dashboard/client/projects': { resource: 'projects', action: 'read' },
    '/dashboard/client/billing': { resource: 'billing', action: 'read' },
    '/dashboard/client/messages': { resource: 'messages', action: 'read' },
    '/dashboard/client/settings': { resource: 'profile', action: 'read' },
    '/dashboard/client/reports': { resource: 'reports', action: 'read' },
  };

  const routePermission = routeResourceMap[route];
  if (!routePermission) return false;

  return hasPermission(role, routePermission.resource, routePermission.action);
};

export const getRoleDisplayName = (role: Role): string => {
  const displayNames: Record<Role, string> = {
    OWNER: 'Owner',
    ADMIN: 'Administrator',
    PROJECT_MANAGER: 'Project Manager',
    TEAM_LEAD: 'Team Lead',
    MEMBER: 'Team Member',
    FINANCE: 'Finance Manager',
    CLIENT: 'Client',
  };
  return displayNames[role];
};

export const getRoleDescription = (role: Role): string => {
  const descriptions: Record<Role, string> = {
    OWNER: 'Full platform access and company oversight',
    ADMIN: 'System administration and user management',
    PROJECT_MANAGER: 'Project oversight and team coordination',
    TEAM_LEAD: 'Team management and performance tracking',
    MEMBER: 'Task execution and time tracking',
    FINANCE: 'Financial management and reporting',
    CLIENT: 'Project visibility and communication',
  };
  return descriptions[role];
};