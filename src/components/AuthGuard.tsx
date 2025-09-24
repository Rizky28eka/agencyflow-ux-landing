import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { canAccessRoute, Role } from '@/lib/rolePermissions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft } from 'lucide-react';

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  allowedRoles?: Role[];
}

const roleDashboards: Record<Role, string> = {
  OWNER: '/dashboard/owner',
  ADMIN: '/dashboard/admin',
  PROJECT_MANAGER: '/dashboard/project-manager',
  TEAM_LEAD: '/dashboard/team-lead',
  MEMBER: '/dashboard/member',
  FINANCE: '/dashboard/finance',
  CLIENT: '/dashboard/client',
};

export const AuthGuard = ({
  children,
  requireAuth = true,
  allowedRoles,
}: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Jika masih loading → tampilkan spinner
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

  // 2. Jika butuh auth tapi user belum login → redirect ke /auth
  if (requireAuth && !user) {
    navigate('/auth', { replace: true, state: { from: location } });
    return null;
  }

  // 3. Jika user ada tapi role tidak sesuai route / allowedRoles → tampilkan Access Denied
  if (
    user &&
    requireAuth &&
    (!canAccessRoute(user.role, location.pathname) ||
      (allowedRoles && !allowedRoles.includes(user.role)))
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
            <Shield className="h-8 w-8 text-destructive" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground">
              You don&apos;t have permission to access this page. Your role (
              {user.role.replace('_', ' ')}) doesn&apos;t have the required
              permissions.
            </p>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              This page is restricted to specific roles. Please contact your
              administrator if you believe you should have access.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate(-1)} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Button onClick={() => navigate(roleDashboards[user.role])}>
              Go to My Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Kalau semua OK → render children
  return <>{children}</>;
};