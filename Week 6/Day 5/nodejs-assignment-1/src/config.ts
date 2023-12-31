import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 8000,
  saltRounds:
    (process.env.SALT_ROUNDS && Number(process.env.SALT_ROUNDS)) || 10,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '5m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  cookieMaxAge: process.env.COOKIE_MAX_AGE
    ? parseInt(process.env.COOKIE_MAX_AGE, 10)
    : 60 * 5, // 5 minutes in seconds
  cookieRefreshMaxAge: process.env.COOKIE_REFRESH_MAX_AGE
    ? parseInt(process.env.COOKIE_REFRESH_MAX_AGE, 10)
    : 60 * 60 * 24 * 30, // 1 month in seconds
};

export default config;
