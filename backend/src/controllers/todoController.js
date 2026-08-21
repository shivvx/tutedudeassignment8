import * as todoService from '../services/todoService.js'

// GET /api/todos
// Fetch all todos, support search and completed status query filters
export const getTodos = async (req, res, next) => {
  try {
    const search = req.query.search
    const completed = req.query.completed

    const todos = await todoService.getAllTodos(search, completed)
    res.json(todos)
  } catch (error) {
    next(error)
  }
}

// POST /api/todos
// Create a new task
export const createTodo = async (req, res, next) => {
  try {
    const title = req.body.title
    const description = req.body.description
    const priority = req.body.priority
    const dueDate = req.body.dueDate

    // Title is required
    if (!title || title.trim() === '') {
      res.status(400)
      throw new Error('Please enter a task title')
    }

    // Check if priority is valid
    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      res.status(400)
      throw new Error('Priority must be low, medium, or high')
    }

    // Description length limit
    if (description && description.length > 500) {
      res.status(400)
      throw new Error('Description must be less than 500 characters')
    }

    // Due date format check
    if (dueDate && isNaN(Date.parse(dueDate))) {
      res.status(400)
      throw new Error('Invalid due date format')
    }

    const newTodo = await todoService.createTodo({ title, description, priority, dueDate })
    res.status(201).json(newTodo)
  } catch (error) {
    next(error)
  }
}

// PUT /api/todos/:id
// Update task details
export const updateTodo = async (req, res, next) => {
  try {
    const id = req.params.id
    const title = req.body.title
    const description = req.body.description
    const priority = req.body.priority
    const dueDate = req.body.dueDate

    // Validation for update payload fields
    if (title !== undefined && title.trim() === '') {
      res.status(400)
      throw new Error('Please enter a task title')
    }

    if (priority !== undefined) {
      if (!['low', 'medium', 'high'].includes(priority)) {
        res.status(400)
        throw new Error('Priority must be low, medium, or high')
      }
    }

    if (description !== undefined && description.length > 500) {
      res.status(400)
      throw new Error('Description must be less than 500 characters')
    }

    if (dueDate !== undefined && dueDate !== null && isNaN(Date.parse(dueDate))) {
      res.status(400)
      throw new Error('Invalid due date format')
    }

    const updated = await todoService.updateTodo(id, req.body)
    if (!updated) {
      res.status(404)
      throw new Error('This task no longer exists')
    }

    res.json(updated)
  } catch (error) {
    next(error)
  }
}

// PATCH /api/todos/:id/status
// Toggle completed status
export const updateTodoStatus = async (req, res, next) => {
  try {
    const id = req.params.id
    const completed = req.body.completed

    if (completed === undefined) {
      res.status(400)
      throw new Error('Please provide completed status value')
    }

    const updated = await todoService.updateTodoStatus(id, completed)
    if (!updated) {
      res.status(404)
      throw new Error('This task no longer exists')
    }
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

// DELETE /api/todos/:id
// Remove a todo
export const deleteTodo = async (req, res, next) => {
  try {
    const id = req.params.id
    const deleted = await todoService.deleteTodo(id)

    if (!deleted) {
      res.status(404)
      throw new Error('This task no longer exists')
    }

    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    next(error)
  }
}
