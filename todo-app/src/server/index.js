// src/server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
console.log("DB env seen by server:", {
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  HasPass: !!process.env.DB_PASS,
});

import todosRouter from "./routes/todos.js";
import { pool } from "./models/db.js"; // keeps pool warm

// ---------- Path setup for React build ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// project root: .../todo-app
const projectRoot = path.resolve(__dirname, "..", "..");

// React build output: .../todo-app/client/dist
const clientDist = path.join(projectRoot, "client", "dist");
console.log("📦 Serving React build from:", clientDist);

// ---------- Express app ----------
const app = express();
app.use(cors());
app.use(express.json());

// health
app.get("/health", (_, res) => res.json({ ok: true }));

// API
app.use("/api/todos", todosRouter);

// serve static assets from React build
app.use(express.static(clientDist));

// 🔥 Catch-all *without* a path string (Express 5 safe)
// This will run for any request that got this far (non-API, non-static)
app.use((req, res) => {
  // Don't hijack API routes accidentally
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "Not found" });
  }
  res.sendFile(path.join(clientDist, "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
