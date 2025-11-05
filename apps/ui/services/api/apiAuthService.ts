/**
 * Real Authentication Service Implementation
 * Connects to Supabase for all authentication operations
 * No mock data - production-ready implementation
 */

import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { IAuthService } from "@/services/auth.service";
import type { User, Session, SendMagicLinkResponse } from "@/types/auth";

/**
 * Production auth service using Supabase
 * All methods call real Supabase APIs
 */
export const apiAuthService: IAuthService = {
  /**
   * Send a magic link to user's email via Supabase
   * Uses signInWithOtp which sends magic link by default
   */
  async sendMagicLink(email: string): Promise<SendMagicLinkResponse> {
    try {
      const supabase = createBrowserClient();

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Magic link error:", error);
        return {
          success: false,
          error: error.message || "Failed to send magic link",
        };
      }

      return {
        success: true,
        message: "Magic link sent successfully",
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("sendMagicLink exception:", errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  /**
   * Get the currently authenticated user
   * Returns null if no user is authenticated
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const supabase = createBrowserClient();
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        return null;
      }

      return {
        id: data.user.id,
        email: data.user.email ?? null,
        user_metadata: data.user.user_metadata,
        created_at: data.user.created_at,
        updated_at: data.user.updated_at,
      };
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },

  /**
   * Get the current user session
   * Returns null if no session exists
   */
  async getCurrentSession(): Promise<Session | null> {
    try {
      const supabase = createBrowserClient();
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        return null;
      }

      return {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token ?? "",
        expires_in: data.session.expires_in ?? 3600,
        expires_at: data.session.expires_at ?? Math.floor(Date.now() / 1000) + 3600,
        token_type: "Bearer",
      };
    } catch (error) {
      console.error("Error getting session:", error);
      return null;
    }
  },

  /**
   * Sign out the current user
   * Clears session and authentication state
   */
  async signOut(): Promise<void> {
    try {
      const supabase = createBrowserClient();
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      // Don't throw - allow sign out to complete even if there are errors
    }
  },

  /**
   * Listen for authentication state changes
   * Calls callback whenever auth state changes
   * Returns unsubscribe function
   */
  onAuthStateChange(
    callback: (user: User | null) => void
  ): (() => void) {
    const supabase = createBrowserClient();

    const { data } = supabase.auth.onAuthStateChange(
      async (_event: string, session: any) => {
        if (session?.user) {
          callback({
            id: session.user.id,
            email: session.user.email ?? null,
            user_metadata: session.user.user_metadata,
            created_at: session.user.created_at,
            updated_at: session.user.updated_at,
          });
        } else {
          callback(null);
        }
      }
    );

    // Return unsubscribe function
    return () => {
      data.subscription?.unsubscribe();
    };
  },
};
