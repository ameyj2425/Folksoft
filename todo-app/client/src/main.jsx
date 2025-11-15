import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import "./styles.css";
import Home from "./pages/Home.jsx";
import AddTodo from "./pages/AddTodo.jsx";
import EditTodo from "./pages/EditTodo.jsx";

function Layout({ children }) {
  return (
    <div className="container">
      <header className="header">
        <h1>Todo-App</h1>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/add">Add Todo</Link>
        </nav>
      </header>
      <hr className="hr" />
      <main>{children}</main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTodo />} />
          <Route path="/edit/:id" element={<EditTodo />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
