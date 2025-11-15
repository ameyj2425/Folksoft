import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../src/server/models/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.resolve(__dirname, "../db/schema.sql");

async function main() {
  const sql = readFileSync(schemaPath, "utf8");
  await pool.query(sql);
  console.log("✅ DB initialized");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
