import mongoose, { Document, Schema } from 'mongoose';
import { config } from '../config';

export interface IProject extends Document {
  projectName: string;
  projectDescription: string;
  projectImage: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema: Schema = new Schema(
  {
    projectName: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      minlength: [3, 'Project name must be at least 3 characters long'],
      maxlength: [100, 'Project name cannot exceed 100 characters'],
    },
    projectDescription: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      minlength: [10, 'Project description must be at least 10 characters long'],
      maxlength: [500, 'Project description cannot exceed 500 characters'],
    },
    projectImage: {
      type: String,
      required: [true, 'Project image is required'],
      validate: {
        validator: function (value: string) {
          return /\.(jpg|jpeg|png|webp)$/i.test(value);
        },
        message: 'Project image must be a valid image file (jpg, jpeg, png, webp)',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Add indexes for better query performance
projectSchema.index({ projectName: 1 });
projectSchema.index({ createdAt: -1 });

// Virtual for image URL
projectSchema.virtual('imageUrl').get(function (this: IProject) {
  if (this.projectImage) {
    return `${config.BACKEND_URL}/uploads/projects/${this.projectImage}`;
  }
  return null;
});

// Ensure virtual fields are serialized
projectSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    const { _id, __v, ...rest } = ret;
    return rest;
  },
});

export default mongoose.model<IProject>('Project', projectSchema);
