/**
 * Get Persona Function
 * Retrieves a persona from Supabase by ID
 */

import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { BaseHandler, ApiResponseBody } from './lib/base-handler';
import { envManager } from './lib/env';
import { logger } from './lib/logger';
import { NotFoundError, StorageError } from './lib/errors';

class GetPersonaHandler extends BaseHandler {
  private supabase;

  constructor() {
    super('get-persona');
    const config = envManager.get();
    this.supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
  }

  async handle(event: HandlerEvent, context: HandlerContext): Promise<any> {
    this.logRequest(event);

    try {
      if (event.httpMethod !== 'GET') {
        return this.createResponse(
          this.errorResponse(new Error('Method not allowed')),
          405
        );
      }

      const personaId = event.queryStringParameters?.personaId;
      if (!personaId) {
        return this.createResponse(
          this.errorResponse(new NotFoundError('Persona ID is required')),
          400
        );
      }

      logger.info('[get-persona] Fetching persona', {
        requestId: this.requestId,
        personaId,
      });

      const { data, error } = await this.supabase
        .from('personas')
        .select('*')
        .eq('id', personaId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          logger.info('[get-persona] Persona not found', {
            requestId: this.requestId,
            personaId,
          });
          return this.createResponse(
            this.errorResponse(new NotFoundError('Persona not found')),
            404
          );
        }
        throw new StorageError(`Failed to fetch persona: ${error.message}`, 500);
      }

      logger.info('[get-persona] Persona retrieved', {
        requestId: this.requestId,
        personaId,
      });

      const responseBody: ApiResponseBody = this.successResponse({
        persona: data,
      });

      this.logResponse(200);
      return this.createResponse(responseBody, 200);
    } catch (error) {
      logger.error('[get-persona] Error', error as Error);
      const statusCode = error instanceof NotFoundError ? 404 : 500;
      this.logResponse(statusCode);
      return this.createResponse(this.errorResponse(error), statusCode);
    }
  }
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const getHandler = new GetPersonaHandler();
  return getHandler.handle(event, context);
};

export { handler };
