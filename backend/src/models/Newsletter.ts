import mongoose, { Document, Schema } from 'mongoose';

export interface INewsletter extends Document {
  emailAddress: string;
  subscribedAt: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const newsletterSchema: Schema = new Schema(
  {
    emailAddress: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
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
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Add indexes for better query performance
newsletterSchema.index({ emailAddress: 1 }, { unique: true });
newsletterSchema.index({ isActive: 1 });
newsletterSchema.index({ subscribedAt: -1 });

// Handle duplicate email error
newsletterSchema.post('save', function (error: any, doc: any, next: any) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const duplicateError = new Error('Email address is already subscribed to our newsletter');
    (duplicateError as any).status = 400;
    next(duplicateError);
  } else {
    next(error);
  }
});

// Ensure virtual fields are serialized
newsletterSchema.set('toJSON', {
  transform: function (doc, ret) {
    const { _id, __v, ...rest } = ret;
    return rest;
  },
});

export default mongoose.model<INewsletter>('Newsletter', newsletterSchema);
