import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getRoleDisplayName, hasPermission } from '@/lib/rolePermissions';
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


  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar role={user?.role.toLowerCase().replace('_', '-') || role} />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="flex h-14 md:h-16 items-center justify-between px-4 md:px-6">
              <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
                <SidebarTrigger className="h-7 w-7 shrink-0 md:hidden" />
                <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                  <div className="shrink-0">{headerIcon}</div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-base md:text-lg lg:text-2xl font-bold text-foreground truncate">{title}</h1>
                    <p className="text-xs md:text-sm text-muted-foreground hidden sm:block truncate">{description}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-4 shrink-0">
                {user && (
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-medium truncate max-w-40">{user.user_metadata.first_name} {user.user_metadata.last_name}</p>
                    <p className="text-xs text-muted-foreground truncate">{getRoleDisplayName(user.role)}</p>
                  </div>
                )}
                {headerAction}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="w-full max-w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}