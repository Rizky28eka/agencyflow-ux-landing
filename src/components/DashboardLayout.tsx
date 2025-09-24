import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  role: string;
  title: string;
  description: string;
  headerIcon: ReactNode;
  headerAction?: ReactNode;
}

export function DashboardLayout({ 
  children, 
  role, 
  title, 
  description, 
  headerIcon, 
  headerAction 
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar role={role} />
        
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
              {headerAction}
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