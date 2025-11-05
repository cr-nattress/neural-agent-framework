/**
 * Custom error classes for API responses
 */

export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_URL = 'INVALID_URL',
  INVALID_JSON = 'INVALID_JSON',
  INPUT_TOO_LARGE = 'INPUT_TOO_LARGE',
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  AUTH_ERROR = 'AUTH_ERROR',
  OPENAI_ERROR = 'OPENAI_ERROR',
  OPENAI_RATE_LIMIT = 'OPENAI_RATE_LIMIT',
  OPENAI_TIMEOUT = 'OPENAI_TIMEOUT',
  STORAGE_ERROR = 'STORAGE_ERROR',
  STORAGE_FULL = 'STORAGE_FULL',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export interface ErrorDetails {
  code: ErrorCode;
  message: string;
  details?: unknown;
  statusCode: number;
}

export class ApiError extends Error {
  code: ErrorCode;
  statusCode: number;
  details?: unknown;

  constructor(code: ErrorCode, message: string, statusCode: number = 500, details?: unknown) {
    super(message);
    this.name = "'ApiError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: unknown) {'
    super(ErrorCode.VALIDATION_ERROR, message, 400, details);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {'
    super(ErrorCode.NOT_FOUND, message, 404);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class OpenAIError extends ApiError {
  constructor(message: string, statusCode: number = 500, details?: unknown) {'
    super(ErrorCode.OPENAI_ERROR, message, statusCode, details);
    this.name = 'OpenAIError';
    Object.setPrototypeOf(this, OpenAIError.prototype);
  }
}

export class StorageError extends ApiError {
  constructor(message: string, statusCode: number = 500, details?: unknown) {'
    super(ErrorCode.STORAGE_ERROR, message, statusCode, details);
    this.name = 'StorageError';
    Object.setPrototypeOf(this, StorageError.prototype);
  }
}

export class RateLimitError extends ApiError {
  constructor(message: string = 'Too many requests') {'
    super(ErrorCode.RATE_LIMIT_ERROR, message, 429);
    this.name = 'RateLimitError';
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}

export function getErrorStatusCode(code: ErrorCode): number {
  const statusMap: Record<ErrorCode, number> = {
    [ErrorCode.VALIDATION_ERROR]: 400,
    [ErrorCode.INVALID_URL]: 400,
    [ErrorCode.INVALID_JSON]: 400,
    [ErrorCode.INPUT_TOO_LARGE]: 413,
    [ErrorCode.NOT_FOUND]: 404,
    [ErrorCode.ALREADY_EXISTS]: 409,
    [ErrorCode.AUTH_ERROR]: 401,
    [ErrorCode.OPENAI_ERROR]: 500,
    [ErrorCode.OPENAI_RATE_LIMIT]: 429,
    [ErrorCode.OPENAI_TIMEOUT]: 504,
    [ErrorCode.STORAGE_ERROR]: 500,
    [ErrorCode.STORAGE_FULL]: 507,
    [ErrorCode.RATE_LIMIT_ERROR]: 429,
    [ErrorCode.INTERNAL_ERROR]: 500,
  };
  return statusMap[code] || 500;
}
