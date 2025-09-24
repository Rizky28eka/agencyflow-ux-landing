import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface MockUser {
  id: string;
  email: string;
  user_metadata: {
    first_name?: string;
    last_name?: string;
    company?: string;
    avatar_url?: string;
  };
}
export const useAuth = () => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock authentication check
    const checkAuth = () => {
      // For demo purposes, we'll create a mock user
      const mockUser: MockUser = {
        id: 'mock-user-id',
        email: 'demo@agencyflow.com',
        user_metadata: {
          first_name: 'Demo',
          last_name: 'User',
          company: 'AgencyFlow Demo',
        }
      };
      
      setUser(mockUser);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signOut = async () => {
    // Mock sign out
    setUser(null);
    navigate('/auth');
  };

  return {
    user,
    loading,
    signOut,
    isAuthenticated: !!user,
  };
};