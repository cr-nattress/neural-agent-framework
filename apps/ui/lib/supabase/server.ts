import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Create a Supabase client for use in server-side code
 * This client handles authentication with proper cookie management for Next.js
 *
 * Used in:
 * - Server components
 * - API routes
 * - Middleware
 * - Server actions
 *
 * Automatically handles session persistence via cookies
 */
export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /**
         * Get all cookies from the request
         */
        getAll() {
          return cookieStore.getAll();
        },
        /**
         * Set cookies in the response
         * Handles session token persistence
         */
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options as CookieOptions);
            });
          } catch (error) {
            // Cookies can fail silently in some contexts
            // Log but don't throw to prevent request failures
            console.warn("Failed to set cookies:", error);
          }
        },
      },
    }
  );
};
