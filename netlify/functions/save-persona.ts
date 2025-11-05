/**
 * Netlify Function: Save Persona
 * Saves a persona object to Supabase storage
 */

import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

interface Persona {
  id?: string;
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
    source_text_blocks: number;
    source_links: number;
  };
  raw_data: {
    textBlocks: string[];
    links: string[];
  };
}

interface SavePersonaPayload {
  persona: Persona;
}

interface SavePersonaResponse {
  success: boolean;
  persona_id?: string;
  storage_path?: string;
  error?: string;
}

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";

/**
 * Main handler function
 */
export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
): Promise<{ statusCode: number; body: string; headers: Record<string, string> }> => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    // Validate environment variables
    if (!supabaseUrl || !supabaseKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Supabase configuration missing",
        }),
      };
    }

    // Parse request body
    const payload: SavePersonaPayload = JSON.parse(event.body || "{}");

    // Validate input
    if (!payload.persona) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Missing required field: persona",
        }),
      };
    }

    const { persona } = payload;

    // Ensure persona has an ID
    const personaId = persona.id || `persona_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const personaWithId = { ...persona, id: personaId };

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Define storage path
    const storagePath = `personas/${personaId}.json`;

    // Convert persona to JSON
    const personaJson = JSON.stringify(personaWithId, null, 2);
    const personaBlob = new Blob([personaJson], { type: "application/json" });

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("personas")
      .upload(storagePath, personaBlob, {
        contentType: "application/json",
        upsert: true, // Overwrite if exists
      });

    if (error) {
      console.error("Supabase storage error:", error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: `Failed to save persona: ${error.message}`,
        }),
      };
    }

    // Also save metadata to Supabase database (optional - for querying)
    const { error: dbError } = await supabase
      .from("personas_metadata")
      .upsert({
        id: personaId,
        name: personaWithId.name,
        occupation: personaWithId.occupation,
        created_at: personaWithId.metadata.created_at || new Date().toISOString(),
        source_text_blocks: personaWithId.metadata.source_text_blocks,
        source_links: personaWithId.metadata.source_links,
        storage_path: storagePath,
      });

    // Don't fail the request if database insert fails (storage is primary)
    if (dbError) {
      console.warn("Database metadata save failed (non-critical):", dbError);
    }

    const response: SavePersonaResponse = {
      success: true,
      persona_id: personaId,
      storage_path: storagePath,
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    console.error("Error saving persona:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message || "Internal server error",
      }),
    };
  }
};
