import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  fullName: string;
  emailAddress: string;
  mobileNumber: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters long'],
      maxlength: [50, 'Full name cannot exceed 50 characters'],
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z\s]+$/.test(value);
        },
        message: 'Full name must contain only letters and spaces',
      },
    },
    emailAddress: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Please enter a valid email address',
      },
      maxlength: [100, 'Email address cannot exceed 100 characters'],
    },
    mobileNumber: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      validate: {
        validator: function (value: string) {
          return /^[+]?[\d\s\-()]+$/.test(value) && value.replace(/\D/g, '').length >= 10;
        },
        message: 'Please enter a valid mobile number (minimum 10 digits)',
      },
      minlength: [10, 'Mobile number must be at least 10 digits'],
      maxlength: [15, 'Mobile number cannot exceed 15 characters'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      minlength: [2, 'City name must be at least 2 characters long'],
      maxlength: [50, 'City name cannot exceed 50 characters'],
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z\s\-']+$/.test(value);
        },
        message: 'City name must contain only letters, spaces, hyphens, and apostrophes',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Add indexes for better query performance
contactSchema.index({ emailAddress: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ city: 1 });

// Ensure virtual fields are serialized
contactSchema.set('toJSON', {
  transform: function (doc, ret) {
    const { _id, __v, ...rest } = ret;
    return rest;
  },
});

export default mongoose.model<IContact>('Contact', contactSchema);
