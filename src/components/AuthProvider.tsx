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
      const response = await api.post<AuthResponse>('/api/auth/login', data);
      const { token, user } = response;

      setToken(token);
      setUser(user);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/dashboard/owner'); // Default redirect
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
      await api.post('/api/auth/register', data);
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

  const logout = () => {
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
    isLoading,
    isAuthenticated: !!(token && user),
    error,
    setUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
