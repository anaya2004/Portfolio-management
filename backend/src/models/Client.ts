import mongoose, { Document, Schema } from 'mongoose';
import { config } from '../config';

export interface IClient extends Document {
  clientName: string;
  clientDescription: string;
  clientDesignation: string;
  clientImage: string;
  createdAt: Date;
  updatedAt: Date;
}

const clientSchema: Schema = new Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
      minlength: [2, 'Client name must be at least 2 characters long'],
      maxlength: [50, 'Client name cannot exceed 50 characters'],
    },
    clientDescription: {
      type: String,
      required: [true, 'Client description is required'],
      trim: true,
      minlength: [10, 'Client description must be at least 10 characters long'],
      maxlength: [300, 'Client description cannot exceed 300 characters'],
    },
    clientDesignation: {
      type: String,
      required: [true, 'Client designation is required'],
      trim: true,
      enum: {
        values: [
          'CEO', 
          'CTO', 
          'Web Developer', 
          'Designer', 
          'Product Manager', 
          'Marketing Manager',
          'Founder',
          'Director',
          'Senior Developer',
          'UI/UX Designer',
          'Other'
        ],
        message: 'Client designation must be a valid designation',
      },
    },
    clientImage: {
      type: String,
      required: [true, 'Client image is required'],
      validate: {
        validator: function (value: string) {
          return /\.(jpg|jpeg|png|webp)$/i.test(value);
        },
        message: 'Client image must be a valid image file (jpg, jpeg, png, webp)',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Add indexes for better query performance
clientSchema.index({ clientName: 1 });
clientSchema.index({ clientDesignation: 1 });
clientSchema.index({ createdAt: -1 });

// Virtual for image URL
clientSchema.virtual('imageUrl').get(function (this: IClient) {
  if (this.clientImage) {
    return `${config.BACKEND_URL}/uploads/clients/${this.clientImage}`;
  }
  return null;
});

// Ensure virtual fields are serialized
clientSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    const { _id, __v, ...rest } = ret;
    return rest;
  },
});

export default mongoose.model<IClient>('Client', clientSchema);
