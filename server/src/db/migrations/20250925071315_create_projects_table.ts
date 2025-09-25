import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('projects', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('client');
    table.string('status');
    table.integer('progress');
    table.integer('team');
    table.date('deadline');
    table.string('priority');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('projects');
}