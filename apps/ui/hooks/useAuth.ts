"use client";

import { useEffect, useState, useCallback } from "react";
import { authService } from "@/services/serviceFactory";
import type { User, Session, AuthState } from "@/types/auth";

/**
 * useAuth Hook
 * Manages authentication state throughout the application
 * Provides user, session, loading, error state and signOut function
 *
 * Usage:
 * const { user, session, isLoading, error, signOut } = useAuth();
 */
export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    error: null,
  });

  /**
   * Load initial auth state on component mount
   */
  useEffect(() => {
    const initAuth = async () => {
      try {
        const [user, session] = await Promise.all([
          authService.getCurrentUser(),
          authService.getCurrentSession(),
        ]);

        setState({
          user,
          session,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to load auth state";
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: message,
        }));
      }
    };

    initAuth();
  }, []);

  /**
   * Subscribe to auth state changes
   * Updates state when user logs in/out
   */
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((user) => {
      setState((prev) => ({
        ...prev,
        user,
      }));
    });

    return () => unsubscribe();
  }, []);

  /**
   * Sign out the current user
   */
  const signOut = useCallback(async () => {
    try {
      await authService.signOut();
      setState({
        user: null,
        session: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to sign out";
      setState((prev) => ({
        ...prev,
        error: message,
      }));
    }
  }, []);

  return { ...state, signOut };
}
