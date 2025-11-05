/**
 * Service Factory
 * Exports API services for all application features
 */

import { IPersonaService } from "./persona.service";
import { apiPersonaService } from "./api/apiPersonaService";
import { IAuthService } from "./auth.service";
import { apiAuthService } from "./api/apiAuthService";

/**
 * Persona Service Instance
 * Always uses real API implementation via Netlify Functions
 */
export const personaService: IPersonaService = apiPersonaService;

/**
 * Auth Service Instance
 * Uses real Supabase implementation for magic link authentication
 */
export const authService: IAuthService = apiAuthService;

/**
 * Get current service mode
 */
export function getServiceMode(): "mock" | "real" {
  return "real";
}

/**
 * Check if running in mock mode
 */
export function isMockMode(): boolean {
  return false;
}
