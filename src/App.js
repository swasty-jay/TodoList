import React, { useState } from "react";
import "./App.css"; // Create this file for your CSS

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("");

  // Add a new task
  const addTask = () => {
    const newTask = { id: Date.now(), title, description, completed: false };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  // Toggle task completion
  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <header className="p-3 mb-2 bg-primary-subtle text-primary-emphasis">
        <h1>Todo List</h1>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </label>
        </div>
      </header>

      <div className="task-input">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          class="d-inline-flex focus-ring focus-ring-secondary py-1 px-2 text-decoration-none border rounded-2"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      <input
        type="text"
        placeholder="Search tasks..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <div>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
            </div>
            <button onClick={() => toggleCompletion(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button className="delete" onClick={() => deleteTask(task.id)}>
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
