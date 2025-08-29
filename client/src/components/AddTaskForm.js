// client/src/components/AddTaskForm.js
import React, { useState } from 'react';

// 1. Accept the onAddTask prop
function AddTaskForm({ onAddTask }) {
  // 2. Create state to hold the input's value
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (!title) return; // Don't add empty tasks
    // 3. Call the function from App.js
    onAddTask(title);
    // 4. Clear the input field
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;