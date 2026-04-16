import { useState } from "react";

export function Createtodo({ onTodoAdded }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAddTodo = async () => {
        if (!title || !description) {
            alert("Please fill in both title and description");
            return;
        }

        try {
            const res = await fetch("http://localhost:3001/todos", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description: description
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.ok) {
                alert("Todo added");
                setTitle("");
                setDescription("");
                if (onTodoAdded) onTodoAdded();
            } else {
                const json = await res.json();
                alert(json.msg || "Failed to add todo");
            }
        } catch (error) {
            console.error("Error adding todo:", error);
            alert("Error connecting to server");
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
            <input
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button
                style={{
                    padding: "10px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
                onClick={handleAddTodo}
            >
                Add Todo
            </button>
        </div>
    );
}