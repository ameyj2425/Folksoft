import { useEffect } from "react";

export default function Toast({ text, onHide, ms = 1600 }) {
  useEffect(() => {
    const id = setTimeout(onHide, ms);
    return () => clearTimeout(id);
  }, [onHide, ms]);

  if (!text) return null;
  return <div className="toast">{text}</div>;
}
