/**
 * OpenAI API Client
 * EPIC-06: OpenAI Persona Processing Pipeline
 *
 * Handles OpenAI API integration with caching, retry logic, and error handling
 */

import { OpenAI } from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { getEnvironmentConfig } from './env';
import { OpenAIError, RateLimitError, TimeoutError } from './errors';
import { logger } from './logger';
import type { Persona } from './types';

/**
 * In-memory cache for persona processing results
 */
interface CacheEntry {
  persona: Persona;
  timestamp: number;
}

const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
const cache = new Map<string, CacheEntry>();

/**
 * Generate cache key from input
 */
function generateCacheKey(textBlocks: string[], links: string[]): string {
  const content = `${textBlocks.join('|')}${links.join('|')}`;
  // Simple hash function for cache key
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return `persona_${Math.abs(hash).toString(36)}`;
}

/**
 * Get cached persona if available
 */
function getCachedPersona(textBlocks: string[], links: string[]): Persona | null {
  const key = generateCacheKey(textBlocks, links);
  const entry = cache.get(key);

  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    logger.debug('Cache hit for persona processing', { cacheKey: key });
    return entry.persona;
  }

  if (entry) {
    cache.delete(key);
  }

  return null;
}

/**
 * Cache persona result
 */
function cachePersona(textBlocks: string[], links: string[], persona: Persona): void {
  const key = generateCacheKey(textBlocks, links);
  cache.set(key, {
    persona,
    timestamp: Date.now(),
  });
  logger.debug('Cached persona', { cacheKey: key });
}

/**
 * Get cache stats
 */
export function getCacheStats(): { size: number; keys: string[] } {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  };
}

/**
 * Clear cache
 */
export function clearCache(): void {
  cache.clear();
  logger.info('Cache cleared');
}

/**
 * Exponential backoff retry logic
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // Check if error is retryable
      const isRetryable =
        error instanceof RateLimitError ||
        error instanceof TimeoutError ||
        (error instanceof Error && error.message.includes('429')) ||
        (error instanceof Error && error.message.includes('503'));

      if (!isRetryable || attempt === maxRetries) {
        throw error;
      }

      // Calculate delay with exponential backoff
      const delay = initialDelay * Math.pow(2, attempt);
      logger.warn(`Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`, {
        error: lastError.message,
      });

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Max retries exceeded');
}

/**
 * System prompt for persona extraction
 */
const PERSONA_EXTRACTION_SYSTEM_PROMPT = `You are a professional persona extraction assistant. Your task is to analyze unstructured text blocks and links to create a comprehensive digital persona profile.

Analyze the provided information and extract or infer the following:
- Name (required if available)
- Age and occupation
- Comprehensive background summary
- Key personality traits (3-10)
- Interests and hobbies (3-10)
- Professional skills and expertise (3-10)
- Core values (3-10)
- Communication style and tone
- Personality type (if determinable)
- Life goals and aspirations
- Main challenges or pain points
- Important relationships or roles

For each extracted item, only include information that is clearly supported by the source material. If information is not available, omit the field.

Return ONLY valid JSON (no markdown, no explanations) matching this exact structure:
{
  "name": "string",
  "age": number | null,
  "occupation": "string" | null,
  "background": "comprehensive summary string",
  "traits": ["trait1", "trait2", ...],
  "interests": ["interest1", "interest2", ...],
  "skills": ["skill1", "skill2", ...],
  "values": ["value1", "value2", ...],
  "communication_style": "string" | null,
  "personality_type": "string" | null,
  "goals": ["goal1", "goal2", ...] | null,
  "challenges": ["challenge1", "challenge2", ...] | null,
  "relationships": ["relationship1", "relationship2", ...] | null
}

Be thorough but concise. Infer information where appropriate based on context, but don't fabricate details not supported by the source material.`;

/**
 * Process persona with OpenAI
 */
export async function processPersonaWithOpenAI(
  textBlocks: string[],
  links: string[]
): Promise<{ persona: Persona; tokensUsed: number; processingTimeMs: number }> {
  const config = getEnvironmentConfig();
  const startTime = Date.now();

  // Check cache first
  const cachedPersona = getCachedPersona(textBlocks, links);
  if (cachedPersona) {
    return {
      persona: cachedPersona,
      tokensUsed: 0, // Cache hit doesn't use tokens
      processingTimeMs: Date.now() - startTime,
    };
  }

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: config.openaiApiKey,
  });

  // Prepare user message
  const userMessage = `Text Blocks:
${textBlocks.map((block, i) => `Block ${i + 1}:\n${block}`).join('\n\n---\n\n')}

${links.length > 0 ? `Links:\n${links.join('\n')}` : ''}

Please extract and structure a comprehensive persona from this data.`;

  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'user',
      content: userMessage,
    },
  ];

  try {
    logger.debug('Calling OpenAI API', {
      model: config.openaiModel,
      maxTokens: config.maxTokens,
      textBlocksCount: textBlocks.length,
      linksCount: links.length,
    });

    // Call OpenAI with retry logic
    const response = await retryWithBackoff(async () => {
      return openai.chat.completions.create({
        model: config.openaiModel,
        messages: [
          {
            role: 'system',
            content: PERSONA_EXTRACTION_SYSTEM_PROMPT,
          },
          ...messages,
        ],
        max_tokens: config.maxTokens,
        temperature: config.temperature,
      });
    });

    const tokensUsed = response.usage?.total_tokens || 0;
    const processingTimeMs = Date.now() - startTime;

    logger.info('OpenAI processing completed', {
      model: config.openaiModel,
      tokensUsed,
      processingTimeMs,
    });

    // Extract response content
    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new OpenAIError('Empty response from OpenAI');
    }

    // Parse JSON response
    let extractedData: Record<string, unknown>;
    try {
      extractedData = JSON.parse(content);
    } catch (error) {
      throw new OpenAIError('Invalid JSON in OpenAI response', {
        responseContent: content.substring(0, 500),
      });
    }

    // Build persona object
    const persona: Persona = {
      name: String(extractedData.name || 'Unknown'),
      age: extractedData.age ? Number(extractedData.age) : undefined,
      occupation: extractedData.occupation ? String(extractedData.occupation) : undefined,
      background: String(extractedData.background || ''),
      traits: Array.isArray(extractedData.traits) ? extractedData.traits.map(String) : [],
      interests: Array.isArray(extractedData.interests) ? extractedData.interests.map(String) : [],
      skills: Array.isArray(extractedData.skills) ? extractedData.skills.map(String) : [],
      values: Array.isArray(extractedData.values) ? extractedData.values.map(String) : [],
      communication_style: extractedData.communication_style
        ? String(extractedData.communication_style)
        : undefined,
      personality_type: extractedData.personality_type
        ? String(extractedData.personality_type)
        : undefined,
      goals: Array.isArray(extractedData.goals) ? extractedData.goals.map(String) : undefined,
      challenges: Array.isArray(extractedData.challenges)
        ? extractedData.challenges.map(String)
        : undefined,
      relationships: Array.isArray(extractedData.relationships)
        ? extractedData.relationships.map(String)
        : undefined,
      metadata: {
        source_text_blocks: textBlocks.length,
        source_links: links.length,
      },
      raw_data: {
        textBlocks,
        links,
      },
    };

    // Cache the result
    cachePersona(textBlocks, links, persona);

    return {
      persona,
      tokensUsed,
      processingTimeMs,
    };
  } catch (error) {
    if (error instanceof RateLimitError) {
      logger.warn('OpenAI rate limit hit', { processingTimeMs: Date.now() - startTime });
      throw error;
    }

    if (error instanceof TimeoutError) {
      logger.warn('OpenAI request timeout', { processingTimeMs: Date.now() - startTime });
      throw error;
    }

    if (error instanceof OpenAIError) {
      throw error;
    }

    if (error instanceof Error) {
      // Handle specific OpenAI errors
      if (error.message.includes('429')) {
        throw new RateLimitError('OpenAI API rate limit exceeded');
      }

      if (error.message.includes('503') || error.message.includes('timeout')) {
        throw new TimeoutError('OpenAI API is temporarily unavailable');
      }

      throw new OpenAIError(`OpenAI API error: ${error.message}`, {
        originalError: error.name,
      });
    }

    throw new OpenAIError('Unknown error during OpenAI processing');
  }
}

/**
 * Calculate token estimate for input
 */
export function estimateTokens(textBlocks: string[], links: string[]): number {
  const totalText = textBlocks.join(' ') + links.join(' ');
  // Rough estimate: 1 token ≈ 4 characters
  return Math.ceil(totalText.length / 4);
}
