import { Request, Response } from 'express';
import config from '../config';

const COOKIE_KEY = 'jwt';
const COOKIE_REFRESH_KEY = 'jwt-refresh';

const defaultCookieOptions = {
  httpOnly: true,
  secure: config.isProduction,
  signed: true,
  maxAge: config.cookieMaxAge,
};

export const getCookie = (
  req: Request,
  isRefreshCookie = false
): string | null => {
  let token = null;
  if (!req) return token;

  const cookies = defaultCookieOptions.signed ? req.signedCookies : req.cookies;

  if (cookies)
    token = cookies[isRefreshCookie ? COOKIE_REFRESH_KEY : COOKIE_KEY];

  return token;
};

export const setCookie = (
  res: Response,
  token: string,
  isRefreshCookie = false
) => {
  if (!isRefreshCookie)
    return res.cookie(COOKIE_KEY, token, defaultCookieOptions);

  res.cookie(COOKIE_REFRESH_KEY, token, {
    ...defaultCookieOptions,
    maxAge: config.cookieRefreshMaxAge,
  });
};

export const clearCookie = (res: Response) => {
  // res.clearCookie(isRefreshCookie ? COOKIE_REFRESH_KEY : COOKIE_KEY);
  res.clearCookie(COOKIE_REFRESH_KEY);
  res.clearCookie(COOKIE_KEY);
};
