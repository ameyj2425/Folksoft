import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listTodos, deleteTodo, toggleTodo } from "../api";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // UI state
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all"); // all | active | completed
  const [toDelete, setToDelete] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await listTodos();
      setTodos(res.data || []);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onToggle = async (id) => {
    await toggleTodo(id);
    load();
  };

  const confirmDelete = (id) => setToDelete(id);

  const doDelete = async () => {
    if (!toDelete) return;
    await deleteTodo(toDelete);
    setToDelete(null);
    await load();
  };

  const filtered = todos
    .filter((t) =>
      tab === "all" ? true : tab === "active" ? !t.completed : t.completed
    )
    .filter((t) => {
      const q = query.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        (t.description || "").toLowerCase().includes(q)
      );
    });

  if (loading) return <p>Loading…</p>;
  if (err) return <p style={{ color: "crimson" }}>{err}</p>;

  return (
    <div>
      {/* Toolbar */}
      <div className="card toolbar">
        <div className="search-row">
          <input
            className="search-input"
            placeholder="Search todos…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="tabs">
          <button
            className={`tab-btn ${tab === "all" ? "tab-btn--active" : ""}`}
            onClick={() => setTab("all")}
          >
            All
          </button>
          <button
            className={`tab-btn ${tab === "active" ? "tab-btn--active" : ""}`}
            onClick={() => setTab("active")}
          >
            Active
          </button>
          <button
            className={`tab-btn ${
              tab === "completed" ? "tab-btn--active" : ""
            }`}
            onClick={() => setTab("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      {/* List / Empty state */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>
            No {query ? "matching " : ""}todos yet.{" "}
            <span className="empty-highlight">
              <Link to="/add">Create one</Link>
            </span>{" "}
            to get started.
          </p>
        </div>
      ) : (
        <ul className="list">
          {filtered.map((t) => (
            <li key={t.id} className="card">
              <div style={{ display: "grid", gap: "10px" }}>
                <div>
                  <h3 className={`title ${t.completed ? "completed" : ""}`}>
                    {t.title}
                  </h3>
                  {t.description && <p className="desc">{t.description}</p>}
                </div>
                <div className="actions">
                  <button className="btn" onClick={() => onToggle(t.id)}>
                    {t.completed ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                  <Link to={`/edit/${t.id}`}>
                    <button className="btn">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => confirmDelete(t.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Delete modal */}
      {toDelete !== null && (
        <div className="modal-backdrop">
          <div className="card modal">
            <h3 className="title">Delete todo?</h3>
            <p className="desc" style={{ marginTop: 8 }}>
              This action cannot be undone.
            </p>
            <div className="actions" style={{ marginTop: 14 }}>
              <button className="btn btn-danger" onClick={doDelete}>
                Delete
              </button>
              <button className="btn" onClick={() => setToDelete(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
