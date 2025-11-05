/**
 * Persona Service Interface
 * Defines the contract for API implementations
 */

import {
  PersonaInputPayload,
  ProcessPersonaResponse,
  SavePersonaPayload,
  SavePersonaResponse,
  GetPersonaResponse,
  Persona,
} from "@/types/persona";

export interface IPersonaService {
  /**
   * Process raw text blocks and links into a structured persona
   */
  processPersona(input: PersonaInputPayload): Promise<ProcessPersonaResponse>;

  /**
   * Save a persona to storage
   */
  savePersona(payload: SavePersonaPayload): Promise<SavePersonaResponse>;

  /**
   * Retrieve a persona by ID
   */
  getPersona(id: string): Promise<GetPersonaResponse>;

  /**
   * List all personas (for future use)
   */
  listPersonas(): Promise<Persona[]>;
}
