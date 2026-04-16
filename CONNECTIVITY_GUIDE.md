# Todo App: Frontend-Backend Connection Guide

This document explains in detail how the frontend and backend of this Todo application are connected and how they communicate.

## 1. High-Level Architecture
The application follows a classic client-server architecture:
- **Frontend**: React application (Vite) running on `http://localhost:5173` (default Vite port).
- **Backend**: Node.js/Express server running on `http://localhost:3001`.
- **Database**: MongoDB (cloud-hosted) connected via Mongoose.

---

## 2. Enabling Communication (CORS)
By default, browsers block requests from one port (`5173`) to another port (`3001`) for security. This is called **Cross-Origin Resource Sharing (CORS)**.

### How it's connected:
In `backend/index.js`, we use the `cors` middleware:
```javascript
const cors = require("cors");
app.use(cors()); // This allows the frontend to talk to this backend
```

---

## 3. Data Flow: Step-by-Step

### Step A: Fetching Todos (The GET Request)
1. **Frontend**: When `App.jsx` mounts, the `useEffect` hook triggers `fetchTodos()`.
2. **Frontend Call**: `fetch("http://localhost:3001/todos")` sends a GET request.
3. **Backend Response**: The backend handles this in `app.get("/todos")`, queries MongoDB using `todo.find({})`, and returns the list as JSON.
4. **Frontend Update**: `App.jsx` receives the JSON and updates the `todos` state using `setTodos(json.todos)`.

### Step B: Creating a Todo (The POST Request)
1. **Frontend**: User clicks "Add Todo" in `Createtodo.jsx`.
2. **Frontend Call**: `fetch("http://localhost:3001/todos", { method: "POST", ... })`.
   - **Crucial Step**: We MUST send headers: `"Content-Type": "application/json"`.
   - **Crucial Step**: The body must be a string: `JSON.stringify({ title, description })`.
3. **Backend Validation**: `index.js` uses **Zod** (`createtodo.safeParse`) to ensure the title and description are valid strings.
4. **Backend Action**: If valid, it saves to MongoDB and returns `{"msg": "Todo created"}`.
5. **Frontend Callback**: After a successful response, the frontend calls the `onTodoAdded` callback, which triggers a fresh `fetchTodos()` in `App.jsx` to update the list.

### Step C: Updating/Completing (The PUT Request)
1. **Frontend**: User clicks "Mark as complete" in `Todos.jsx`.
2. **Frontend Call**: `fetch("http://localhost:3001/completed", { method: "PUT", body: JSON.stringify({ id }) })`.
3. **Backend Action**: `index.js` finds the todo by ID and sets `completed: true` in the database using `todo.updateOne`.

### Step D: Deleting (The DELETE Request)
1. **Frontend**: User clicks "Delete" in `Todos.jsx`.
2. **Frontend Call**: `fetch("http://localhost:3001/todos/:id", { method: "DELETE" })`.
3. **Backend Action**: `index.js` removes the document from MongoDB using `todo.deleteOne`.

---

## 4. Summary of Connection Points

| Action | Frontend Component | HTTP Method | Backend Route | Data Passed |
| :--- | :--- | :--- | :--- | :--- |
| **Load List** | `App.jsx` | `GET` | `/todos` | None |
| **Add Todo** | `Createtodo.jsx` | `POST` | `/todos` | `{ title, description }` |
| **Complete** | `Todos.jsx` | `PUT` | `/completed` | `{ id }` |
| **Delete** | `Todos.jsx` | `DELETE` | `/todos/:id` | `id` (as URL param) |

---

## 5. How to Run Everything
1. **Start Backend**:
   ```bash
   cd backend
   node index.js
   ```
2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.
