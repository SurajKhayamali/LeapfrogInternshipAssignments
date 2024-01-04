import Joi from 'joi';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../constants/pagination.constant';

export const todoCreateSchema = Joi.object({
  title: Joi.string().min(3).max(30).required().messages({
    'string.min': 'Title must be at least 3 characters long',
    'string.max': 'Title must be at most 30 characters long',
    'any.required': 'Title is required',
  }),
});

export const todoUpdateSchema = Joi.object({
  title: Joi.string().min(3).max(30).messages({
    'string.min': 'Title must be at least 3 characters long',
    'string.max': 'Title must be at most 30 characters long',
  }),
});

export const todoQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(DEFAULT_PAGE),
  size: Joi.number().integer().min(1).max(40).default(DEFAULT_PAGE_SIZE),
  searchTerm: Joi.string().min(3).max(30).messages({
    'string.min': 'Search term must be at least 3 characters long',
    'string.max': 'Search term must be at most 30 characters long',
  }),
  completed: Joi.boolean(),
});
