/**
 * Authentication Type Definitions
 * Used throughout the auth system for type safety and consistency
 */

/**
 * Response from sending a magic link
 */
export interface SendMagicLinkResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Authenticated user object
 */
export interface User {
  id: string;
  email: string;
  user_metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

/**
 * User session with authentication tokens
 */
export interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  token_type: string;
}

/**
 * Current authentication state
 * Used by useAuth hook for state management
 */
export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
}
