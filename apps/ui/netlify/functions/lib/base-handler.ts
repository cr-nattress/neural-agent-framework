/**
 * Base handler class for all Netlify Functions
 */

import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { nanoid } from 'nanoid';
import { ApiError, ErrorCode, getErrorStatusCode } from './errors';
import { logger } from './logger';
import { envManager } from './env';

export interface ApiResponseBody<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
    timestamp: string;
  };
}

export abstract class BaseHandler {
  protected functionName: string;
  protected requestId: string;
  protected startTime: number;

  constructor(functionName: string) {
    this.functionName = functionName;
    this.requestId = nanoid();
    this.startTime = Date.now();
  }

  /**
   * Execute the handler with automatic error catching
   */
  protected async executeHandler(
    handler: (event: HandlerEvent, context: HandlerContext) => Promise<any>
  ): Promise<{ statusCode: number; body: string }> {
    try {
      // Validate environment on first call
      envManager.validate();

      const result = await handler;
      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Respond with success
   */
  protected successResponse<T>(data: T, statusCode: number = 200): ApiResponseBody<T> {
    return {
      success: true,
      data,
    };
  }

  /**
   * Respond with error
   */
  protected errorResponse(error: unknown): ApiResponseBody {
    const apiError = this.normalizeError(error);

    logger.error(`[${this.functionName}] ${apiError.message}`, error as Error);

    return {
      success: false,
      error: {
        code: apiError.code,
        message: apiError.message,
        details: envManager.isDevelopment() ? apiError.details : undefined,
        timestamp: new Date().toISOString(),
      },
    };
  }

  /**
   * Normalize different error types to ApiError
   */
  private normalizeError(error: unknown): ApiError {
    if (error instanceof ApiError) {
      return error;
    }

    if (error instanceof Error) {
      return new ApiError(
        ErrorCode.INTERNAL_ERROR,
        error.message,
        500,
        envManager.isDevelopment() ? { stack: error.stack } : undefined
      );
    }

    return new ApiError(
      ErrorCode.INTERNAL_ERROR,
      'An unexpected error occurred',
      500,
      envManager.isDevelopment() ? { raw: error } : undefined
    );
  }

  /**
   * Handle errors and return proper response
   */
  private handleError(error: unknown): { statusCode: number; body: string } {
    const apiError = this.normalizeError(error);
    const statusCode = apiError.statusCode;

    logger.error(
      `[${this.functionName}] Error: ${apiError.message}`,
      error instanceof Error ? error : new Error(String(error))
    );

    const response: ApiResponseBody = {
      success: false,
      error: {
        code: apiError.code,
        message: apiError.message,
        details: envManager.isDevelopment() ? apiError.details : undefined,
        timestamp: new Date().toISOString(),
      },
    };

    return {
      statusCode,
      body: JSON.stringify(response),
    };
  }

  /**
   * Log function execution
   */
  protected logRequest(event: HandlerEvent): void {
    logger.info(`[${this.functionName}] Incoming request`, {
      requestId: this.requestId,
      method: event.httpMethod,
      path: event.path,
      hasBody: !!event.body,
    });
  }

  /**
   * Log function completion
   */
  protected logResponse(statusCode: number): void {
    const duration = Date.now() - this.startTime;
    logger.info(`[${this.functionName}] Response sent`, {
      requestId: this.requestId,
      statusCode,
      duration: `${duration}ms`,
    });
  }

  /**
   * Parse JSON body safely
   */
  protected parseBody<T>(body: string | null): T {
    if (!body) {
      throw new ApiError(ErrorCode.INVALID_JSON, 'Request body is required', 400);
    }

    try {
      return JSON.parse(body) as T;
    } catch (error) {
      throw new ApiError(
        ErrorCode.INVALID_JSON,
        'Invalid JSON in request body',
        400,
        { originalError: error instanceof Error ? error.message : String(error) }
      );
    }
  }

  /**
   * Get request headers
   */
  protected getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'X-Request-ID': this.requestId,
    };
  }

  /**
   * Create a response with proper headers
   */
  protected createResponse<T>(
    data: ApiResponseBody<T>,
    statusCode: number = 200
  ): { statusCode: number; headers: Record<string, string>; body: string } {
    return {
      statusCode,
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    };
  }
}
