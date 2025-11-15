import { Router } from "express";
import {
  listTodos,
  createTodo,
  updateTodo,
  toggleComplete,
  deleteTodo,
} from "../controllers/todosController.js";

const router = Router();
router.get("/", listTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.patch("/:id/complete", toggleComplete);
router.delete("/:id", deleteTodo);

export default router;
