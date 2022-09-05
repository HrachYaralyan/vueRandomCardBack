import pkg from 'pg';

const { Pool } = pkg;

export const pool = new Pool({
  user: 'postgres',
  password: 'mydb23',
  host: 'localhost',
  port: 5432,
  database: 'card_db',
});
