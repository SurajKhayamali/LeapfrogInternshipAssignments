import { NextFunction, Request, Response } from 'express';

import * as authService from '../services/auth.service';
import { LoginDto, SignupDto } from '../interfaces/auth.interface';
import { extractJWTTokenFromRequest } from '../helpers/jwt.helper';
import { clearCookie, setCookie } from '../helpers/cookie.helper';

/**
 * Handle signup request
 *
 * @param req
 * @param res
 */
export async function handleSignup(
  req: Request<unknown, unknown, SignupDto>,
  res: Response
) {
  const signupDto = req.body;

  const result = await authService.handleSignup(signupDto);

  setCookie(res, result.accessToken);
  setCookie(res, result.refreshToken, true);

  return res.json({
    message: 'Signup successful!',
    data: result,
  });
}

/**
 * Handle login request
 *
 * @param req
 * @param res
 * @param next
 */
export async function handleLogin(
  req: Request<unknown, unknown, LoginDto>,
  res: Response,
  next: NextFunction
) {
  const loginDto = req.body;

  try {
    const result = await authService.handleLogin(loginDto);

    setCookie(res, result.accessToken);
    setCookie(res, result.refreshToken, true);

    return res.json({
      message: 'Login successful!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handle refresh token request
 *
 * @param req
 * @param res
 * @param next
 */
export async function handleRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const refreshToken = extractJWTTokenFromRequest(req, true);
  if (!refreshToken) return next(new Error('Refresh token not found!'));

  try {
    const result = await authService.handleRefreshToken(refreshToken);

    setCookie(res, result.accessToken);
    setCookie(res, result.refreshToken, true);

    return res.json({
      message: 'Token refreshed!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handle logout request
 *
 * @param req
 * @param res
 */
export async function handleLogout(req: Request, res: Response) {
  clearCookie(res);

  return res.json({
    message: 'Logout successful!',
  });
}
