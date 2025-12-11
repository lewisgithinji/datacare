import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// To prevent multiple instances of the Supabase client in development,
// we can attach it to the global window object.
declare global {
  interface Window {
    supabase: SupabaseClient;
  }
}

if (!window.supabase) {
  window.supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: window.localStorage,
      storageKey: 'datacare-auth',
      detectSessionInUrl: true,
    },
  });
}

export const supabase = window.supabase;
