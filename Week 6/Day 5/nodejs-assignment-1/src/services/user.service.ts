import { buildMeta, getPaginationOptions } from '../helpers/pagination.helper';
import { CreateUserDto, GetAllUsersQuery } from '../interfaces/user.interface';
import { UserModel } from '../model/user.model';

/**
 * Create a new user
 *
 * @param createUserDto
 *
 * @returns user
 */
export async function create(createUserDto: CreateUserDto) {
  return UserModel.create(createUserDto);
}

/**
 * Get all users
 *
 * @returns users
 */
export async function getAll(query: GetAllUsersQuery) {
  const { page, size } = query;

  const pageDetails = getPaginationOptions({ page, size });

  const projectsPromise = UserModel.getAll({ ...pageDetails, ...query });
  const countPromise = UserModel.countAll(query);

  const [projects, count] = await Promise.all([projectsPromise, countPromise]);

  const total = count.count;
  const meta = buildMeta(total, size, page);

  return {
    data: projects,
    meta,
  };
}

/**
 * Get user by id
 *
 * @param id
 *
 * @returns user
 */
export async function getById(id: number) {
  return UserModel.getById(id);
}

/**
 * Get user by email
 *
 * @param email
 *
 * @returns user
 */
export async function getByEmail(email: string) {
  return UserModel.getByEmail(email);
}

/**
 * Get user by username
 *
 * @param username
 *
 * @returns user
 */
export async function getByUsername(username: string) {
  return UserModel.getByUsername(username);
}

/**
 * Get user by email or username
 *
 * @param emailOrUsername
 *
 * @returns user
 */
export async function getByEmailOrUsername(emailOrUsername: string) {
  return UserModel.getByEmailOrUsername(emailOrUsername);
}

/**
 * Update user by id
 *
 * @param id
 * @param updateUserDto
 *
 * @returns user
 */
export async function update(id: number, updateUserDto: CreateUserDto) {
  return UserModel.update(id, updateUserDto);
}

/**
 * Delete user by id
 *
 * @param id
 */
export async function remove(id: number) {
  return UserModel.remove(id);
}
