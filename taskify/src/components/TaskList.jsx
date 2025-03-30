import React from "react";

const TaskList = ({ tasks, deleteTask, toggleComplete }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index} className={task.completed ? "completed" : ""}>
          <span onClick={() => toggleComplete(index)}>
            {task.completed ? "✔ " : ""}{task.text}
          </span>
          <button onClick={() => deleteTask(index)}>❌</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
