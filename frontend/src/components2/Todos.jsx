export function Todos({ todos, onTodoUpdated }) {
    const markAsCompleted = async (id) => {
        try {
            const res = await fetch("http://localhost:3001/completed", {
                method: "PUT",
                body: JSON.stringify({ id }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
                if (onTodoUpdated) onTodoUpdated();
            }
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const res = await fetch(`http://localhost:3001/todos/${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                if (onTodoUpdated) onTodoUpdated();
            }
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {todos.map((todo) => (
                <div key={todo._id} style={{
                    padding: "15px",
                    border: "1px solid #eee",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <div>
                        <h3 style={{ margin: "0 0 5px 0", textDecoration: todo.completed ? "line-through" : "none" }}>
                            {todo.title}
                        </h3>
                        <p style={{ margin: "0", color: "#666" }}>{todo.description}</p>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button
                            onClick={() => markAsCompleted(todo._id)}
                            disabled={todo.completed}
                            style={{
                                padding: "8px 12px",
                                backgroundColor: todo.completed ? "#28a745" : "#ffc107",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: todo.completed ? "default" : "pointer"
                            }}
                        >
                            {todo.completed ? "Completed" : "Mark as complete"}
                        </button>
                        <button
                            onClick={() => deleteTodo(todo._id)}
                            style={{
                                padding: "8px 12px",
                                backgroundColor: "#dc3545",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer"
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            {todos.length === 0 && <p style={{ textAlign: "center", color: "#999" }}>No todos yet. Add one above!</p>}
        </div>
    );
}