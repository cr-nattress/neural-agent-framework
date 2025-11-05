/**
 * Service Factory
 * Exports API service for Netlify function calls
 */

import { IPersonaService } from "./persona.service";
import { apiPersonaService } from "./api/apiPersonaService";

/**
 * Persona Service Instance
 * Always uses real API implementation via Netlify Functions
 */
export const personaService: IPersonaService = apiPersonaService;

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
