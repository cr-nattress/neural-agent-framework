/**
 * Environment variable validation and management
 */

export interface EnvironmentConfig {
  openaiApiKey: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseServiceRoleKey: string;
  nodeEnv: 'development' | 'production';
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

class EnvironmentManager {
  private config: EnvironmentConfig | null = null;

  validate(): EnvironmentConfig {
    if (this.config) {
      return this.config;
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const nodeEnv = (process.env.NODE_ENV || 'development') as 'development' | 'production';
    const logLevel = (process.env.LOG_LEVEL || 'info') as 'debug' | 'info' | 'warn' | 'error';

    const missing: string[] = [];

    if (\!openaiApiKey) missing.push("'OPENAI_API_KEY');
    if (\!supabaseUrl) missing.push("'SUPABASE_URL');
    if (\!supabaseAnonKey) missing.push("'SUPABASE_ANON_KEY');
    if (\!supabaseServiceRoleKey) missing.push("'SUPABASE_SERVICE_ROLE_KEY');

    if (missing.length > 0) {
      const message = `Missing required environment variables: ${missing.join("', ')}`;
      console.error(message);
      throw new Error(message);
    }

    this.config = {
      openaiApiKey: openaiApiKey\!,
      supabaseUrl: supabaseUrl\!,
      supabaseAnonKey: supabaseAnonKey\!,
      supabaseServiceRoleKey: supabaseServiceRoleKey\!,
      nodeEnv,
      logLevel,
    };

    return this.config;
  }

  get(): EnvironmentConfig {
    if (\!this.config) {
      return this.validate();
    }
    return this.config;
  }

  isDevelopment(): boolean {
    return this.get().nodeEnv === 'development';
  }

  isProduction(): boolean {
    return this.get().nodeEnv === 'production';
  }
}

export const envManager = new EnvironmentManager();
