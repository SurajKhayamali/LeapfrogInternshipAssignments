import Joi from 'joi';

export const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(30).regex(/\s/).required().messages({
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be at most 30 characters long',
    'string.pattern.base': 'Name must be a full name, with a space in between',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Email must be a valid email',
  }),
  username: Joi.string()
    .min(3)
    .max(20)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .messages({
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username must be at most 20 characters long',
      'string.pattern.base':
        'Username must contain only alphanumeric characters',
    }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'any.required': 'Password is required',
  }),
});
