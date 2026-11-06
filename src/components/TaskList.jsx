function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✓</div>
        <h3>All clear!</h3>
        <p>No tasks here yet. Add something to get started.</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {tasks.map((task) => (
        <article className="task-item" key={task.id}>

          <div className="task-main">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              aria-label={`Mark ${task.title} as completed`}
            />

            <div className="task-details">
              <h3 className={task.completed ? "completed" : ""}>
                {task.title}
              </h3>

              <div className="task-meta">
                <span className={`priority ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>

                <span className="task-status">
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </div>
            </div>
          </div>

          <div className="task-actions">
            <button
              type="button"
              className="edit-btn"
              onClick={() => onEdit(task)}
              disabled={task.completed}
              aria-label={`Edit ${task.title}`}
            >
              Edit
            </button>

            <button
              type="button"
              className="delete-btn"
              onClick={() => onDelete(task.id)}
              aria-label={`Delete ${task.title}`}
            >
              Delete
            </button>
          </div>

        </article>
      ))}
    </div>
  );
}

export default TaskList;