/**
 * Mock Persona Service Implementation
 * Simulates API calls with realistic delays and responses
 */

import { IPersonaService } from "../persona.service";
import {
  PersonaInputPayload,
  ProcessPersonaResponse,
  SavePersonaPayload,
  SavePersonaResponse,
  GetPersonaResponse,
  Persona,
} from "@/types/persona";
import { delay } from "@/lib/utils";
import { mockPersonas, generateMockPersona } from "./data/personas";

export class MockPersonaService implements IPersonaService {
  /**
   * Process persona input and return structured data
   * Simulates OpenAI API processing with 1.5-2s delay
   */
  async processPersona(
    input: PersonaInputPayload
  ): Promise<ProcessPersonaResponse> {
    // Simulate network delay
    await delay(1500 + Math.random() * 500);

    // Validate input
    if (
      input.textBlocks.length === 0 &&
      input.links.length === 0
    ) {
      return {
        success: false,
        error: "Please provide at least one text block or link",
      };
    }

    try {
      // Generate mock persona from input
      const persona = generateMockPersona(input);

      return {
        success: true,
        persona,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to process persona data",
      };
    }
  }

  /**
   * Save persona to storage
   * Simulates Supabase save with 0.8-1.2s delay
   */
  async savePersona(
    payload: SavePersonaPayload
  ): Promise<SavePersonaResponse> {
    // Simulate network delay
    await delay(800 + Math.random() * 400);

    try {
      // Generate unique ID if not present
      const personaId =
        payload.persona.id || `persona_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      return {
        success: true,
        persona_id: personaId,
        storage_path: `personas/${personaId}.json`,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to save persona",
      };
    }
  }

  /**
   * Retrieve persona by ID
   * Simulates Supabase retrieval with 0.5-0.8s delay
   */
  async getPersona(id: string): Promise<GetPersonaResponse> {
    // Simulate network delay
    await delay(500 + Math.random() * 300);

    // Find persona in mock data
    const persona = mockPersonas.find((p) => p.id === id);

    if (!persona) {
      return {
        success: false,
        error: `Persona with ID "${id}" not found`,
      };
    }

    return {
      success: true,
      persona,
    };
  }

  /**
   * List all personas
   * Simulates Supabase list query with 0.6-1s delay
   */
  async listPersonas(): Promise<Persona[]> {
    // Simulate network delay
    await delay(600 + Math.random() * 400);

    return mockPersonas;
  }
}

// Export singleton instance
export const mockPersonaService = new MockPersonaService();
