import { CreateUserDto, User } from '../interfaces/user.interface';

const users: User[] = [
  {
    id: 1,
    name: 'John',
    email: 'john@mail.com',
    username: 'john',
    password: '$2b$10$JptkIFp22UNJLqKRwd5ndefAPXXdhekzOpsQNtJC500It9CcXrsd6',
  },
  {
    id: 2,
    name: 'Jane',
    email: 'jane@mail.com',
    username: 'jane',
    password: '$2b$10$JptkIFp22UNJLqKRwd5ndefAPXXdhekzOpsQNtJC500It9CcXrsd6',
  },
];

export function createUser(createUserDto: CreateUserDto) {
  const newUser = {
    id: users.length + 1,
    ...createUserDto,
  };

  users.push(newUser);

  return newUser;
}

export function getAllUsers() {
  return users;
}

export function getUserById(id: number) {
  return users.find((user) => user.id === id);
}

export function getUserByEmail(email: string) {
  return users.find((user) => user.email === email);
}

export function getUserByUsername(username: string) {
  return users.find((user) => user.username === username);
}

export function getUserByEmailOrUsername(emailOrUsername: string) {
  return users.find(
    (user) =>
      user.email === emailOrUsername || user.username === emailOrUsername
  );
}

export function updateUser(id: number, updateUserDto: CreateUserDto) {
  const user = getUserById(id);

  if (!user) return null;

  const index = users.findIndex((user) => user.id === id);

  users[index] = {
    ...user,
    ...updateUserDto,
  };

  return users[index];
}

export function deleteUser(id: number) {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) return null;

  const deletedUsers = users.splice(index, 1);

  return deletedUsers[0];
}
