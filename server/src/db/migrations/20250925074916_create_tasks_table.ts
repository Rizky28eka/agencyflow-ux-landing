import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('status').defaultTo('Not Started');
    table.date('dueDate');
    table.string('priority');
    
    // Foreign key for project
    table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
    
    // Foreign key for user (assignee)
    table.string('assignee_id').references('id').inTable('users').onDelete('SET NULL');

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tasks');
}