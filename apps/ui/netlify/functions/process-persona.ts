/**
 * Process Persona Function
 * Processes raw user input through OpenAI to generate structured persona data
 * POST /api/functions/process-persona
 */

import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { OpenAI } from 'openai';
import { BaseHandler, ApiResponseBody } from './lib/base-handler';
import { PersonaInputSchema, PersonaResponseSchema } from './lib/validation';
import { envManager } from './lib/env';
import { logger } from './lib/logger';
import { ValidationError, OpenAIError } from './lib/errors';
import { PersonaData } from './lib/types';

class ProcessPersonaHandler extends BaseHandler {
  private openai: OpenAI;

  constructor() {
    super('process-persona');
    const config = envManager.get();
    this.openai = new OpenAI({ apiKey: config.openaiApiKey });
  }

  async handle(event: HandlerEvent, context: HandlerContext): Promise<any> {
    this.logRequest(event);

    try {
      if (event.httpMethod !== 'POST') {
        return this.createResponse(
          this.errorResponse(new Error('Method not allowed')),
          405
        );
      }

      const input = this.parseBody(event.body);
      const validatedInput = PersonaInputSchema.parse(input);

      logger.info('[process-persona] Input validated', {
        requestId: this.requestId,
        blockCount: validatedInput.textBlocks.length,
        linkCount: validatedInput.links.length,
      });

      const prompt = this.buildPrompt(validatedInput);
      const startTime = Date.now();

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Create structured JSON persona profiles from text information.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const processingTime = Date.now() - startTime;
      const responseText = response.choices[0]?.message?.content;

      if (!responseText) {
        throw new OpenAIError('No response from OpenAI');
      }

      const persona = this.parsePersonaResponse(responseText);
      const validatedPersona = PersonaResponseSchema.parse(persona);

      logger.info('[process-persona] Persona generated', {
        requestId: this.requestId,
        name: validatedPersona.name,
      });

      const responseBody: ApiResponseBody = this.successResponse({
        persona: validatedPersona,
        processingTime,
        tokensUsed: response.usage?.total_tokens || 0,
      });

      this.logResponse(200);
      return this.createResponse(responseBody, 200);
    } catch (error) {
      logger.error('[process-persona] Error', error as Error);
      this.logResponse(500);
      return this.createResponse(this.errorResponse(error), 500);
    }
  }

  private buildPrompt(input: { textBlocks: string[]; links: string[] }): string {
    let prompt = 'Analyze and create persona profile:\n\n';
    input.textBlocks.forEach((block) => {
      prompt += `${block}\n\n`;
    });
    if (input.links.length > 0) {
      prompt += 'References: ' + input.links.join(', ') + '\n';
    }
    return prompt;
  }

  private parsePersonaResponse(content: string): PersonaData {
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found');
      }
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        name: parsed.name || 'Unknown',
        age: parsed.age,
        occupation: parsed.occupation,
        background: parsed.background || '',
        personality: parsed.personality || '',
        traits: Array.isArray(parsed.traits) ? parsed.traits : [],
        interests: Array.isArray(parsed.interests) ? parsed.interests : [],
      };
    } catch (error) {
      throw new OpenAIError('Failed to parse response', 500);
    }
  }
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const processorHandler = new ProcessPersonaHandler();
  return processorHandler.handle(event, context);
};

export { handler };
