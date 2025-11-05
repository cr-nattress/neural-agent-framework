/**
 * Netlify Function: Process Persona
 * Receives persona input data and uses OpenAI to structure it into a Persona object
 */

import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import OpenAI from "openai";

interface PersonaInputPayload {
  textBlocks: string[];
  links: string[];
}

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

interface ProcessPersonaResponse {
  success: boolean;
  persona?: Persona;
  error?: string;
}

// Initialize OpenAI client
console.log("[module-init] OPENAI_API_KEY environment variable check:");
console.log("[module-init] OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY);
console.log("[module-init] OPENAI_API_KEY length:", (process.env.OPENAI_API_KEY || "").length);
console.log("[module-init] OPENAI_API_KEY prefix:", (process.env.OPENAI_API_KEY || "").substring(0, 20));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("[module-init] OpenAI client initialized successfully");

/**
 * OpenAI System Prompt for Persona Extraction
 */
const PERSONA_EXTRACTION_PROMPT = `You are a expert persona analyst. Your task is to analyze the provided text blocks and links to extract structured information about a person.

Extract and structure the following information:
- **name**: The person's full name
- **age**: Estimated or stated age (number or null)
- **occupation**: Job title or professional role
- **background**: A 2-3 sentence summary of their background
- **traits**: Array of personality traits (e.g., "analytical", "creative", "empathetic")
- **interests**: Array of interests and hobbies
- **skills**: Array of professional and technical skills
- **values**: Array of core values and beliefs
- **communication_style**: Brief description of how they communicate
- **personality_type**: MBTI, Enneagram, or other personality framework if mentioned
- **goals**: Array of stated goals or aspirations
- **challenges**: Array of challenges or pain points they face
- **relationships**: Array of key relationships or social connections mentioned

Return ONLY a valid JSON object matching this structure. Do not include any markdown formatting, code blocks, or explanatory text. Just the raw JSON object.

If information is not available for a field, use null for optional fields or empty arrays for array fields.`;

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

  console.log("[process-persona] Handler called");
  console.log("[process-persona] Method:", event.httpMethod);
  console.log("[process-persona] Body:", event.body);
  console.log("[process-persona] OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY);

  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === "OPTIONS") {
    console.log("[process-persona] Returning OPTIONS response");
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    console.error("[process-persona] Invalid method:", event.httpMethod);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    console.log("[process-persona] Parsing request body");
    // Parse request body
    const payload: PersonaInputPayload = JSON.parse(event.body || "{}");
    console.log("[process-persona] Parsed payload:", JSON.stringify(payload));

    // Validate input
    if (!payload.textBlocks && !payload.links) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Missing required fields: textBlocks or links",
        }),
      };
    }

    const filteredTextBlocks = (payload.textBlocks || []).filter((block) => block.trim() !== "");
    const filteredLinks = (payload.links || []).filter((link) => link.trim() !== "");

    if (filteredTextBlocks.length === 0 && filteredLinks.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Please provide at least one text block or link",
        }),
      };
    }

    // Prepare content for OpenAI
    let contentToAnalyze = "";

    if (filteredTextBlocks.length > 0) {
      contentToAnalyze += "=== TEXT BLOCKS ===\n\n";
      filteredTextBlocks.forEach((block, index) => {
        contentToAnalyze += `Block ${index + 1}:\n${block}\n\n`;
      });
    }

    if (filteredLinks.length > 0) {
      contentToAnalyze += "=== LINKS ===\n\n";
      filteredLinks.forEach((link, index) => {
        contentToAnalyze += `Link ${index + 1}: ${link}\n`;
      });
      contentToAnalyze += "\n(Note: For links, extract information based on the URL context and any known information about the domain. In a production system, you would fetch and analyze the actual content.)\n";
    }

    // Call OpenAI API
    console.log("[process-persona] Preparing to call OpenAI API");
    console.log("[process-persona] Content to analyze length:", contentToAnalyze.length);
    console.log("[process-persona] OpenAI client initialized:", !!openai);

    console.log("[process-persona] Calling openai.chat.completions.create...");
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: PERSONA_EXTRACTION_PROMPT,
        },
        {
          role: "user",
          content: contentToAnalyze,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" },
    });

    console.log("[process-persona] OpenAI API call successful");
    console.log("[process-persona] Response choices count:", completion.choices.length);

    // Parse OpenAI response
    const responseContent = completion.choices[0]?.message?.content;
    console.log("[process-persona] Response content retrieved, length:", responseContent?.length || 0);

    if (!responseContent) {
      throw new Error("No response from OpenAI");
    }

    console.log("[process-persona] Parsing JSON response...");
    const extractedData = JSON.parse(responseContent);
    console.log("[process-persona] Extracted data keys:", Object.keys(extractedData));

    // Build persona object
    const persona: Persona = {
      id: `persona_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: extractedData.name || "Unknown",
      age: extractedData.age || undefined,
      occupation: extractedData.occupation || undefined,
      background: extractedData.background || "",
      traits: extractedData.traits || [],
      interests: extractedData.interests || [],
      skills: extractedData.skills || [],
      values: extractedData.values || [],
      communication_style: extractedData.communication_style || undefined,
      personality_type: extractedData.personality_type || undefined,
      goals: extractedData.goals || [],
      challenges: extractedData.challenges || [],
      relationships: extractedData.relationships || [],
      metadata: {
        created_at: new Date().toISOString(),
        source_text_blocks: filteredTextBlocks.length,
        source_links: filteredLinks.length,
      },
      raw_data: {
        textBlocks: filteredTextBlocks,
        links: filteredLinks,
      },
    };

    const response: ProcessPersonaResponse = {
      success: true,
      persona,
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    console.error("=== ERROR CAUGHT IN HANDLER ===");
    console.error("Error object:", error);
    console.error("Error message:", error.message);
    console.error("Error name:", error.name);
    console.error("Error stack:", error.stack);

    // If it's an OpenAI API error, log additional details
    if (error.status !== undefined) {
      console.error("OpenAI API error status:", error.status);
      console.error("OpenAI API error code:", error.code);
      console.error("OpenAI API error headers:", error.headers);
    }

    // If it's a JSON parse error
    if (error instanceof SyntaxError) {
      console.error("JSON Parse error - the response was not valid JSON");
    }

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
