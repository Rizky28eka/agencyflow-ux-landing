import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Role } from '@/lib/rolePermissions';

interface MockUser {
  id: string;
  email: string;
  role: Role;
  user_metadata: {
    first_name?: string;
    last_name?: string;
    company?: string;
    avatar_url?: string;
    job_title?: string;
    skills?: string[];
  };
}
export const useAuth = () => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock authentication check
    const checkAuth = () => {
      // Get role from localStorage or default to MEMBER
      const storedRole = localStorage.getItem('demo-role') as Role || 'MEMBER';
      
      // For demo purposes, we'll create a mock user
      const mockUser: MockUser = {
        id: 'mock-user-id',
        email: `${storedRole.toLowerCase()}@agencyflow.com`,
        role: storedRole,
        user_metadata: {
          first_name: getRoleDisplayName(storedRole).split(' ')[0],
          last_name: 'User',
          company: 'AgencyFlow Demo',
          job_title: getRoleDisplayName(storedRole),
          skills: ['React', 'TypeScript', 'Node.js'],
        }
      };
      
      setUser(mockUser);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const setUserRole = (role: Role) => {
    localStorage.setItem('demo-role', role);
    if (user) {
      setUser({
        ...user,
        role,
        email: `${role.toLowerCase()}@agencyflow.com`,
        user_metadata: {
          ...user.user_metadata,
          first_name: getRoleDisplayName(role).split(' ')[0],
          job_title: getRoleDisplayName(role),
        }
      });
    }
  };
  const signOut = async () => {
    // Mock sign out
    localStorage.removeItem('demo-role');
    setUser(null);
    navigate('/auth');
  };

  return {
    user,
    loading,
    signOut,
    setUserRole,
    isAuthenticated: !!user,
  };
};

const getRoleDisplayName = (role: Role): string => {
  const displayNames: Record<Role, string> = {
    OWNER: 'Company Owner',
    ADMIN: 'System Admin',
    PROJECT_MANAGER: 'Project Manager',
    TEAM_LEAD: 'Team Lead',
    MEMBER: 'Team Member',
    FINANCE: 'Finance Manager',
    CLIENT: 'Client User',
  };
  return displayNames[role];
};