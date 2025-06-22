// db.js
import pg from 'pg';

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'notes-app',
  password: '1111',
  port: 5432,
});

db.connect();

export default db;
