import { supabase } from "@/integrations/supabase/client";

// API wrapper for Supabase operations
export const api = {
  // Generic database operations
  from: (table: string) => supabase.from(table),
  
  // Authentication operations
  auth: {
    signUp: (credentials: { email: string; password: string }) => 
      supabase.auth.signUp(credentials),
    
    signIn: (credentials: { email: string; password: string }) => 
      supabase.auth.signInWithPassword(credentials),
    
    signOut: () => supabase.auth.signOut(),
    
    getUser: () => supabase.auth.getUser(),
    
    getSession: () => supabase.auth.getSession(),
    
    onAuthStateChange: (callback: (event: string, session: any) => void) =>
      supabase.auth.onAuthStateChange(callback),
  },
  
  // Storage operations
  storage: {
    from: (bucket: string) => supabase.storage.from(bucket),
  },
  
  // Real-time subscriptions
  channel: (name: string) => supabase.channel(name),
};
