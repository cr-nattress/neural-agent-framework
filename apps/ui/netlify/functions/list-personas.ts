/**
 * List Personas Function
 * EPIC-07: Supabase Storage Integration
 *
 * GET /.netlify/functions/list-personas?limit=20&offset=0
 *
 * List all saved personas with pagination
 */

import type { Handler, HandlerEvent, HandlerContext as NetlifyContext } from '@netlify/functions';
import { createHandler, getQueryParams } from './lib/base-handler';
import { listPersonas } from './lib/supabase';
import { handleError, ValidationError } from './lib/errors';
import { logger } from './lib/logger';
import type { ListPersonasResponse } from './lib/types';
import type { HandlerContext } from './lib/types';

/**
 * Handler for list-personas function
 */
async function handler(
  event: HandlerEvent,
  context: NetlifyContext,
  handlerContext: HandlerContext
): Promise<{ statusCode: number; body: string; headers?: Record<string, string> }> {
  const { requestId } = handlerContext;

  // Only accept GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        success: false,
        error: {
          code: 'METHOD_NOT_ALLOWED',
          message: 'Only GET requests are allowed',
          timestamp: new Date().toISOString(),
        },
      }),
    };
  }

  try {
    // Parse query parameters
    logger.debug('Parsing request parameters', { requestId });
    const params = getQueryParams(event);

    // Validate and parse pagination parameters
    const limit = Math.min(Math.max(parseInt(params.limit || '20', 10), 1), 100);
    const offset = Math.max(parseInt(params.offset || '0', 10), 0);

    if (isNaN(limit) || isNaN(offset)) {
      throw new ValidationError('Invalid pagination parameters');
    }

    logger.info('Listing personas', {
      requestId,
      limit,
      offset,
    });

    // Get personas from storage
    const { personas, total } = await listPersonas(limit, offset);

    logger.info('Personas listed successfully', {
      requestId,
      count: personas.length,
      total,
    });

    // Prepare response
    const response: ListPersonasResponse = {
      success: true,
      personas,
      pagination: {
        total,
        page: Math.floor(offset / limit) + 1,
        limit,
      },
    };

    return {
      statusCode: 200,
      body: JSON.stringify(response),
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    };
  } catch (error) {
    logger.error('Error listing personas', error instanceof Error ? error : null, {
      requestId,
    });

    const { response, statusCode } = handleError(error);
    return {
      statusCode,
      body: JSON.stringify(response),
    };
  }
}

/**
 * Export the handler with base handler wrapper
 */
export const functionHandler: Handler = createHandler('list-personas', handler);

// For local testing with netlify dev
export { functionHandler as default };
