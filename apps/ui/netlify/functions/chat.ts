/**
 * Chat Function - Handles chat interactions with personas
 */

import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';
import { BaseHandler, ApiResponseBody } from './lib/base-handler';
import { ChatRequestSchema } from './lib/validation';
import { envManager } from './lib/env';
import { logger } from './lib/logger';
import { NotFoundError, OpenAIError } from './lib/errors';

class ChatHandler extends BaseHandler {
  private openai: OpenAI;
  private supabase;

  constructor() {
    super('chat');
    const config = envManager.get();
    this.openai = new OpenAI({ apiKey: config.openaiApiKey });
    this.supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
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
      const validatedInput = ChatRequestSchema.parse(input);

      logger.info('[chat] Processing chat request', {
        requestId: this.requestId,
        personaId: validatedInput.personaId,
      });

      const { data: persona, error: personaError } = await this.supabase
        .from('personas')
        .select('*')
        .eq('id', validatedInput.personaId)
        .single();

      if (personaError || !persona) {
        return this.createResponse(
          this.errorResponse(new NotFoundError('Persona not found')),
          404
        );
      }

      const systemPrompt = `You are ${persona.name}. Personality: ${persona.personality}`;
      const messages = [
        ...validatedInput.conversationHistory,
        { role: 'user' as const, content: validatedInput.message },
      ];

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const chatResponse = response.choices[0]?.message?.content || '';

      const responseBody: ApiResponseBody = this.successResponse({
        response: chatResponse,
      });

      this.logResponse(200);
      return this.createResponse(responseBody, 200);
    } catch (error) {
      logger.error('[chat] Error', error as Error);
      const statusCode = error instanceof NotFoundError ? 404 : 500;
      this.logResponse(statusCode);
      return this.createResponse(this.errorResponse(error), statusCode);
    }
  }
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const chatHandler = new ChatHandler();
  return chatHandler.handle(event, context);
};

export { handler };
