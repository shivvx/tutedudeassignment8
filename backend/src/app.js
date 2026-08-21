import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import todoRoutes from './routes/todoRoutes.js'
import errorHandler from './middleware/errorHandler.js'

// Connect to MongoDB
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

// API health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Todo API is running successfully' })
})

// Main API routes
app.use('/api/todos', todoRoutes)

// Handle 404 missing routes
app.use((req, res, next) => {
  res.status(404)
  next(new Error('Route not found: ' + req.originalUrl))
})

// Centralized error handler middleware
app.use(errorHandler)

export default app
