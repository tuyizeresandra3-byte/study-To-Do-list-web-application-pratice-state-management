
import { useState } from "react";

import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import FilterBar from "./components/FilterBar.jsx";

import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  function addTask(title) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      done: false,
    };

    setTasks((prev) => [...prev, newTask]);
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });

  const remaining = tasks.filter((task) => !task.done).length;
  const completed = tasks.filter((task) => task.done).length;

  return (
    <main className="app-container">
      <section className="todo-card">
        <header className="app-header">
          <h1>My Tasks<span>.</span></h1>
          <p>Plan your day. Stay focused. Get things done.</p>
        </header>

        <TaskForm onAdd={addTask} />

        <div className="task-summary">
          <div>
            <strong>{remaining}</strong>
            <span>Tasks left</span>
          </div>

          <div>
            <strong>{completed}</strong>
            <span>Completed</span>
          </div>

          <div>
            <strong>{tasks.length}</strong>
            <span>Total tasks</span>
          </div>
        </div>

        <div className="list-heading">
          <h2>Your task list</h2>
          <span>{filteredTasks.length} tasks</span>
        </div>

        <FilterBar filter={filter} onChange={setFilter} />

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />

        <footer className="app-footer">
          Small steps make big progress.
        </footer>
      </section>
    </main>
  );
}
