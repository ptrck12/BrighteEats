import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config()
const db = knex({
    client: 'mysql2',
    connection: {
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
    }
});

// Create the authors table
const createTable = async () => {
    await db.schema.createTableIfNotExists('services', (table) => {
        table.increments('id').primary();
        table.string('service').notNullable();
    });

    await db.schema.createTableIfNotExists('customer', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('mobile').notNullable();
        table.string('postcode').notNullable();
        table.integer('service').notNullable();
        
    });
};


createTable();

export default db;
