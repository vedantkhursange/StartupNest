// API URL configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL 

// Helper function to get full API URL
export const getApiUrl = (endpoint: string) => {
  return `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};