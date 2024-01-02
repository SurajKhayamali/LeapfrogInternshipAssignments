import Joi from 'joi';

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
