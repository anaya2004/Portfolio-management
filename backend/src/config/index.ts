// Application Configuration (deployment-ready)
export const config = {
  // Server Configuration
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database Configuration - MongoDB Atlas (Cloud Database)
  MONGODB_URI: process.env.MONGODB_URI || 
    'mongodb+srv://ananyagupta6040_db_user:V2F34IQpf2kCkUiO@portfolio-management.i5fxvwi.mongodb.net/portfolio-db?retryWrites=true&w=majority',
  
  // CORS Configuration - Dynamic based on environment
  FRONTEND_URL: process.env.FRONTEND_URL || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://your-frontend-domain.com' 
      : 'http://localhost:3000'),
  
  // File Upload Configuration
  MAX_FILE_SIZE: 5242880, // 5MB in bytes
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  
  // Image Processing Configuration
  IMAGE_QUALITY: 80,
  PROJECT_IMAGE_WIDTH: 450,
  PROJECT_IMAGE_HEIGHT: 350,
  CLIENT_IMAGE_WIDTH: 150,
  CLIENT_IMAGE_HEIGHT: 150,
  
  // Backend URL for image URLs - Dynamic based on environment
  BACKEND_URL: process.env.BACKEND_URL || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://your-backend-domain.com' 
      : 'http://localhost:5000'),
} as const;

export default config;
