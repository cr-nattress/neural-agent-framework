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
 */
function getApiBaseUrl(): string {
  // Check if we're running in Netlify Dev environment
  if (typeof window !== "undefined") {
    // Browser environment
    const isNetlifyDev = window.location.port === "8888";
    return isNetlifyDev ? "http://localhost:8888" : "";
  }
  // Server-side
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
   * Get persona by ID
   * TODO: Implement Netlify function for retrieval
   */
  async getPersona(id: string): Promise<GetPersonaResponse> {
    return {
      success: false,
      error: "Not implemented yet",
    };
  }

  /**
   * List all personas
   * TODO: Implement Netlify function for listing
   */
  async listPersonas(): Promise<Persona[]> {
    console.warn("listPersonas not implemented yet");
    return [];
  }
}

/**
 * Export singleton instance
 */
export const apiPersonaService = new ApiPersonaService();
