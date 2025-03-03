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

// Export the pool directly (not in an object) to allow pool.query() to work
module.exports = pool;
// Also export connectDB separately to maintain compatibility with server.js
module.exports.connectDB = connectDB;