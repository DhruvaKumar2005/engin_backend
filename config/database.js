const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false, 
    }
});

const connectDB = async () => {
    try {
        await pool.query("SELECT 1");
        console.log("PostgreSQL Connected!");
    } catch (error) {
        console.error("Database Connection Error:", error);
        process.exit(1);
    }
};

module.exports = { pool, connectDB };
