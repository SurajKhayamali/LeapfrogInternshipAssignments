import { PEOPLE } from '../constants/database.constant';
import { CreateUserDto, UpdateUserDto } from '../interfaces/user.interface';
import BaseModel from './base.model';

export class UserModel extends BaseModel {
  /**
   * Select fields for user
   */
  static readonly selectFields = {
    id: 'id',
    fullname: 'fullname',
    username: 'username',
    email: 'email',
  };

  /**
   * Create a new user
   *
   * @param createUserDto
   *
   * @returns user
   */
  static async create(createUserDto: CreateUserDto) {
    const result = await this.queryBuilder()
      .insert(createUserDto)
      .table(PEOPLE)
      .returning('id');

    return result?.[0];
  }

  /**
   * Get all users
   *
   * @returns users
   */
  static async getAll() {
    return this.queryBuilder().select(this.selectFields).from(PEOPLE);
  }

  /**
   * Get user by id
   *
   * @param id
   *
   * @returns user
   */
  static async getById(id: number) {
    return this.queryBuilder()
      .select(this.selectFields)
      .from(PEOPLE)
      .where({ id })
      .first();
  }

  /**
   * Get user by email
   *
   * @param email
   *
   * @returns user
   */
  static async getByEmail(email: string) {
    return this.queryBuilder()
      .select({
        id: 'id',
        fullname: 'fullname',
        password: 'password',
        email: 'email',
      })
      .from(PEOPLE)
      .where({ email })
      .first();
  }

  /**
   * Get user by username
   *
   * @param username
   *
   * @returns user
   */
  static async getByUsername(username: string) {
    return this.queryBuilder()
      .select(this.selectFields)
      .from(PEOPLE)
      .where({ username })
      .first();
  }

  /**
   * Get user by email or username
   *
   * @param emailOrUsername
   *
   * @returns user
   */
  static async getByEmailOrUsername(emailOrUsername: string) {
    return this.queryBuilder()
      .select(this.selectFields)
      .from(PEOPLE)
      .where({ email: emailOrUsername })
      .orWhere({ username: emailOrUsername })
      .first();
  }

  /**
   * Update user
   *
   * @param id
   * @param updateUserDto
   *
   * @returns user
   */
  static async update(id: number, updateUserDto: UpdateUserDto) {
    return this.queryBuilder()
      .update(updateUserDto)
      .table(PEOPLE)
      .where({ id });
  }

  /**
   * Delete user
   *
   * @param id
   *
   * @returns user
   */
  static async remove(id: number) {
    return this.queryBuilder().table(PEOPLE).where({ id }).del();
  }
}
