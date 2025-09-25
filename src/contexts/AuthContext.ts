import { createContext } from 'react';
import { Role } from '@/lib/rolePermissions';

// --- Type Definitions ---
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
  setUserRole: (role: Role) => void;
}

// --- Context Creation ---
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
