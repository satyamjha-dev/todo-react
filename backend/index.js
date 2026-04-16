const express = require("express");
const cors = require("cors");
const { createtodo, updatetodo } = require("./types");
const { todo } = require("./db");
const app = express();

app.use(express.json());
app.use(cors());

// get all todos
app.get("/todos", async (req, res) => {
    try {
        const todos = await todo.find({});
        res.json({ todos });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
});

// create a new todo
app.post("/todos", async (req, res) => {
    const createpayload = req.body;
    const parsepayload = createtodo.safeParse(createpayload);
    if (!parsepayload.success) {
        res.status(411).json({
            msg: "Invalid input syntax"
        });
        return;
    }
    
    try {
        await todo.create({
            title: createpayload.title,
            description: createpayload.description,
            completed: false
        });
        res.json({ msg: "Todo created" });
    } catch (error) {
        res.status(500).json({ msg: "Failed to create todo" });
    }
});

// mark as completed
app.put("/completed", async (req, res) => {
    const updatepayload = req.body;
    const parsepayload = updatetodo.safeParse(updatepayload);
    if (!parsepayload.success) {
        res.status(411).json({
            msg: "Invalid input syntax"
        });
        return;
    }

    try {
        await todo.updateOne({
            _id: updatepayload.id
        }, {
            completed: true
        });
        res.json({ msg: "Todo marked as completed" });
    } catch (error) {
        res.status(500).json({ msg: "Failed to update todo" });
    }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await todo.deleteOne({ _id: id });
        res.json({ msg: "Todo deleted" });
    } catch (error) {
        res.status(500).json({ msg: "Failed to delete todo" });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});