import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 8000,
  saltRounds:
    (process.env.SALT_ROUNDS && Number(process.env.SALT_ROUNDS)) || 10,

  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '5m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',

  cookieSecret: process.env.COOKIE_SECRET || 'secret',
  cookieMaxAge:
    (process.env.SALT_ROUNDS && Number(process.env.COOKIE_MAX_AGE)) ||
    1000 * 60 * 5, // 5 minutes in milliseconds
  cookieRefreshMaxAge:
    (process.env.SALT_ROUNDS && Number(process.env.COOKIE_REFRESH_MAX_AGE)) ||
    1000 * 60 * 60 * 24 * 30, // 1 month in milliseconds

  isProduction: process.env.NODE_ENV === 'production',
};

export default config;
