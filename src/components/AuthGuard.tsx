import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { canAccessRoute, Role } from '@/lib/rolePermissions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: Role[];
}

export const AuthGuard = ({ children, requireAuth = true, allowedRoles }: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && requireAuth && !user) {
      navigate('/auth');
      return;
    }

    if (!loading && user && requireAuth) {
      // Check if user has permission to access this route
      if (!canAccessRoute(user.role, location.pathname)) {
        // Redirect to appropriate dashboard based on role
        const roleDashboards: Record<Role, string> = {
          OWNER: '/dashboard/owner',
          ADMIN: '/dashboard/admin',
          PROJECT_MANAGER: '/dashboard/project-manager',
          TEAM_LEAD: '/dashboard/team-lead',
          MEMBER: '/dashboard/member',
          FINANCE: '/dashboard/finance',
          CLIENT: '/dashboard/client',
        };
        
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
        navigate(roleDashboards[user.role]);
  if (requireAuth && !user) {
    return null; // Will redirect to auth
  }
        return;
  if (user && requireAuth && !canAccessRoute(user.role, location.pathname)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
            <Shield className="h-8 w-8 text-destructive" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground">
              You don't have permission to access this page. Your role ({user.role.replace('_', ' ')}) 
              doesn't have the required permissions.
            </p>
          </div>
      }
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              This page is restricted to specific roles. Please contact your administrator 
              if you believe you should have access.
            </AlertDescription>
          </Alert>
    }
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate(-1)} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Button onClick={() => {
              const roleDashboards: Record<Role, string> = {
                OWNER: '/dashboard/owner',
                ADMIN: '/dashboard/admin',
                PROJECT_MANAGER: '/dashboard/project-manager',
                TEAM_LEAD: '/dashboard/team-lead',
                MEMBER: '/dashboard/member',
                FINANCE: '/dashboard/finance',
                CLIENT: '/dashboard/client',
              };
              navigate(roleDashboards[user.role]);
            }}>
              Go to My Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }
  }, [user, loading, requireAuth, location.pathname, navigate]);
  return <>{children}</>;
};