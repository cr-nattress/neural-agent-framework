/**
 * Netlify Function: Chat
 * Handles chat messages with persona-based multi-agent response generation
 */

import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

interface ChatMessage {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: string;
}

interface ChatRequest {
  message: string;
  persona_id: string;
  conversation_id?: string;
  history?: ChatMessage[];
}

interface ChatResponse {
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

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";

/**
 * Fetch persona from Supabase
 */
async function fetchPersona(personaId: string): Promise<any> {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase configuration missing");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const storagePath = `personas/${personaId}.json`;

  const { data, error } = await supabase.storage
    .from("personas")
    .download(storagePath);

  if (error) {
    throw new Error(`Failed to retrieve persona: ${error.message}`);
  }

  const text = await data.text();
  return JSON.parse(text);
}

/**
 * Multi-Agent System Prompt
 * Simulates multiple specialized agents working together
 */
function buildMultiAgentPrompt(persona: any, history: ChatMessage[]): string {
  // Build context from persona
  const personaContext = `
You are ${persona.name}, ${persona.age ? `a ${persona.age}-year-old` : "an"} ${persona.occupation || "person"}.

BACKGROUND:
${persona.background}

PERSONALITY TRAITS:
${persona.traits?.join(", ") || "N/A"}

COMMUNICATION STYLE:
${persona.communication_style || "Natural and conversational"}

VALUES:
${persona.values?.join(", ") || "N/A"}

INTERESTS:
${persona.interests?.join(", ") || "N/A"}

SKILLS:
${persona.skills?.join(", ") || "N/A"}
`;

  const systemPrompt = `${personaContext}

MULTI-AGENT SYSTEM INSTRUCTIONS:
You are powered by a multi-agent system with specialized agents:

1. MEMORY AGENT: Maintains conversation history and context
2. REASONING AGENT: Processes user questions and generates logical responses
3. PERSONALITY AGENT: Ensures responses match ${persona.name}'s traits and style

Your task is to respond to the user's message while:
- Staying in character as ${persona.name}
- Using ${persona.name}'s background, traits, and communication style
- Maintaining coherence with the conversation history
- Providing thoughtful, relevant responses
- Being helpful and engaging

IMPORTANT: Respond as ${persona.name} would, not as an AI assistant. Use first person. Don't break character.`;

  return systemPrompt;
}

/**
 * Main handler function
 */
export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
): Promise<{ statusCode: number; body: string; headers: Record<string, string> }> => {
  const startTime = Date.now();

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
    // Parse request body
    const request: ChatRequest = JSON.parse(event.body || "{}");

    // Validate input
    if (!request.message || !request.persona_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Missing required fields: message and persona_id",
        }),
      };
    }

    // Fetch persona
    const persona = await fetchPersona(request.persona_id);

    // Build conversation history for OpenAI
    const messages: any[] = [];

    // Add system prompt
    const systemPrompt = buildMultiAgentPrompt(persona, request.history || []);
    messages.push({
      role: "system",
      content: systemPrompt,
    });

    // Add conversation history (last 10 messages)
    const recentHistory = (request.history || []).slice(-10);
    for (const msg of recentHistory) {
      messages.push({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
      });
    }

    // Add current user message
    messages.push({
      role: "user",
      content: request.message,
    });

    // Call OpenAI API (simulating multi-agent coordination)
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.8, // Higher temperature for more personality
      max_tokens: 500,
    });

    // Extract response
    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error("No response from AI");
    }

    // Generate IDs
    const conversationId =
      request.conversation_id || `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const processingTime = Date.now() - startTime;

    const response: ChatResponse = {
      success: true,
      response: responseContent,
      conversation_id: conversationId,
      message_id: messageId,
      metadata: {
        tokens_used: completion.usage?.total_tokens || 0,
        processing_time_ms: processingTime,
        agents_involved: ["memory", "reasoning", "personality"],
      },
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    console.error("Error processing chat:", error);

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
