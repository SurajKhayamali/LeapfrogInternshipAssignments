import { PEOPLE, TODOS } from '../constants/database.constant';
import {
  CreateTodoDto,
  QueryTodoDto,
  UpdateTodoDto,
} from '../interfaces/todo.interface';
import BaseModel from './base.model';

export class TodoModel extends BaseModel {
  /**
   * Create todo
   *
   * @param createTodoDto
   *
   * @returns todo
   */
  static async create(createTodoDto: CreateTodoDto) {
    const result = await this.queryBuilder()
      .insert(createTodoDto)
      .table(TODOS)
      .returning('id');

    return result?.[0];
  }

  /**
   * Get all todos
   *
   * @returns todos
   */
  static async getAll() {
    return this.queryBuilder()
      .select({
        id: 't.id',
        title: 't.title',
        completed: 't.completed',
        createdBy: 'uC.fullname',
        updatedBy: 'uU.fullname',
      })
      .from({ t: TODOS })
      .leftJoin({ uC: PEOPLE }, 'uC.id', 't.createdBy')
      .leftJoin({ uU: PEOPLE }, 'uU.id', 't.updatedBy');
  }

  /**
   * Get filtered todos
   *
   * @param queryTodoDto
   *
   * @returns todos
   */
  static async getFiltered(queryTodoDto: QueryTodoDto) {
    const { searchTerm, completed, page, size } = queryTodoDto;

    const query = this.queryBuilder()
      .select({
        id: 't.id',
        title: 't.title',
        completed: 't.completed',
        createdBy: 'uC.fullname',
        updatedBy: 'uU.fullname',
      })
      .from({ t: TODOS });

    query.offset(size * (page - 1)).limit(size);

    if (searchTerm) {
      query.whereILike('title', `%${searchTerm}%`);
    }

    if (completed !== undefined) {
      query.where({ completed });
    }

    return query
      .leftJoin({ uC: PEOPLE }, 'uC.id', 't.createdBy')
      .leftJoin({ uU: PEOPLE }, 'uU.id', 't.updatedBy');
  }

  /**
   * Count all todos
   *
   * @param queryTodoDto
   */
  static countAll(queryTodoDto: QueryTodoDto) {
    const { searchTerm, completed } = queryTodoDto;

    const query = this.queryBuilder()
      .table(TODOS)
      .count({ count: 'id' })
      .first();

    if (searchTerm) {
      query.whereILike('title', `%${searchTerm}%`);
    }

    if (completed !== undefined) {
      query.where({ completed });
    }

    return query;
  }

  /**
   * Get todo by id
   *
   * @param id
   *
   * @returns todo
   */
  static async getById(id: number) {
    return this.queryBuilder()
      .select({
        id: 't.id',
        title: 't.title',
        completed: 't.completed',
        createdBy: 'uC.fullname',
        updatedBy: 'uU.fullname',
      })
      .from({ t: TODOS })
      .where({ 't.id': id })
      .first()
      .leftJoin({ uC: PEOPLE }, 'uC.id', 't.createdBy')
      .leftJoin({ uU: PEOPLE }, 'uU.id', 't.updatedBy');
  }

  /**
   * Update todo by id
   *
   * @param id
   * @param updateTodoDto
   *
   * @returns todo
   */
  static async update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.queryBuilder().update(updateTodoDto).table(TODOS).where({ id });
  }

  /**
   * Update todo completed by id
   *
   * @param id
   * @param completed
   *
   * @returns todo
   */
  static async updateCompleted(
    id: number,
    completed: boolean,
    updatedBy: number
  ) {
    return this.queryBuilder()
      .update({ completed, updatedBy })
      .table(TODOS)
      .where({ id });
  }

  /**
   * Delete todo by id
   *
   * @param id
   *
   * @returns todo
   */
  static async remove(id: number) {
    return this.queryBuilder().table(TODOS).where({ id }).del();
  }
}
