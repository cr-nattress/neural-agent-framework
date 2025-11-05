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
 *
 * In development with Netlify Dev:
 * - Next.js UI runs on port 3001
 * - Netlify Dev runs on port 8889 with function proxying
 * - API calls must go to port 8889 to reach the functions
 *
 * In production:
 * - Both UI and functions are served from the same domain
 * - Use relative URLs (empty baseUrl)
 */
function getApiBaseUrl(): string {
  // Check if we're in development by looking for localhost
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    // In development, Netlify Dev serves both the framework and functions
    // If we're on the UI port (3001+), redirect to the Netlify Dev port (8889)
    const currentPort = window.location.port;
    if (currentPort && parseInt(currentPort) >= 3000 && parseInt(currentPort) <= 3999) {
      // This is the Next.js dev server, API calls must go to Netlify Dev on 8889
      return "http://localhost:8889";
    }
  }

  // In production or when already on Netlify Dev port, use relative URLs
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
    const url = `${this.baseUrl}/.netlify/functions/process-persona`;
    console.log("[apiPersonaService] processPersona called");
    console.log("[apiPersonaService] URL:", url);
    console.log("[apiPersonaService] Input payload:", JSON.stringify(input, null, 2));

    try {
      console.log("[apiPersonaService] Sending fetch request...");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      console.log("[apiPersonaService] Response status:", response.status, response.statusText);
      console.log("[apiPersonaService] Response headers:", {
        contentType: response.headers.get("content-type"),
        contentLength: response.headers.get("content-length"),
      });

      if (!response.ok) {
        console.error("[apiPersonaService] Response not ok, attempting to parse error");
        const errorData = await response.json().catch(() => ({}));
        console.error("[apiPersonaService] Error data:", errorData);
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      console.log("[apiPersonaService] Parsing response body...");
      const data: ProcessPersonaResponse = await response.json();
      console.log("[apiPersonaService] Parsed response:", JSON.stringify(data, null, 2));
      return data;
    } catch (error: any) {
      console.error("[apiPersonaService] CATCH ERROR:", error);
      console.error("[apiPersonaService] Error message:", error.message);
      console.error("[apiPersonaService] Error stack:", error.stack);
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
