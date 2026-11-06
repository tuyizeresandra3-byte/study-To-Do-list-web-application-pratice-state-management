import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("my-todo-tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [message, setMessage] = useState("");

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("my-todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Display feedback messages
  function showMessage(text) {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  }

  // Add or update a task
  function handleSaveTask(taskData) {
    if (!taskData.title.trim()) {
      showMessage("Please enter a task name.");
      return;
    }

    if (editingTask) {
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...taskData }
            : task
        )
      );

      setEditingTask(null);
      showMessage("Task updated successfully!");
    } else {
      const newTask = {
        id: `${Date.now()}-${Math.random()}`,
        title: taskData.title.trim(),
        priority: taskData.priority,
        completed: false,
        createdAt: new Date().toISOString(),
      };

      setTasks((previousTasks) => [newTask, ...previousTasks]);
      showMessage("Task added successfully!");
    }
  }

  // Mark task as completed or pending
  function toggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );

    showMessage("Task status updated!");
  }

  // Delete task with confirmation
  function deleteTask(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );

    if (editingTask?.id === id) {
      setEditingTask(null);
    }

    showMessage("Task deleted successfully!");
  }

  // Start editing a task
  function editTask(task) {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Cancel editing
  function cancelEdit() {
    setEditingTask(null);
  }

  // Filter and search tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    return matchesSearch && matchesFilter;
  });

  // Statistics
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  return (
    <main className="app-container">
      <section className="todo-card">

        <header className="app-header">
          <h1>
            My Tasks<span>.</span>
          </h1>

          <p className="subtitle">
            Plan your day. Stay focused. Get things done.
          </p>
        </header>

        {message && (
          <div className="feedback-message" role="status">
            {message}
          </div>
        )}

        <TaskForm
          onSaveTask={handleSaveTask}
          editingTask={editingTask}
          onCancelEdit={cancelEdit}
        />

        <section className="task-summary">
          <div className="summary-box">
            <h2>{pendingTasks}</h2>
            <p>Tasks left</p>
          </div>

          <div className="summary-box">
            <h2>{completedTasks}</h2>
            <p>Completed</p>
          </div>

          <div className="summary-box">
            <h2>{tasks.length}</h2>
            <p>Total tasks</p>
          </div>
        </section>

        <section className="task-section">

          <div className="section-heading">
            <h2>Your task list</h2>
            <span>{filteredTasks.length} tasks</span>
          </div>

          <FilterBar
            filter={filter}
            setFilter={setFilter}
            search={search}
            setSearch={setSearch}
          />

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />

        </section>

        <footer className="app-footer">
          <p>Stay productive. One task at a time.</p>
        </footer>

      </section>
    </main>
  );
}

export default App;