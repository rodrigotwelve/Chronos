// client/src/App.js

// 1. All imports MUST be at the top of the file.
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import './App.css';

function App() {
  // 2. Correctly destructure useState to get both 'tasks' and 'setTasks'.
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data.data));
  }, []);

  // Handler to add a new task
  const addTask = async (title) => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    const result = await res.json();
    setTasks([...tasks, result.data]);
  };

  // Handler to toggle the completion status of a task
  const toggleComplete = async (id, completed) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: completed ? 0 : 1 }),
    });
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: completed ? 0 : 1 } : task
      )
    );
  };

  // Handler to delete a task
  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="App">
      <h1>Chronos Task Tracker</h1>
      <AddTaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onToggleComplete={toggleComplete}
        onDeleteTask={deleteTask}
      />
    </div>
  );
}

export default App;