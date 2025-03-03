// config/database.js
const { Pool } = require('pg'); // Assuming you're using PostgreSQL
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('✅ Database connected successfully');
  } catch (err) {
    console.error('❌ Database Connection Error:', err);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };