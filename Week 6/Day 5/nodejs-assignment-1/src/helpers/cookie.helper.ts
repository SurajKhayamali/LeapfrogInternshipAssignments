import { Response } from 'express';
import config from '../config';

const COOKIE_KEY = 'jwt';
const COOKIE_REFRESH_KEY = 'jwt-refresh';

export const getCookie = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cookies: any,
  isRefreshCookie = false
): string | null => {
  let token = null;
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
    return res.cookie(COOKIE_KEY, token, {
      maxAge: config.cookieMaxAge,
    });

  res.cookie(COOKIE_REFRESH_KEY, token, {
    maxAge: config.cookieRefreshMaxAge,
  });
};

export const clearCookie = (res: Response) => {
  // res.clearCookie(isRefreshCookie ? COOKIE_REFRESH_KEY : COOKIE_KEY);
  res.clearCookie(COOKIE_REFRESH_KEY);
  res.clearCookie(COOKIE_KEY);
};
