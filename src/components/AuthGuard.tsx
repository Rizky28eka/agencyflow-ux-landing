import { ReactNode } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const AuthGuard = ({ children, requireAuth = true }: AuthGuardProps) => {
  // For demo purposes, we'll bypass authentication
  // In production, this would check actual authentication state

  return <>{children}</>;
};