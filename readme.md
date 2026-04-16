# Modern Todo Application

A full-stack Todo application built with **React**, **Node.js**, **Express**, and **MongoDB**.

## 🚀 Features
- **Create**: Add new todos with a title and description.
- **Read**: View all your todos in a clean list.
- **Update**: Mark todos as completed with a single click.
- **Delete**: Remove todos instantly from the database.
- **Validation**: Real-time validation using **Zod** in the backend.
- **Security**: CORS enabled for safe frontend-backend communication.

## 🛠️ Tech Stack
- **Frontend**: React (Vite), Vanilla CSS.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Validation**: Zod.

## 📂 Project Structure
- `backend/`: Server-side code, database connection, and API routes.
- `frontend/`: React components, state management, and UI.

## 🔗 Connection Guide
For a detailed step-by-step breakdown of how the frontend talks to the backend, see [CONNECTIVITY_GUIDE.md](./CONNECTIVITY_GUIDE.md).

## 🚦 Getting Started

### Prerequisites
- Node.js installed.
- MongoDB connection string (currently using a test cluster).

### Step 1: Backend Setup
```bash
cd backend
npm install
node index.js
```
The server will start on `http://localhost:3001`.

### Step 2: Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

---

*Project created and corrected as part of a Full-Stack development exercise.*