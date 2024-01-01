import { CreateUserDto } from '../interfaces/user.interface';
import * as User from '../model/user.model';

/**
 * Create a new user
 *
 * @param createUserDto
 *
 * @returns user
 */
export async function createUser(createUserDto: CreateUserDto) {
  return User.createUser(createUserDto);
}

/**
 * Get all users
 *
 * @returns users
 */
export async function getAllUsers() {
  return User.getAllUsers();
}

/**
 * Get user by id
 *
 * @param id
 *
 * @returns user
 */
export async function getUserById(id: number) {
  return User.getUserById(id);
}

/**
 * Get user by email
 *
 * @param email
 *
 * @returns user
 */
export async function getUserByEmail(email: string) {
  return User.getUserByEmail(email);
}

/**
 * Get user by username
 *
 * @param username
 *
 * @returns user
 */
export async function getUserByUsername(username: string) {
  return User.getUserByUsername(username);
}

/**
 * Get user by email or username
 *
 * @param emailOrUsername
 *
 * @returns user
 */
export async function getUserByEmailOrUsername(emailOrUsername: string) {
  return User.getUserByEmailOrUsername(emailOrUsername);
}

/**
 * Update user by id
 *
 * @param id
 * @param updateUserDto
 *
 * @returns user
 */
export async function updateUser(id: number, updateUserDto: CreateUserDto) {
  return User.updateUser(id, updateUserDto);
}

/**
 * Delete user by id
 *
 * @param id
 */
export async function deleteUser(id: number) {
  return User.deleteUser(id);
}
