import { useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Role } from '@/lib/rolePermissions';
import { AuthContext, AuthResponse, LoginData, RegisterData, User } from '@/contexts/AuthContext';

// --- AuthProvider Component ---
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to parse auth data from localStorage", e);
      // Clear corrupted data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setIsLoading(false);
  }, []);

  const login = async (data: LoginData) => {
    try {
      setError(null);
      const { data: authData, error } = await api.auth.signIn({
        email: data.email,
        password: data.password
      });

      if (error) throw error;
      if (!authData.user) throw new Error("No user data received");

      const user: User = {
        id: authData.user.id,
        name: authData.user.user_metadata?.name || authData.user.email?.split('@')[0] || 'User',
        email: authData.user.email!,
        role: 'OWNER' // Default role, should be fetched from profiles table
      };

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard/owner');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
        console.error("Login failed:", err);
      } else {
        setError(new Error("An unknown error occurred during login."));
        console.error("Login failed with unknown error:", err);
      }
      throw err;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setError(null);
      const { error } = await api.auth.signUp({
        email: data.email,
        password: data.password
      });

      if (error) throw error;
      
      // After successful signup, try to login
      await login({ email: data.email, password: data.password });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
        console.error("Register failed:", err);
      } else {
        setError(new Error("An unknown error occurred during registration."));
        console.error("Register failed with unknown error:", err);
      }
      throw err;
    }
  };

  const logout = async () => {
    await api.auth.signOut();
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const setUserRole = (role: Role) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading: isLoading,
    isLoading,
    isAuthenticated: !!user,
    error,
    setUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
