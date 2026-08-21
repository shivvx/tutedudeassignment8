# Frontend Client

This is the React frontend client built with Vite and designed using Vanilla CSS.

## Installation
1. Go to this folder:
   ```bash
   cd frontend
   ```
2. Install the node packages:
   ```bash
   npm install
   ```
3. Copy the sample env file:
   ```bash
   cp .env.example .env
   ```
4. Adjust the API URL inside `.env` if your backend is running on a different port than `http://localhost:5001`.

## Available Commands
- `npm run dev`: Runs the Vite development server locally.
- `npm run build`: Bundles the application for production.
- `npm run lint`: Runs ESLint to check for code issues.
- `npm run preview`: Previews the production build locally.

## Features Built
- **Add & Edit Form**: Allows setting titles, descriptions, priority levels, and due dates.
- **Filters**: Quickly filter tasks by active status (All, Active, Completed) and priority level.
- **Search**: Search tasks dynamically by typing into the search bar.
- **Custom fetch hook**: Adapts the previous `useFetch` code to support re-fetching.

## Hosting on Vercel
The frontend is configured for deployment on Vercel.
1. Deploy a new project in Vercel.
2. Select your repository and set the root directory as `frontend`.
3. Set the environment variable:
   - `VITE_API_URL`: Paste your deployed backend API URL (e.g. `https://my-todo-api.vercel.app/api/todos`).
4. Click deploy. Vercel will automatically run the build and host your static Vite output.
