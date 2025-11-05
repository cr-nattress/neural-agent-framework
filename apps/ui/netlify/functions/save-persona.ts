/**
 * Save Persona Function
 * Saves a persona to Supabase storage
 */

import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { BaseHandler, ApiResponseBody } from './lib/base-handler';
import { SavePersonaSchema } from './lib/validation';
import { envManager } from './lib/env';
import { logger } from './lib/logger';
import { ValidationError, StorageError } from './lib/errors';
import { nanoid } from 'nanoid';

class SavePersonaHandler extends BaseHandler {
  private supabase;

  constructor() {
    super('save-persona');
    const config = envManager.get();
    this.supabase = createClient(config.supabaseUrl, config.supabaseServiceRoleKey);
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
      const validatedInput = SavePersonaSchema.parse(input);

      const personaId = nanoid();
      const now = new Date().toISOString();

      const personaData = {
        ...validatedInput.persona,
        id: personaId,
        createdAt: now,
        updatedAt: now,
      };

      logger.info('[save-persona] Saving persona', {
        requestId: this.requestId,
        personaId,
        name: personaData.name,
      });

      const { data, error } = await this.supabase
        .from('personas')
        .insert([personaData])
        .select();

      if (error) {
        logger.error('[save-persona] Supabase error', new Error(error.message));
        throw new StorageError(`Failed to save persona: ${error.message}`, 500);
      }

      logger.info('[save-persona] Persona saved successfully', {
        requestId: this.requestId,
        personaId,
      });

      const responseBody: ApiResponseBody = this.successResponse({
        personaId,
        savedAt: now,
      });

      this.logResponse(201);
      return this.createResponse(responseBody, 201);
    } catch (error) {
      logger.error('[save-persona] Error', error as Error);
      const statusCode = error instanceof ValidationError ? 400 : 500;
      this.logResponse(statusCode);
      return this.createResponse(this.errorResponse(error), statusCode);
    }
  }
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const saveHandler = new SavePersonaHandler();
  return saveHandler.handle(event, context);
};

export { handler };
