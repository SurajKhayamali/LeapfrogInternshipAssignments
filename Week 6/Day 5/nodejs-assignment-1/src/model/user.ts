import { User } from '../interfaces/user';

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
