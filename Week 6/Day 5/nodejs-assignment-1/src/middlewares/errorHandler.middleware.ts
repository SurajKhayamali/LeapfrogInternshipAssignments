import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions';

export async function errorHandlerMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { statusCode, message } = error;
  // console.log('Catched Error:', error);

  if (response.headersSent) {
    return next(error);
  }

  return response.status(statusCode || 500).json({
    error: message || 'Something went wrong!',
  });
}
