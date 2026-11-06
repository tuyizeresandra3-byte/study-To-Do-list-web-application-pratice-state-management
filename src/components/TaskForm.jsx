import { useEffect, useState } from "react";

function TaskForm({ onSaveTask, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setPriority(editingTask.priority);
    } else {
      setTitle("");
      setPriority("Medium");
    }
  }, [editingTask]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSaveTask({
      title: title.trim(),
      priority,
    });

    setTitle("");
    setPriority("Medium");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What do you need to do?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        maxLength={100}
        aria-label="Task name"
      />

      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
        aria-label="Task priority"
      >
        <option value="Low">Low priority</option>
        <option value="Medium">Medium priority</option>
        <option value="High">High priority</option>
      </select>

      <button type="submit" className="add-btn">
        {editingTask ? "Save Changes" : "+ Add Task"}
      </button>

      {editingTask && (
        <button
          type="button"
          className="cancel-btn"
          onClick={onCancelEdit}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default TaskForm;