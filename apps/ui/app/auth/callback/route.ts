import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Auth Callback Route
 * Handles magic link authentication after user clicks link in email
 *
 * Supabase redirects here with a code parameter after user clicks magic link
 * We exchange the code for a session and redirect to home page
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();

    try {
      // Exchange the auth code for a session
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        // Redirect to home page - user is now authenticated
        return NextResponse.redirect(new URL("/", request.url));
      }

      // If there was an error, log it and redirect to login with error
      console.error("Auth exchange error:", error);
    } catch (error) {
      // Catch any unexpected errors
      console.error("Unexpected callback error:", error);
    }
  }

  // If no code or if there was an error, redirect to login page with error message
  return NextResponse.redirect(
    new URL("/auth/login?error=authentication_failed", request.url)
  );
}
