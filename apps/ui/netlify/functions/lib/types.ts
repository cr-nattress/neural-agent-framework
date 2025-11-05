/**
 * Shared TypeScript types for Netlify Functions
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
    timestamp: string;
  };
}

export interface PersonaInputPayload {
  textBlocks: string[];
  links: string[];
}

export interface PersonaData {
  id?: string;
  name: string;
  age?: number;
  occupation?: string;
  background: string;
  personality: string;
  traits: string[];
  interests: string[];
  goals?: string[];
  challenges?: string[];
  communicationStyle?: string;
  workStyle?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProcessPersonaRequest {
  textBlocks: string[];
  links: string[];
}

export interface ProcessPersonaResponse {
  success: boolean;
  persona: PersonaData;
  processingTime: number;
  tokensUsed?: number;
}

export interface SavePersonaRequest {
  persona: PersonaData;
}

export interface SavePersonaResponse {
  success: boolean;
  personaId: string;
  savedAt: string;
}

export interface GetPersonaRequest {
  personaId: string;
}

export interface GetPersonaResponse {
  success: boolean;
  persona: PersonaData;
}

export interface ChatRequest {
  personaId: string;
  message: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface ChatResponse {
  success: boolean;
  response: string;
  conversationId?: string;
}

export interface FunctionContext {
  functionName: string;
  requestId: string;
  startTime: number;
}
