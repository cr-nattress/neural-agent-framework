/**
 * API Persona Service
 * Real implementation that calls Netlify Functions
 */

import {
  IPersonaService,
  PersonaInputPayload,
  ProcessPersonaResponse,
  SavePersonaPayload,
  SavePersonaResponse,
  GetPersonaResponse,
} from "../persona.service";
import { Persona } from "@/types/persona";

/**
 * Get the base URL for API calls
 * In development with Netlify Dev, functions are available at /.netlify/functions
 * In production, they're also at /.netlify/functions
 *
 * When using netlify dev:
 * - Next.js runs on port 3001
 * - Netlify functions are proxied to /.netlify/functions
 * So we use relative URLs (empty baseUrl) which work automatically
 */
function getApiBaseUrl(): string {
  // Use relative URLs - works in all environments
  // Netlify dev will proxy /.netlify/functions to the actual functions
  return "";
}

/**
 * API Persona Service Class
 */
export class ApiPersonaService implements IPersonaService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = getApiBaseUrl();
  }

  /**
   * Process persona data using OpenAI via Netlify Function
   */
  async processPersona(input: PersonaInputPayload): Promise<ProcessPersonaResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/.netlify/functions/process-persona`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data: ProcessPersonaResponse = await response.json();
      return data;
    } catch (error: any) {
      console.error("API Error - processPersona:", error);
      return {
        success: false,
        error: error.message || "Failed to process persona",
      };
    }
  }

  /**
   * Save persona to Supabase storage via Netlify Function
   */
  async savePersona(payload: SavePersonaPayload): Promise<SavePersonaResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/.netlify/functions/save-persona`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data: SavePersonaResponse = await response.json();
      return data;
    } catch (error: any) {
      console.error("API Error - savePersona:", error);
      return {
        success: false,
        error: error.message || "Failed to save persona",
      };
    }
  }

  /**
   * Get persona by ID from Supabase via Netlify Function
   */
  async getPersona(id: string): Promise<GetPersonaResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/.netlify/functions/get-persona?id=${encodeURIComponent(id)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data: GetPersonaResponse = await response.json();
      return data;
    } catch (error: any) {
      console.error("API Error - getPersona:", error);
      return {
        success: false,
        error: error.message || "Failed to get persona",
      };
    }
  }

  /**
   * List all personas from Supabase via Netlify Function
   */
  async listPersonas(): Promise<Persona[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/.netlify/functions/list-personas?limit=50&offset=0`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data: any = await response.json();
      // The list-personas function returns basic persona info, not full personas
      // For now, return empty array as we'd need to fetch full personas if needed
      console.log("Personas listed:", data.personas);
      return [];
    } catch (error: any) {
      console.error("API Error - listPersonas:", error);
      return [];
    }
  }
}

/**
 * Export singleton instance
 */
export const apiPersonaService = new ApiPersonaService();
