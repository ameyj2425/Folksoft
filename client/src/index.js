import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

// --- Your routes ---
import todosRouter from "./routes/todos.js"; // keep your existing routes

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Basic hardening + gzip
app.use(
  helmet({
    contentSecurityPolicy: false, // SPA/inline styles in dev can break CSP
  })
);
app.use(compression());
app.use(express.json());

// CORS: allow dev client; in prod you can restrict to your domain
const allowOrigin = process.env.ALLOW_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: allowOrigin }));

// Health check for uptime monitoring
app.get("/health", (_req, res) => res.status(200).json({ ok: true }));

// API routes
app.use("/api/todos", todosRouter);

// ---- Serve React build (after npm run build in /client) ----
const clientDist = path.join(__dirname, "../../client/dist");
app.use(express.static(clientDist));
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`ALLOW_ORIGIN: ${allowOrigin}`);
});
