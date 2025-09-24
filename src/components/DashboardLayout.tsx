import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getRoleDisplayName } from '@/lib/rolePermissions';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  role: string;
  title: string;
  description: string;
  headerIcon: ReactNode;
  headerAction?: ReactNode;
  requiresPermission?: { resource: string; action: string };
}

export function DashboardLayout({ 
  children, 
  role, 
  title, 
  description, 
  headerIcon, 
  headerAction,
  requiresPermission
}: DashboardLayoutProps) {
  const { user } = useAuth();

  // Check if user has required permission
  if (requiresPermission && user) {
    const { hasPermission } = require('@/lib/rolePermissions');
    if (!hasPermission(user.role, requiresPermission.resource, requiresPermission.action)) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md mx-auto text-center space-y-6">
            <Alert variant="destructive">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                You don't have permission to {requiresPermission.action} {requiresPermission.resource}.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      );
    }
  }
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar role={user?.role.toLowerCase().replace('_', '-') || role} />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="h-7 w-7" />
                <div className="flex items-center space-x-3">
                  {headerIcon}
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {user && (
                  <div className="text-right">
                    <p className="text-sm font-medium">{user.user_metadata.first_name} {user.user_metadata.last_name}</p>
                    <p className="text-xs text-muted-foreground">{getRoleDisplayName(user.role)}</p>
                  </div>
                )}
              {headerAction}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="container mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}