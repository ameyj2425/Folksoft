// server/index.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.example instead of .env
dotenv.config({
  path: path.resolve(__dirname, "../.env.example"),
});

// APIs & DB imports
import todosRouter from "./routes/todos.js";
import { pool } from "./models/db.js";

// ---------- Env ----------
console.log("DB env seen by server:", {
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  HasPass: !!process.env.DB_PASS,
});

// ---------- Path setup for React build ----------
const clientDist = path.join(__dirname, "../client/dist");
console.log("📦 Serving React build from:", clientDist);

// ---------- Express app ----------
const app = express();

// ---------- CORS ----------
const allowOrigin = process.env.ALLOW_ORIGIN || "http://localhost:5173";
console.log("🌐 CORS allowOrigin:", allowOrigin);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowOrigin);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

// health
app.get("/health", (_, res) => res.json({ ok: true }));

// API
app.use("/api/todos", todosRouter);

// serve static assets from React build
app.use(express.static(clientDist));

// 🔥 Catch-all for SPA (but not /api)
app.use((req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "Not found" });
  }
  res.sendFile(path.join(clientDist, "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
