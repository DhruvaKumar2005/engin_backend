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
    const client = await pool.connect();
    console.log('✅ Database connected successfully');
    client.release();
  } catch (err) {
    console.error('❌ Database Connection Error:', err);
    
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL environment variable is not set!');
    } else {
      console.error('DATABASE_URL is set, but connection failed. Check if the URL is correct.');
    }
  }
};

// Export the pool correctly to work with the existing code
module.exports = pool;
module.exports.connectDB = connectDB;