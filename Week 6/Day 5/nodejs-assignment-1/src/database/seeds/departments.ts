import { Knex } from 'knex';

const TABLE_NAME = 'departments';

/**
 * Delete existing entries and seed values for table departments.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */

const DEPARTMENTS = ['AI', 'Data', 'QA'];

export async function seed(knex: Knex): Promise<void> {
  await knex(TABLE_NAME).del();
  return await knex(TABLE_NAME).insert(
    DEPARTMENTS.map((department, idx) => ({
      id: idx + 1,
      name: department,
    }))
  );
}
