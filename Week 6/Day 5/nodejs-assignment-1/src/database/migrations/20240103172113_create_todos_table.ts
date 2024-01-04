import { Knex } from 'knex';
import { PEOPLE, TODOS } from '../../constants/database.constant';

const TABLE_NAME = TODOS;

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table.string('title', 255).notNullable();

    table.boolean('completed').notNullable().defaultTo(false);

    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));

    table
      .bigInteger('created_by')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable(PEOPLE)
      .onDelete('CASCADE');

    table.timestamp('updated_at').nullable();

    table
      .bigInteger('updated_by')
      .unsigned()
      .references('id')
      .inTable(PEOPLE)
      .onDelete('SET NULL')
      .nullable();
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
