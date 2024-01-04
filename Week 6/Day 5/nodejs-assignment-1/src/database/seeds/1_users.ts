import { Knex } from 'knex';
import { PEOPLE } from '../../constants/database.constant';
import { hashPassowrd } from '../../helpers/passwordHasher.helper';

const TABLE_NAME = PEOPLE;

export const count = 100;

const data = Array.from({ length: count }).map(async (_, index) => {
  const id = index + 1;
  return {
    fullname: `User's fullname ${id}`,
    email: `user${id}@mail.com`,
    username: `user${id}`,
    password: await hashPassowrd(`password${index}`),
  };
});

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function seed(knex: Knex): Promise<void> {
  const resolvedData = await Promise.all(data);
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert(resolvedData);
    });
}
