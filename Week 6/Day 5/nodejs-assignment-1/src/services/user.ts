import { CreateUserDto } from '../interfaces/user';
import * as User from '../model/user';

export async function createUser(createUserDto: CreateUserDto) {
  return User.createUser(createUserDto);
}

export async function getAllUsers() {
  return User.getAllUsers();
}

export async function getUserById(id: number) {
  return User.getUserById(id);
}

export async function getUserByEmail(email: string) {
  return User.getUserByEmail(email);
}

export async function getUserByUsername(username: string) {
  return User.getUserByUsername(username);
}

export async function getUserByEmailOrUsername(emailOrUsername: string) {
  return User.getUserByEmailOrUsername(emailOrUsername);
}

export async function updateUser(id: number, updateUserDto: CreateUserDto) {
  return User.updateUser(id, updateUserDto);
}

export async function deleteUser(id: number) {
  return User.deleteUser(id);
}
