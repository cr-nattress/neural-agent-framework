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
function getUseMock(): boolean {
  // Check if we're in browser environment
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true" ||
           process.env.NEXT_PUBLIC_USE_MOCK_DATA === undefined;
  }
  // Server-side: default to mock
  return true;
}

/**
 * Persona Service Instance
 * Returns mock or real implementation based on environment
 */
export const personaService: IPersonaService = mockPersonaService; // Always use mock for now
  // TODO: Implement real API switching
  // getUseMock() ? mockPersonaService : apiPersonaService;

/**
 * Get current service mode
 */
export function getServiceMode(): "mock" | "real" {
  return getUseMock() ? "mock" : "real";
}

/**
 * Check if running in mock mode
 */
export function isMockMode(): boolean {
  return getUseMock();
}
