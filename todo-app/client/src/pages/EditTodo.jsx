import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTodo, updateTodo } from "../api";
import Toast from "../components/Toast.jsx";

export default function EditTodo() {
  const { id } = useParams();
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getTodo(id);
        const t = res.data;
        setTitle(t.title || "");
        setDescription(t.description || "");
        setCompleted(!!t.completed);
      } catch (e) {
        setErr(e?.response?.data?.message || e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const save = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      if (!title.trim()) throw new Error("Title is required");
      await updateTodo(id, { title, description, completed });
      setOk("Updated");
      setTimeout(() => nav("/"), 400);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
    }
  };

  if (loading) return <p>Loading…</p>;

  return (
    <>
      <form className="card form" onSubmit={save}>
        <h3 className="title">Edit Todo</h3>
        {err && <div style={{ color: "crimson" }}>{err}</div>}

        <label className="label">Title</label>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="label">Description</label>
        <textarea
          className="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label
          className="label"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <span className="muted">Completed</span>
        </label>

        <div className="actions">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <button type="button" className="btn" onClick={() => nav("/")}>
            Cancel
          </button>
        </div>
      </form>
      {ok && <Toast text={ok} onHide={() => setOk("")} />}
    </>
  );
}
