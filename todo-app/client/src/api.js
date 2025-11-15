// Simple API wrapper for your backend
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// ---- Todos endpoints ----
export const listTodos = () => api.get("/api/todos"); // GET all
export const getTodo = (id) => api.get(`/api/todos/${id}`); // GET one
export const createTodo = (data) => api.post("/api/todos", data); // POST
export const updateTodo = (id, data) => api.put(`/api/todos/${id}`, data); // PUT
export const toggleTodo = (id) => api.patch(`/api/todos/${id}/complete`); // PATCH toggle
export const deleteTodo = (id) => api.delete(`/api/todos/${id}`); // DELETE
