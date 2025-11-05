/**
 * Service Factory
 * Exports API services for all application features
 *
 * All services use live APIs - no mocking
 */

import { IPersonaService } from "./persona.service";
import { apiPersonaService } from "./api/apiPersonaService";
import { IAuthService } from "./auth.service";
import { apiAuthService } from "./api/apiAuthService";

/**
 * Persona Service Instance
 * Calls real Netlify Functions API
 */
export const personaService: IPersonaService = apiPersonaService;

/**
 * Auth Service Instance
 * Uses real Supabase implementation for magic link authentication
 */
export const authService: IAuthService = apiAuthService;
