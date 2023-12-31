import { compare, hash } from 'bcrypt';
import config from '../config';

export function hashPassowrd(password: string) {
  return hash(password, config.saltRounds);
}

export function comparePassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword);
}
