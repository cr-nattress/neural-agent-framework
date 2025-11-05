/**
 * Structured logging utility
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  error?: {
    message: string;
    stack?: string;
    code?: string;
  };
}

class Logger {
  private logLevel: LogLevel = 'info';

  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    const currentIndex = levels.indexOf(this.logLevel);
    const messageIndex = levels.indexOf(level);
    return messageIndex >= currentIndex;
  }

  private formatEntry(entry: LogEntry): string {
    return JSON.stringify(entry);
  }

  debug(message: string, context?: Record<string, any>): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatEntry({
        timestamp: new Date().toISOString(),
        level: 'debug',
        message,
        context,
      }));
    }
  }

  info(message: string, context?: Record<string, any>): void {
    if (this.shouldLog('info')) {
      console.log(this.formatEntry({
        timestamp: new Date().toISOString(),
        level: 'info',
        message,
        context,
      }));
    }
  }

  warn(message: string, context?: Record<string, any>): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatEntry({
        timestamp: new Date().toISOString(),
        level: 'warn',
        message,
        context,
      }));
    }
  }

  error(message: string, error?: Error, context?: Record<string, any>): void {
    if (this.shouldLog('error')) {
      console.error(this.formatEntry({
        timestamp: new Date().toISOString(),
        level: 'error',
        message,
        context,
        error: error ? {
          message: error.message,
          stack: error.stack,
          code: (error as any).code,
        } : undefined,
      }));
    }
  }
}

export const logger = new Logger();
