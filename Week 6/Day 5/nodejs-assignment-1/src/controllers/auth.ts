import { NextFunction, Request, Response } from 'express';

import * as authService from '../services/auth';
import { LoginDto, SignupDto } from '../interfaces/auth';
import { extractJWTTokenFromRequest } from '../helpers/jwt.helper';
import { clearCookie, setCookie } from '../helpers/cookie.helper';

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

export async function handleLogin(
  req: Request<unknown, unknown, LoginDto>,
  res: Response,
  next: NextFunction
) {
  const loginDto = req.body;

  try {
    const result = await authService.handleLogin(loginDto);
    // console.log('User logged in:', user);

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

export async function handleRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const refreshToken = extractJWTTokenFromRequest(req, true);
  // console.log('Refresh token request:', refreshToken);
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

export async function handleLogout(req: Request, res: Response) {
  clearCookie(res);

  return res.json({
    message: 'Logout successful!',
  });
}
