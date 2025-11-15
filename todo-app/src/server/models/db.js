import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load src/server/.env explicitly (models -> .. -> .env)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// TEMP: prove values are seen (remove after it works)
console.log("DB env (from db.js):", {
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  HasPass: !!process.env.DB_PASS,
});

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});
