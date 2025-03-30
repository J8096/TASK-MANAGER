import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaMoon, FaSun, FaPlus, FaTrash } from "react-icons/fa";
import Sidebar from "./components/Sidebar";


const initialTasks = [
  { id: "1", text: "Complete React project", category: "Work", priority: "High", completed: false },
  { id: "2", text: "Grocery Shopping", category: "Personal", priority: "Medium", completed: false },
];

const App = () => {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || initialTasks;
  });
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Low");
  const [category, setCategory] = useState("Personal");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const newEntry = {
      id: Date.now().toString(),
      text: newTask,
      category,
      priority,
      completed: false,
    };
    setTasks([...tasks, newEntry]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = [...tasks];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  return (
    <div className={`h-screen flex ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2">
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>

        {/* Task Input */}
        <div className="mt-6 flex gap-2">
          <input
            type="text"
            placeholder="Add a new task..."
            className="w-full p-2 border rounded"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <select className="border p-2 rounded" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select className="border p-2 rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
          </select>
          <button onClick={addTask} className="bg-blue-600 text-white px-4 py-2 rounded"><FaPlus /></button>
        </div>

        {/* Task List with Drag & Drop */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul className="mt-4 space-y-3" {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-3 border rounded flex justify-between items-center ${
                          task.completed ? "bg-green-200 line-through" : "bg-white"
                        }`}
                      >
                        <div>
                          <p>{task.text}</p>
                          <p className="text-sm text-gray-500">{task.category} - {task.priority}</p>
                        </div>
                        <div className="flex gap-2">
                          <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
                          <button onClick={() => deleteTask(task.id)} className="text-red-500"><FaTrash /></button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
