import { PaginationQuery } from './pagination.interface';

export interface User {
  id: number;
  fullname: string;
  email: string;
  username: string;
  password: string;
}

export interface CreateUserDto extends Omit<User, 'id'> {}

export interface UpdateUserDto extends Partial<CreateUserDto> {}

export interface GetAllUsersQuery extends PaginationQuery {
  name?: string;
}
