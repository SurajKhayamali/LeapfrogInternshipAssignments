import Joi from 'joi';

export const updateUserSchema = Joi.object({
  fullname: Joi.string().min(3).max(30).pattern(new RegExp('\\s')).messages({
    'string.min': 'Full name must be at least 3 characters long',
    'string.max': 'Full name must be at most 30 characters long',
    'string.pattern.base':
      'Full name must contain at least one space character',
    'any.required': 'Full name is required',
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
  password: Joi.string().min(8).messages({
    'string.min': 'Password must be at least 8 characters long',
    'any.required': 'Password is required',
  }),
});
