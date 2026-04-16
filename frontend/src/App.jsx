import { useState, useEffect } from 'react'
import { Createtodo } from './components1/Createtodo'
import { Todos } from './components2/Todos'

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:3001/todos");
      const json = await res.json();
      setTodos(json.todos);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>My Todo App</h1>
      <Createtodo onTodoAdded={fetchTodos} />
      <hr />
      <Todos todos={todos} onTodoUpdated={fetchTodos} />
    </div>
  )
}

export default App
