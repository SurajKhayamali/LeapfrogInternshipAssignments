import { Knex } from 'knex';
import { TODOS } from '../../constants/database.constant';
import { count as usersCount } from './1_users';

const TABLE_NAME = TODOS;

const count = 100;

const data = Array.from({ length: count }).map((_, index) => {
  const id = index + 1;
  const userIdForCreatedBy = Math.ceil(Math.random() * usersCount);
  const userIdForUpdatedBy = Math.ceil(Math.random() * usersCount);
  return {
    title: `Todo's title ${id}`,
    completed: index % 2 === 0,
    created_by: userIdForCreatedBy,
    updated_by: userIdForUpdatedBy,
  };
});

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert(data);
    });
}
