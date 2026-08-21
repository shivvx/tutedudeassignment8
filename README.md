# Assignment 8 - Full Stack Todo Application

This is a full-stack Todo application built with React (Vite) on the frontend, and Node.js/Express + MongoDB on the backend.

Frontend: React, Context API, Custom Hooks  
Backend: Node.js, Express, MongoDB (Mongoose)

---

## Project Structure

```
assignment8/
├── backend/         # Express API server
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # Error handler middleware
│   │   ├── models/        # Mongoose schema
│   │   ├── routes/        # API routes
│   │   ├── services/      # DB operations
│   │   ├── config/        # MongoDB connection setup
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/        # React application (Vite)
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── context/       # State management (TodoContext.jsx)
│   │   ├── hooks/         # Custom hooks (useFetch.js)
│   │   ├── services/      # API communication methods
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
│
├── README.md
├── POSTMAN_TESTING.md
└── Assignment8.postman_collection.json
```

---

## Setup & Running Guide

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Local instance running, or MongoDB Atlas cloud database connection URI)

---

### Backend Configuration

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Create your environment configuration file:
   - Copy `.env.example` and name the copy `.env`
4. Open the `.env` file and set the `MONGO_URI` variable:
   - If using local MongoDB:
     ```
     MONGO_URI=mongodb://127.0.0.1:27017/todoapp
     ```
   - If using MongoDB Atlas:
     ```
     MONGO_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/todoapp
     ```
5. Start the server:
   ```bash
   npm run dev
   ```
   You should see confirmation logs like:
   `Server started on port 5001` and `MongoDB connected: ...`

---

### Frontend Configuration

1. Open a new terminal session (keep the backend server running) and go to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Create the frontend environment configuration file:
   - Copy `.env.example` and name the copy `.env`
4. Verify the API connection endpoint inside `.env`:
   ```
   VITE_API_URL=/api/todos
   ```
5. Start the local Vite development server:
   ```bash
   npm run dev
   ```
6. Open your web browser and navigate to: `http://localhost:5173`

---

### Running Both Simultaneously
To run both backend and frontend at the same time:
1. Open one terminal tab/window and run:
   ```bash
   cd backend
   npm run dev
   ```
2. Open a second terminal tab/window and run:
   ```bash
   cd frontend
   npm run dev
   ```

---

## API Endpoints List

The backend server listens on `http://localhost:5001` locally.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Retrieves all task items |
| GET | `/api/todos?search=query` | Searches tasks matching query |
| POST | `/api/todos` | Creates a new task item |
| PUT | `/api/todos/:id` | Updates task description/priority/due date |
| PATCH | `/api/todos/:id/status` | Toggles completion checkbox status |
| DELETE | `/api/todos/:id` | Deletes a task item |

---

## Postman API Testing
All endpoints were tested successfully. The Postman documentation is available at:
- [POSTMAN_TESTING.md](./POSTMAN_TESTING.md) - Contains raw JSON request bodies and responses for each operation.
- [Assignment8.postman_collection.json](./Assignment8.postman_collection.json) - Direct import file containing the pre-configured tests.

To import the collection:
1. Open Postman.
2. Click **Import** at the top left.
3. Select `Assignment8.postman_collection.json` to load the requests list.

---

## Troubleshooting Common Issues

### Issue: Database Connection Fails (`ECONNREFUSED` or Timeout)
- **If using local MongoDB**: Check if the local database daemon is actually running. On Mac/Linux, run `brew services start mongodb-community` or simply start `mongod` manually.
- **If using MongoDB Atlas**: Check if your Atlas password matches in the `.env` string. Ensure you have added `0.0.0.0/0` (Allow access from anywhere) in Network Access settings in the MongoDB Atlas console.

### Issue: Frontend displays "Error loading tasks"
- Make sure the backend server terminal is active and has started without crashing.
- Check the backend console logs for database errors.

### Issue: Changes in `.env` are not updating on the page
- Vite environment variables are loaded at startup. You need to restart the Vite server using `Ctrl+C` and running `npm run dev` again.

### Issue: Port 5001 is already in use
- If another node process is running on port 5001:
  - On Mac/Linux, kill it using: `kill -9 $(lsof -ti:5001)`
  - Alternatively, change the `PORT` variable inside your backend `.env` file to a different number.
