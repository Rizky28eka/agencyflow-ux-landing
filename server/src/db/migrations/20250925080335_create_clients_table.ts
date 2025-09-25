import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('clients', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('contact_person');
    table.string('email').unique();
    table.string('status').defaultTo('Active');
    table.decimal('contract_value', 15, 2);
    table.string('health');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('clients');
}