// client/src/components/TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

// 1. Accept the new props
function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          // 2. Pass the functions down to each item
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;