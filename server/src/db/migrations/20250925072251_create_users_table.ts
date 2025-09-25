import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('role').notNullable();
    table.string('status').notNullable();
    table.string('lastLogin');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}