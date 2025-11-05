"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Create a Supabase client for use in client-side components
 * This client is used for browser-based authentication and API calls
 *
 * Must be called in a client component (use "use client" directive)
 */
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
