import { createContext, useEffect, useState, ReactNode } from 'react';
import { Session, User, AuthError, SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (credentials: SignInWithPasswordCredentials) => Promise<{ user: User | null; error: AuthError | null }>;
  signUp: (credentials: SignUpWithPasswordCredentials) => Promise<{ user: User | null; error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (credentials: SignInWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    return { user: data.user, error };
  };

  const signUp = async (credentials: SignUpWithPasswordCredentials) => {
    const { data, error } = await supabase.auth.signUp(credentials);
    return { user: data.user, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  // We don't render the rest of the app until the initial session check is complete
  return (
    <AuthContext.Provider value={value}> {/* Always render children */}
      {children}
    </AuthContext.Provider>
  );
};