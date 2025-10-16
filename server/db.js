import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkPoolConnection() {
  let client;
  console.log("it's the database")
  try {
    client = await pool.connect(); // Get a client from the pool
    await client.query('SELECT 1'); // Execute a simple query
    console.log('PostgreSQL pool connection is healthy.');
  } catch (err) {
    console.error('Error checking PostgreSQL pool connection:', err);
  } finally {
    if (client) {
      client.release(); // Release the client back to the pool
    }
  }
}

checkPoolConnection();