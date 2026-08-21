import Todo from '../models/Todo.js'

// Fetch todos from database using filters
export const getAllTodos = async (search, completed) => {
  const query = {}

  if (search) {
    // case insensitive match for search string
    query.title = { $regex: search, $options: 'i' }
  }

  if (completed !== undefined) {
    query.completed = completed === 'true'
  }

  // Sort by latest created first
  return await Todo.find(query).sort({ createdAt: -1 })
}

// Create new todo record
export const createTodo = async (todoData) => {
  return await Todo.create(todoData)
}

// Update existing todo record details
export const updateTodo = async (id, todoData) => {
  return await Todo.findByIdAndUpdate(id, todoData, { new: true })
}

// Update just the completed field
export const updateTodoStatus = async (id, completed) => {
  return await Todo.findByIdAndUpdate(id, { completed }, { new: true })
}

// Delete todo by ID
export const deleteTodo = async (id) => {
  return await Todo.findByIdAndDelete(id)
}
