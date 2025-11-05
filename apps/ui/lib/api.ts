/**
 * API Utilities
 * Helper functions for API calls across the application
 */

/**
 * Get the base URL for API calls
 * 
 * In development with Netlify Dev:
 * - Next.js UI runs on port 3001
 * - Netlify Dev runs on port 8889 with function proxying
 * - API calls must go to port 8889 to reach the functions
 *
 * In production:
 * - Both UI and functions are served from the same domain
 * - Use relative URLs (empty baseUrl)
 */
export function getApiBaseUrl(): string {
  // Check if we're in development by looking for localhost
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    // In development, Netlify Dev serves both the framework and functions
    // If we're on the UI port (3000-3999), redirect to the Netlify Dev port (8889)
    const currentPort = window.location.port;
    if (currentPort && parseInt(currentPort) >= 3000 && parseInt(currentPort) <= 3999) {
      // This is the Next.js dev server, API calls must go to Netlify Dev on 8889
      return "http://localhost:8889";
    }
  }

  // In production or when already on Netlify Dev port, use relative URLs
  return "";
}

/**
 * Make an API call with proper base URL handling
 */
export async function apiCall(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  return fetch(url, options);
}
