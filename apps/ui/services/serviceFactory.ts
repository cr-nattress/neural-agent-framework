/**
 * Service Factory
 * Exports API services for all application features
 */

import { IPersonaService } from "./persona.service";
import { apiPersonaService } from "./api/apiPersonaService";
import { mockPersonaService } from "./mock/mockPersonaService";
import { IAuthService } from "./auth.service";
import { apiAuthService } from "./api/apiAuthService";

/**
 * Check if we should use mock services
 * By default, use mock services in development
 * Set NEXT_PUBLIC_USE_MOCK_DATA=false to use real API
 */
const useMockData =
  typeof window !== "undefined"
    ? localStorage?.getItem("USE_MOCK_DATA") !== "false"
    : process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false";

/**
 * Persona Service Instance
 * Uses mock services in development, real API in production
 */
export const personaService: IPersonaService = useMockData
  ? mockPersonaService
  : apiPersonaService;

/**
 * Auth Service Instance
 * Uses real Supabase implementation for magic link authentication
 */
export const authService: IAuthService = apiAuthService;
