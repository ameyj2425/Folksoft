import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../api";
import Toast from "../components/Toast.jsx";

export default function AddTodo() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      if (!title.trim()) throw new Error("Title is required");
      await createTodo({ title, description });
      setOk("Saved");
      setTimeout(() => nav("/"), 400);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
    }
  };

  return (
    <>
      <form className="card form" onSubmit={submit}>
        <h3 className="title">Add Todo</h3>
        {err && <div style={{ color: "crimson" }}>{err}</div>}

        <label className="label">Title</label>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Buy cookies"
        />

        <label className="label">Description</label>
        <textarea
          className="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional notes…"
        />

        <div className="actions">
          <button type="submit" className="btn btn-primary">
            Save
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
