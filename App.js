import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const { theme, toggleTheme, themeStyles } = useTheme();

  useEffect(() => {
    console.log("Theme changed to:", theme);
  }, [theme]);

  const addTask = () => {
    if (text.trim()) {
      setTasks([...tasks, text]);
      setText('');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className={`min-h-screen p-4 flex flex-col items-center justify-center ${themeStyles.container}`}>
      <h1 className="text-3xl font-bold text-center mb-4">Task Manager</h1>
      <button
        onClick={toggleTheme}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Toggle Theme ({theme})
      </button>
      <div className="flex justify-center mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task"
          className={`mr-4 p-3 border rounded-lg ${themeStyles.input}`}
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Add Task
        </button>
      </div>
      <ul className="max-w-md mx-auto">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`p-3 mb-3 rounded-lg transition-all duration-200 ${themeStyles.listItem} hover:scale-105 hover:shadow-md flex justify-between items-center`}
          >
            {task}
            <button
              onClick={() => deleteTask(index)}
              className="text-red-500 hover:text-red-700 pl-4"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
