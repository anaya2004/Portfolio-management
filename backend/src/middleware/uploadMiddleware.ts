import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { ImageProcessor } from '../utils/imageProcessor';
import { config } from '../config';

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const validationError = ImageProcessor.validateImageFile(file);
  
  if (validationError) {
    cb(new Error(validationError));
    return;
  }
  
  cb(null, true);
};

// Create multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.MAX_FILE_SIZE,
    files: 1,
  },
});

// Single file upload middleware
export const uploadSingleImage = upload.single('image');

// Error handling middleware for multer
export const handleUploadError = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof multer.MulterError) {
    let message = 'File upload error';
    
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        message = `File too large. Maximum size is ${Math.round(
          config.MAX_FILE_SIZE / 1024 / 1024
        )}MB`;
        break;
      case 'LIMIT_FILE_COUNT':
        message = 'Too many files. Only one file is allowed';
        break;
      case 'LIMIT_UNEXPECTED_FILE':
        message = 'Unexpected field name. Use "image" as the field name';
        break;
      default:
        message = error.message;
    }
    
    return res.status(400).json({
      status: 'error',
      message,
    });
  }
  
  if (error.message.includes('validation')) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
  
  return next(error);
};
