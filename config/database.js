// config/database.js
const { Pool } = require('pg');
require('dotenv').config();

// Create a pool using the connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Needed for connecting to some hosted PostgreSQL services
  }
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('✅ Database connected successfully');
  } catch (err) {
    console.error('❌ Database Connection Error:', err);
    
    // Provide more helpful error information
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL environment variable is not set!');
    } else {
      console.error('DATABASE_URL is set, but connection failed. Check if the URL is correct.');
    }
    
    // Don't exit in development for easier debugging
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

module.exports = { pool, connectDB };