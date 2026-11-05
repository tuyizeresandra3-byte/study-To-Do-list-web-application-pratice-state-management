
import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const clean = title.trim();
    if (!clean) return;

    onAdd(clean);
    setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        id="new-task"
        type="text"
        value={title}
        placeholder="What needs to be done?"
        onChange={(e) => setTitle(e.target.value)}
        aria-label="New task"
      />

      <button type="submit" disabled={!title.trim()}>
        + Add Task
      </button>
    </form>
  );
}
