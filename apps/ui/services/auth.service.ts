/**
 * Auth Service Interface
 * Defines contract for authentication operations
 */

import type { SendMagicLinkResponse, User, Session } from "@/types/auth";

export interface IAuthService {
  /**
   * Send a magic link to the user's email
   * @param email - User's email address
   * @returns Response indicating success or error
   */
  sendMagicLink(email: string): Promise<SendMagicLinkResponse>;

  /**
   * Get the currently authenticated user
   * @returns User object if authenticated, null otherwise
   */
  getCurrentUser(): Promise<User | null>;

  /**
   * Get the current user session
   * @returns Session object if authenticated, null otherwise
   */
  getCurrentSession(): Promise<Session | null>;

  /**
   * Sign out the current user
   * Clears session and authentication state
   */
  signOut(): Promise<void>;

  /**
   * Listen for authentication state changes
   * @param callback - Function called when auth state changes
   * @returns Unsubscribe function to stop listening
   */
  onAuthStateChange(callback: (user: User | null) => void): () => void;
}
