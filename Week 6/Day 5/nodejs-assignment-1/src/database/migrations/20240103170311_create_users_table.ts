import { Knex } from 'knex';
import { PEOPLE } from '../../constants/database.constant';

const TABLE_NAME = PEOPLE;

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table.string('fullname', 255).notNullable();

    table.string('email', 255).notNullable().unique();

    table.string('username', 255).notNullable().unique();

    table.string('password', 255).notNullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));

    table.timestamp('updated_at').nullable();
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
