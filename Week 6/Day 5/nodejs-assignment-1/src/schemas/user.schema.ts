import Joi from 'joi';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../constants/pagination.constant';

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

export const queryUserSchema = Joi.object({
  page: Joi.number().integer().min(1).default(DEFAULT_PAGE).messages({
    'number.min': 'Page must be at least 1',
  }),
  size: Joi.number()
    .integer()
    .min(1)
    .max(40)
    .default(DEFAULT_PAGE_SIZE)
    .messages({
      'number.min': 'Size must be at least 1',
      'number.max': 'Size must be at most 40',
    }),
  name: Joi.string().max(30).messages({
    'string.max': 'Name must be at most 30 characters long',
  }),
});
