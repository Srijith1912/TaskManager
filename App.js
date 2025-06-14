import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const { theme, toggleTheme, themeStyles } = useTheme();

  useEffect(() => {
    console.log("Theme changed to:", theme);
  }, [theme]);

  // Fetch tasks only if logged in
  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get("http://localhost:3001/tasks", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => setTasks(response.data))
        .catch((error) => console.error("Error fetching tasks: ", error));
    }
  }, [isLoggedIn]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
    } catch (error) {
      alert("Login failed: " + (error.response?.data || "Server error"));
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3001/register", {
        username,
        password,
      });
      alert("Registration successful! Please login.");
      setUsername("");
      setPassword("");
    } catch (error) {
      alert("Registration failed: " + (error.response?.data || "Server error"));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setTasks([]);
  };

  const addTask = () => {
    if (text.trim()) {
      const newTask = { title: text, completed: false };
      axios
        .post("http://localhost:3001/tasks", newTask, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          console.log("POST /tasks result: ", response.data);
          setTasks([...tasks, response.data]);
          setText("");
        })
        .catch((error) => console.error("Error adding task: ", error));
    }
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:3001/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((error) => console.error("Error deleting task", error));
  };

  if (!isLoggedIn) {
    return (
      <div
        className={`min-h-screen p-4 flex flex-col items-center justify-center ${themeStyles.container}`}
      >
        <h1 className="text-3xl font-bold text-center mb-4">Task Manager</h1>
        <div className="flex flex-col max-w-md w-full">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className={`mb-4 p-3 border rounded-lg ${themeStyles.input}`}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`mb-4 p-3 border rounded-lg ${themeStyles.input}`}
          />
          <div className="flex justify-between">
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-4 flex flex-col items-center justify-center ${themeStyles.container}`}
    >
      <h1 className="text-3xl font-bold text-center mb-4">Task Manager</h1>
      <div className="flex justify-between max-w-md w-full mb-4">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Toggle Theme ({theme})
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
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
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-3 mb-3 rounded-lg transition-all duration-200 ${themeStyles.listItem} hover:scale-105 hover:shadow-md flex justify-between items-center`}
          >
            {task.title}
            <button
              onClick={() => deleteTask(task.id)}
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
