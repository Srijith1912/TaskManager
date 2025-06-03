import React, {useState} from 'react';

function App() {

  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  const addTask = () => {
    if(text.trim()){
      setTasks([...tasks, text]);
      setText('');
    }
  }

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <input 
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder='Enter task'
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;