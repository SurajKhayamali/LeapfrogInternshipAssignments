import { CreateUserDto } from './user';

export interface SignupDto extends CreateUserDto {}

export interface LoginDto {
  emailOrUsername: string;
  password: string;
}
