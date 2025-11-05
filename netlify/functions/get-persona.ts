/**
 * Netlify Function: Get Persona
 * Retrieves a saved persona from Supabase storage by ID
 */

import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

interface GetPersonaResponse {
  success: boolean;
  persona?: any;
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
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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

  // Allow both GET and POST
  if (event.httpMethod !== "GET" && event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    // Get persona_id from query string (GET) or body (POST)
    let personaId: string | null = null;

    if (event.httpMethod === "GET") {
      personaId = event.queryStringParameters?.persona_id || null;
    } else if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");
      personaId = body.persona_id || null;
    }

    // Validate persona_id
    if (!personaId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Missing required parameter: persona_id",
        }),
      };
    }

    // Validate Supabase configuration
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

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Define storage path
    const storagePath = `personas/${personaId}.json`;

    // Download from Supabase Storage
    const { data, error } = await supabase.storage
      .from("personas")
      .download(storagePath);

    if (error) {
      console.error("Supabase storage error:", error);

      // Check if it's a "not found" error
      if (error.message.includes("not found") || error.message.includes("404")) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            success: false,
            error: `Persona not found: ${personaId}`,
          }),
        };
      }

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: `Failed to retrieve persona: ${error.message}`,
        }),
      };
    }

    // Parse JSON data
    const text = await data.text();
    const persona = JSON.parse(text);

    const response: GetPersonaResponse = {
      success: true,
      persona,
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    console.error("Error retrieving persona:", error);

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
