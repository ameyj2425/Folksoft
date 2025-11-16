import { pool } from "../models/db.js";

export async function listTodos(req, res) {
  const [rows] = await pool.query(
    "SELECT id, title, description, completed, created_at FROM todos ORDER BY created_at DESC"
  );
  res.json(rows);
}

export async function createTodo(req, res) {
  const { title, description = "" } = req.body || {};
  if (!title || !title.trim())
    return res.status(400).json({ error: "TITLE_REQUIRED" });
  const [result] = await pool.query(
    "INSERT INTO todos (title, description) VALUES (?, ?)",
    [title.trim(), description]
  );
  const [rows] = await pool.query(
    "SELECT id, title, description, completed, created_at FROM todos WHERE id = ?",
    [result.insertId]
  );
  res.status(201).json(rows[0]);
}

export async function updateTodo(req, res) {
  const { id } = req.params;
  const { title, description = "" } = req.body || {};
  if (!title || !title.trim())
    return res.status(400).json({ error: "TITLE_REQUIRED" });
  const [r] = await pool.query(
    "UPDATE todos SET title = ?, description = ? WHERE id = ?",
    [title.trim(), description, id]
  );
  if (r.affectedRows === 0) return res.status(404).json({ error: "NOT_FOUND" });
  const [rows] = await pool.query(
    "SELECT id, title, description, completed, created_at FROM todos WHERE id = ?",
    [id]
  );
  res.json(rows[0]);
}

export async function toggleComplete(req, res) {
  const { id } = req.params;
  const [cur] = await pool.query("SELECT completed FROM todos WHERE id = ?", [
    id,
  ]);
  if (cur.length === 0) return res.status(404).json({ error: "NOT_FOUND" });
  const next = cur[0].completed ? 0 : 1;
  await pool.query("UPDATE todos SET completed = ? WHERE id = ?", [next, id]);
  const [rows] = await pool.query(
    "SELECT id, title, description, completed, created_at FROM todos WHERE id = ?",
    [id]
  );
  res.json(rows[0]);
}

export async function deleteTodo(req, res) {
  const { id } = req.params;
  const [r] = await pool.query("DELETE FROM todos WHERE id = ?", [id]);
  if (r.affectedRows === 0) return res.status(404).json({ error: "NOT_FOUND" });
  res.status(204).send();
}
