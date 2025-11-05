"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Singleton Supabase client instance
 * Using a singleton ensures the PKCE verifier and auth state are preserved
 * across page navigations and component re-renders
 */
let supabaseClientInstance: ReturnType<typeof createBrowserClient> | null = null;

/**
 * Get or create a Supabase client for use in client-side components
 * Returns the same instance on subsequent calls to preserve auth state
 *
 * Must be called in a client component (use "use client" directive)
 */
export const createClient = () => {
  if (supabaseClientInstance) {
    return supabaseClientInstance;
  }

  supabaseClientInstance = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return supabaseClientInstance;
};
