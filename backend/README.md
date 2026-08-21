# Backend Server

This is the Node/Express backend server that connects to MongoDB to store and manage todos.

## Prerequisites
- Node.js installed
- MongoDB instance running locally (e.g. at `mongodb://127.0.0.1:27017/todoapp`) or a MongoDB Atlas URI.

## Installation
1. Go to this folder:
   ```bash
   cd backend
   ```
2. Install the node packages:
   ```bash
   npm install
   ```
3. Copy the sample env file:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your correct port (default is `5001`) and MongoDB URI.

## Available Commands
- `npm start`: Runs the server using standard node.
- `npm run dev`: Runs the server with `nodemon` to automatically restart on code changes.

## Database Schema (Todo)
- `title` (String, required): The task headline.
- `description` (String, optional): Extra details.
- `completed` (Boolean, default: false): Completion state.
- `priority` (String, default: 'medium'): Priority level ('low', 'medium', or 'high').
- `dueDate` (Date, optional): Target completion date.

## Hosting on Vercel
The backend is configured for serverless hosting using `@vercel/node` runtime configurations in `vercel.json`.
1. Deploy a new project in Vercel.
2. Select your repository and set the root directory as `backend`.
3. Set the environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection URI.
   - `NODE_ENV`: `production`
4. Click deploy.
