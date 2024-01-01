import { sign, verify } from 'jsonwebtoken';
import { IncomingHttpHeaders } from 'http';
import { Request } from 'express';

import config from '../config';
import { JwtPayload } from '../interfaces/jwt.interface';
import { getCookie } from './cookie.helper';

export function signJWT(
  payload: JwtPayload,
  expiresIn: number | string = config.jwtExpiresIn
) {
  return sign(payload, config.jwtSecret, {
    expiresIn,
  });
}

export function verifyJWT(token: string) {
  return verify(token, config.jwtSecret) as JwtPayload;
}

export function generateJWTTokens(payload: JwtPayload) {
  const accessToken = signJWT({ ...payload, tokenType: 'access' });
  const refreshToken = signJWT(
    { ...payload, tokenType: 'refresh' },
    config.jwtRefreshExpiresIn
  );

  return { accessToken, refreshToken };
}

export function reGenerateJWTTokens(payload: JwtPayload) {
  delete payload.iat;
  delete payload.exp;
  delete payload.tokenType;

  return generateJWTTokens(payload);
}

function extractJWTTokenFromRequestHeaders(headers: IncomingHttpHeaders) {
  const authHeader = headers.authorization;
  const token = authHeader?.split(' ')?.[1];

  return token || null;
}

export function extractJWTTokenFromRequest(
  req: Request,
  isRefreshToken = false
) {
  let token = extractJWTTokenFromRequestHeaders(req.headers);

  if (!token) {
    token = getCookie(req, isRefreshToken);
  }

  return token;
}
