/**
 * Service Factory
 * Switches between mock and real API implementations based on environment
 */

import { IPersonaService } from "./persona.service";
import { mockPersonaService } from "./mock/mockPersonaService";
// import { apiPersonaService } from "./api/apiPersonaService"; // TODO: Implement real API service

/**
 * Determine if we should use mock data
 * Controlled by NEXT_PUBLIC_USE_MOCK_DATA environment variable
 */
const USE_MOCK =
  process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true" ||
  process.env.NEXT_PUBLIC_USE_MOCK_DATA === undefined; // Default to mock for development

/**
 * Persona Service Instance
 * Returns mock or real implementation based on environment
 */
export const personaService: IPersonaService = USE_MOCK
  ? mockPersonaService
  : mockPersonaService; // TODO: Switch to apiPersonaService when ready
  // : apiPersonaService;

/**
 * Get current service mode
 */
export function getServiceMode(): "mock" | "real" {
  return USE_MOCK ? "mock" : "real";
}

/**
 * Check if running in mock mode
 */
export function isMockMode(): boolean {
  return USE_MOCK;
}
