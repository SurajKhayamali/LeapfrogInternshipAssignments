export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface CreateUserDto extends Omit<User, 'id'> {}

export interface UpdateUserDto extends Partial<CreateUserDto> {}
