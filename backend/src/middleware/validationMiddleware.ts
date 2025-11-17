import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// Validation schemas
export const projectValidationSchema = Joi.object({
  projectName: Joi.string()
    .min(3)
    .max(100)
    .trim()
    .required()
    .messages({
      'string.min': 'Project name must be at least 3 characters long',
      'string.max': 'Project name cannot exceed 100 characters',
      'any.required': 'Project name is required',
    }),
  projectDescription: Joi.string()
    .min(10)
    .max(500)
    .trim()
    .required()
    .messages({
      'string.min': 'Project description must be at least 10 characters long',
      'string.max': 'Project description cannot exceed 500 characters',
      'any.required': 'Project description is required',
    }),
});

export const clientValidationSchema = Joi.object({
  clientName: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      'string.min': 'Client name must be at least 2 characters long',
      'string.max': 'Client name cannot exceed 50 characters',
      'string.pattern.base': 'Client name must contain only letters and spaces',
      'any.required': 'Client name is required',
    }),
  clientDescription: Joi.string()
    .min(10)
    .max(300)
    .trim()
    .required()
    .messages({
      'string.min': 'Client description must be at least 10 characters long',
      'string.max': 'Client description cannot exceed 300 characters',
      'any.required': 'Client description is required',
    }),
  clientDesignation: Joi.string()
    .valid(
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
    )
    .required()
    .messages({
      'any.only': 'Client designation must be a valid designation',
      'any.required': 'Client designation is required',
    }),
});

export const contactValidationSchema = Joi.object({
  fullName: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      'string.min': 'Full name must be at least 2 characters long',
      'string.max': 'Full name cannot exceed 50 characters',
      'string.pattern.base': 'Full name must contain only letters and spaces',
      'any.required': 'Full name is required',
    }),
  emailAddress: Joi.string()
    .email()
    .max(100)
    .lowercase()
    .trim()
    .required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'string.max': 'Email address cannot exceed 100 characters',
      'any.required': 'Email address is required',
    }),
  mobileNumber: Joi.string()
    .pattern(/^[+]?[\d\s\-()]+$/)
    .min(10)
    .max(15)
    .trim()
    .required()
    .custom((value, helpers) => {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length < 10) {
        return helpers.message({ custom: 'Mobile number must have at least 10 digits' });
      }
      return value;
    })
    .messages({
      'string.pattern.base': 'Please enter a valid mobile number',
      'string.min': 'Mobile number must be at least 10 digits',
      'string.max': 'Mobile number cannot exceed 15 characters',
      'any.required': 'Mobile number is required',
    }),
  city: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .pattern(/^[a-zA-Z\s\-']+$/)
    .required()
    .messages({
      'string.min': 'City name must be at least 2 characters long',
      'string.max': 'City name cannot exceed 50 characters',
      'string.pattern.base': 'City name must contain only letters, spaces, hyphens, and apostrophes',
      'any.required': 'City is required',
    }),
});

export const newsletterValidationSchema = Joi.object({
  emailAddress: Joi.string()
    .email()
    .max(100)
    .lowercase()
    .trim()
    .required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'string.max': 'Email address cannot exceed 100 characters',
      'any.required': 'Email address is required',
    }),
});

// Generic validation middleware
export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessages = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errorMessages,
      });
    }

    req.body = value;
    return next();
  };
};
