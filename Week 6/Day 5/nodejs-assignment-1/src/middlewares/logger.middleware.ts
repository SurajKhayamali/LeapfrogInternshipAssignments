import { NextFunction, Request, Response } from 'express';

/**
 * Logger middleware
 *
 * @param request
 * @param response
 * @param next
 */
export function loggerMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(`${request.method} ${request.path}`);
  next();
}
