// client/src/components/TaskItem.js
import React from 'react';

// 1. Accept the new props
function TaskItem({ task, onToggleComplete, onDeleteTask }) {
  const itemStyle = {
    textDecoration: task.completed ? 'line-through' : 'none'
  };

  return (
    <li style={itemStyle}>
      <span>{task.title}</span>
      {/* 2. Call the functions on button click */}
      <button onClick={() => onToggleComplete(task.id, task.completed)}>
        {task.completed ? 'Undo' : 'Complete'}
      </button>
      <button onClick={() => onDeleteTask(task.id)}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;