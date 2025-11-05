/**
 * Mock Persona Service
 * Simulates API responses for local development without Netlify Functions
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

export class MockPersonaService implements IPersonaService {
  private personas: Map<string, Persona> = new Map();
  private processingDelay = 1500;

  async processPersona(input: PersonaInputPayload): Promise<ProcessPersonaResponse> {
    await new Promise((resolve) => setTimeout(resolve, this.processingDelay));

    const textBlock = input.textBlocks[0] || "Unknown person";
    const name = this.extractName(textBlock);

    const mockPersona: Persona = {
      id: undefined,
      name: name || "John Doe",
      age: 32,
      occupation: "Software Engineer",
      background: "Based on the provided information...",
      personality:
        "Creative, analytical thinker with strong attention to detail.",
      traits: [
        "Analytical",
        "Creative",
        "Detail-oriented",
        "Collaborative",
        "Curious",
      ],
      interests: [
        "Technology",
        "Problem-solving",
        "Learning",
        "Innovation",
      ],
      goals: [
        "Build impactful products",
        "Mentor junior developers",
      ],
      challenges: [
        "Time management",
        "Perfectionism",
      ],
      communicationStyle:
        "Direct and clear communication with preference for written documentation",
      workStyle:
        "Prefers focused work periods with collaborative discussions",
    };

    return {
      success: true,
      persona: mockPersona,
      processingTime: this.processingDelay,
      tokensUsed: 487,
    };
  }

  async savePersona(payload: SavePersonaPayload): Promise<SavePersonaResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const personaId = this.generateId();
    const personaWithId = { ...payload.persona, id: personaId };
    this.personas.set(personaId, personaWithId);

    return {
      success: true,
      personaId,
      savedAt: new Date().toISOString(),
    };
  }

  async getPersona(id: string): Promise<GetPersonaResponse> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const persona = this.personas.get(id);

    if (!persona) {
      return {
        success: false,
        error: "Persona not found",
      };
    }

    return {
      success: true,
      persona,
    };
  }

  async listPersonas(): Promise<Persona[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return Array.from(this.personas.values());
  }

  private extractName(text: string): string {
    const nameMatch = text.match(/(?:name is|i'm|called)\s+([A-Z][a-z]+)/i);
    if (nameMatch) {
      return nameMatch[1];
    }
    const wordMatch = text.match(/[A-Z][a-z]+/);
    return wordMatch ? wordMatch[0] : "Unknown";
  }

  private generateId(): string {
    return "mock-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
  }
}

export const mockPersonaService = new MockPersonaService();
