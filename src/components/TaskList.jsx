
export function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.done ? "done" : ""}`}>
      <div className="task-content">
        <input
          type="checkbox"
          id={`task-${task.id}`}
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />

        <label htmlFor={`task-${task.id}`}>
          {task.title}
        </label>
      </div>

      <button
        className="delete-btn"
        type="button"
        aria-label={`Delete ${task.title}`}
        onClick={() => onDelete(task.id)}
      >
        ×
      </button>
    </li>
  );
}

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty">
        <div className="empty-icon">✓</div>
        <h3>All clear!</h3>
        <p>No tasks here yet. Add something to get started.</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
