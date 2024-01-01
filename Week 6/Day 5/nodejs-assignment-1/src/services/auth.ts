import { LoginDto, SignupDto } from '../interfaces/auth';
import * as userService from './user';
import { HttpException } from '../exceptions';
import {
  comparePassword,
  hashPassowrd,
} from '../helpers/passwordHasher.helper';
import {
  generateJWTTokens,
  reGenerateJWTTokens,
  verifyJWT,
} from '../helpers/jwt.helper';
import { JsonWebTokenError } from 'jsonwebtoken';

export async function handleSignup(signupDto: SignupDto) {
  const { password, ...rest } = signupDto;
  const hashedPassword = await hashPassowrd(password);

  const user = await userService.createUser({
    ...rest,
    password: hashedPassword,
  });

  return generateJWTTokens({ userId: user.id });
}

export async function handleLogin(loginDto: LoginDto) {
  const { emailOrUsername, password } = loginDto;
  const user = await userService.getUserByEmailOrUsername(emailOrUsername);

  if (!user) {
    throw new HttpException(401, 'User not found!');
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new HttpException(401, 'Invalid password!');
  }

  return generateJWTTokens({ userId: user.id });
}

export async function handleRefreshToken(refreshToken: string) {
  try {
    const payload = verifyJWT(refreshToken);
    // console.log('Payload:', payload);

    if (payload.tokenType !== 'refresh') throw new Error('Invalid token type!');

    return reGenerateJWTTokens(payload);
    // return userService.getAllUsers();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new HttpException(401, error.message);
    }

    throw new HttpException(
      401,
      (error as Error)?.message || 'Invalid refresh token!'
    );
  }
}
