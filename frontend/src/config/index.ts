// Frontend Configuration (deployment-ready)
const getApiBaseUrl = () => {
  // For production, use relative URLs or environment variables
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_URL || '/api';
  }
  // For development
  return process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
};

const getBackendUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_BACKEND_URL || '';
  }
  return process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
};

export const config = {
  // API Configuration (deployment-ready)
  API_BASE_URL: getApiBaseUrl(),
  
  // Backend Configuration
  BACKEND_URL: getBackendUrl(),
  
  // App Configuration
  APP_NAME: 'Portfolio Management System',
  APP_VERSION: '1.0.0',
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // API Timeout
  API_TIMEOUT: 10000, // 10 seconds
  
  // File Upload Limits (must match backend)
  MAX_FILE_SIZE: 5242880, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  
} as const;

export default config;
