/**
 * Persona Type Definitions
 * Based on PLAN.md lines 482-594
 */

/** Input payload from frontend to processing function */
export interface PersonaInputPayload {
  textBlocks: string[];
  links: string[];
}

/** Structured persona data returned from OpenAI */
export interface Persona {
  id?: string; // Added after save
  name: string;
  age?: number;
  occupation?: string;
  background: string;
  traits: string[];
  interests: string[];
  skills: string[];
  values: string[];
  communication_style?: string;
  personality_type?: string;
  goals?: string[];
  challenges?: string[];
  relationships?: string[];
  metadata: {
    created_at?: string;
    source_text_blocks: number; // Count of text blocks
    source_links: number; // Count of links
  };
  raw_data: {
    textBlocks: string[];
    links: string[];
  };
}

/** Response from OpenAI processing function */
export interface ProcessPersonaResponse {
  success: boolean;
  persona?: Persona;
  error?: string;
}

/** Response from Supabase save function */
export interface SavePersonaResponse {
  success: boolean;
  persona_id?: string;
  storage_path?: string;
  error?: string;
}

/** Save request payload */
export interface SavePersonaPayload {
  persona: Persona;
}

/** Get persona request */
export interface GetPersonaRequest {
  persona_id: string;
}

/** Get persona response */
export interface GetPersonaResponse {
  success: boolean;
  persona?: Persona;
  error?: string;
}

// === Phase 2: Chat Types (for future use) ===

/** Individual chat message */
export interface ChatMessage {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: string;
  metadata?: {
    tokens_used?: number;
    processing_time_ms?: number;
  };
}

/** Chat request from frontend to Netlify Function */
export interface ChatRequest {
  message: string;
  persona_id: string;
  conversation_id?: string;
  history?: ChatMessage[]; // Recent context
}

/** Chat response from Netlify Function to frontend */
export interface ChatResponse {
  success: boolean;
  response?: string;
  conversation_id?: string;
  message_id?: string;
  error?: string;
  metadata?: {
    tokens_used: number;
    processing_time_ms: number;
    agents_involved?: string[];
  };
}

/** Conversation object (for persistence) */
export interface Conversation {
  id: string;
  persona_id: string;
  persona_name: string;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}
