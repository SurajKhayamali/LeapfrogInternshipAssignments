import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 8000,
  saltRounds:
    (process.env.SALT_ROUNDS && Number(process.env.SALT_ROUNDS)) || 10,
};

export default config;
