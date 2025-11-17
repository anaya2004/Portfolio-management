import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';

interface ImageProcessingOptions {
  width: number;
  height: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

interface ProcessedImageResult {
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
  path: string;
}

export class ImageProcessor {
  private static uploadsDir = path.join(__dirname, '..', 'uploads');

  static async ensureUploadDirectories(): Promise<void> {
    const dirs = [
      path.join(this.uploadsDir, 'projects'),
      path.join(this.uploadsDir, 'clients'),
    ];

    for (const dir of dirs) {
      try {
        await fs.access(dir);
      } catch {
        await fs.mkdir(dir, { recursive: true });
      }
    }
  }

  static async processImage(
    buffer: Buffer,
    originalName: string,
    folder: 'projects' | 'clients',
    options: ImageProcessingOptions
  ): Promise<ProcessedImageResult> {
    try {
      await this.ensureUploadDirectories();

      // Generate unique filename
      const fileExtension = path.extname(originalName).toLowerCase();
      const baseName = path.basename(originalName, fileExtension);
      const uniqueFilename = `${baseName}-${uuidv4()}-${Date.now()}.webp`;
      const outputPath = path.join(this.uploadsDir, folder, uniqueFilename);

      // Process image with sharp
      const processedBuffer = await sharp(buffer)
        .resize(options.width, options.height, {
          fit: 'cover',
          position: 'center',
        })
        .webp({
          quality: options.quality || config.IMAGE_QUALITY,
        })
        .toBuffer();

      // Save processed image
      await fs.writeFile(outputPath, processedBuffer);

      // Get file stats
      const stats = await fs.stat(outputPath);

      return {
        filename: uniqueFilename,
        originalName,
        size: stats.size,
        mimetype: 'image/webp',
        path: outputPath,
      };
    } catch (error) {
      console.error('Error processing image:', error);
      throw new Error('Failed to process image');
    }
  }

  static async deleteImage(filename: string, folder: 'projects' | 'clients'): Promise<void> {
    try {
      const imagePath = path.join(this.uploadsDir, folder, filename);
      await fs.unlink(imagePath);
    } catch (error) {
      console.error('Error deleting image:', error);
      // Don't throw error if file doesn't exist
    }
  }

  static validateImageFile(file: any): string | null {
    const allowedTypes = config.ALLOWED_FILE_TYPES;
    const maxSize = config.MAX_FILE_SIZE;

    if (!file) {
      return 'No image file provided';
    }

    if (!allowedTypes.includes(file.mimetype)) {
      return 'Invalid file type. Only JPEG, PNG, and WebP images are allowed';
    }

    if (file.size > maxSize) {
      return `File size too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB`;
    }

    return null; // No validation errors
  }

  static getImageUrl(filename: string, folder: 'projects' | 'clients'): string {
    return `${config.BACKEND_URL}/uploads/${folder}/${filename}`;
  }
}
