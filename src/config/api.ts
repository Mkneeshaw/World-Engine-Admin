/**
 * API Configuration
 * Loads from environment variables
 */

export const API_CONFIG = {
  // Base URL for the API server
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',

  // API version prefix
  API_PREFIX: import.meta.env.VITE_API_V1_PREFIX || '/api/v1',

  // Full API URL
  get API_URL() {
    return `${this.BASE_URL}${this.API_PREFIX}`;
  },

  // Environment
  ENV: import.meta.env.VITE_ENV || 'development',

  // Debug mode
  DEBUG: import.meta.env.VITE_DEBUG === 'true',
} as const;

// Helper to get full endpoint URL
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_CONFIG.API_URL}/${cleanEndpoint}`;
};

// Log configuration in development
if (API_CONFIG.DEBUG) {
  console.log('API Configuration:', {
    BASE_URL: API_CONFIG.BASE_URL,
    API_PREFIX: API_CONFIG.API_PREFIX,
    API_URL: API_CONFIG.API_URL,
    ENV: API_CONFIG.ENV,
  });
}
