const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',           // Your PostgreSQL username
  host: 'localhost',          // PostgreSQL server (localhost)
  database: 'crypto_data',    // Your database name
  password: '2805',  // Your PostgreSQL password
  port: 5432,                 // Default PostgreSQL port
});

module.exports = pool;
