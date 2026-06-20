import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (mounted) {
        if (error) {
          console.error('Error getting session:', error);
        }
        setUser(session?.user ?? null);
        setLoading(false);
      }
    }).catch((err) => {
      console.error('Unexpected error getting session:', err);
      if (mounted) {
        setLoading(false);
      }
    });

    // Listen for changes on auth state (log in, log out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // Will be used to expose these values to the app
  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
    user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
          Loading application...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
