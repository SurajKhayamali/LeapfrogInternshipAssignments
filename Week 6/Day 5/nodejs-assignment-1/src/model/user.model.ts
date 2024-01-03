import { CreateUserDto, User } from '../interfaces/user.interface';

const users: User[] = [
  {
    id: 1,
    fullname: 'John Doe',
    email: 'john@mail.com',
    username: 'john',
    password: '$2b$10$JptkIFp22UNJLqKRwd5ndefAPXXdhekzOpsQNtJC500It9CcXrsd6',
  },
  {
    id: 2,
    fullname: 'Jane Doe',
    email: 'jane@mail.com',
    username: 'jane',
    password: '$2b$10$JptkIFp22UNJLqKRwd5ndefAPXXdhekzOpsQNtJC500It9CcXrsd6',
  },
];

/**
 * Create a new user
 *
 * @param createUserDto
 *
 * @returns user
 */
export function createUser(createUserDto: CreateUserDto) {
  const newUser = {
    id: users.length + 1,
    ...createUserDto,
  };

  users.push(newUser);

  return newUser;
}

/**
 * Get all users
 *
 * @returns users
 */
export function getAllUsers() {
  return users;
}

/**
 * Get user by id
 *
 * @param id
 *
 * @returns user
 */
export function getUserById(id: number) {
  return users.find((user) => user.id === id);
}

/**
 * Get user by email
 *
 * @param email
 *
 * @returns user
 */
export function getUserByEmail(email: string) {
  return users.find((user) => user.email === email);
}

/**
 * Get user by username
 *
 * @param username
 *
 * @returns user
 */
export function getUserByUsername(username: string) {
  return users.find((user) => user.username === username);
}

/**
 * Get user by email or username
 *
 * @param emailOrUsername
 *
 * @returns user
 */
export function getUserByEmailOrUsername(emailOrUsername: string) {
  return users.find(
    (user) =>
      user.email === emailOrUsername || user.username === emailOrUsername
  );
}

/**
 * Update user
 *
 * @param id
 * @param updateUserDto
 *
 * @returns user
 */
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

/**
 * Delete user
 *
 * @param id
 *
 * @returns user
 */
export function deleteUser(id: number) {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) return null;

  const deletedUsers = users.splice(index, 1);

  return deletedUsers[0];
}
