import React, { createContext, useContext, useState } from 'react'
import useFetch from '../hooks/useFetch'
import * as todoService from '../services/todoService'

// Global context for Todo app state sharing across components
const TodoContext = createContext()

// Custom hook to consume the todo context state easily
export const useTodo = () => {
  return useContext(TodoContext)
}

export const TodoProvider = ({ children }) => {
  // Relative API path - mapped locally by Vite dev server proxy, and in prod by Vercel routing
  const API_URL = '/api/todos'

  const [searchTerm, setSearchTerm] = useState('')
  const [editingTodo, setEditingTodo] = useState(null)
  const [actionError, setActionError] = useState('')

  // Build request URL with search query param if set
  let fetchUrl = API_URL
  if (searchTerm) {
    fetchUrl = API_URL + '?search=' + encodeURIComponent(searchTerm)
  }

  // Fetch todos on mount and whenever search term changes
  const { data: todos, loading, error, refetch } = useFetch(fetchUrl)

  // Add a new todo and refresh the list
  const handleAddTodo = async (todoData) => {
    setActionError('')
    try {
      await todoService.createTodo(todoData)
      refetch()
    } catch (err) {
      setActionError(err.message || 'Failed to add task. Please try again.')
      throw err
    }
  }

  // Update existing todo and refresh list
  const handleUpdateTodo = async (id, todoData) => {
    setActionError('')
    try {
      await todoService.updateTodo(id, todoData)
      setEditingTodo(null)
      refetch()
    } catch (err) {
      setActionError(err.message || 'Failed to save changes. Please try again.')
      throw err
    }
  }

  // Toggle todo completion checkbox
  const handleToggleComplete = async (id, completed) => {
    setActionError('')
    try {
      await todoService.updateTodoStatus(id, completed)
      refetch()
    } catch (err) {
      setActionError(err.message || 'Failed to update task status.')
    }
  }

  // Delete a todo from the list
  const handleDeleteTodo = async (id) => {
    setActionError('')
    const sure = window.confirm('Are you sure you want to delete this task?')
    if (!sure) return

    try {
      await todoService.deleteTodo(id)
      if (editingTodo && editingTodo._id === id) {
        setEditingTodo(null)
      }
      refetch()
    } catch (err) {
      setActionError(err.message || 'Failed to delete task.')
    }
  }

  return (
    <TodoContext.Provider value={{
      todos: todos || [],
      loading,
      error,
      editingTodo,
      setEditingTodo,
      actionError,
      setActionError,
      searchTerm,
      setSearchTerm,
      handleAddTodo,
      handleUpdateTodo,
      handleToggleComplete,
      handleDeleteTodo
    }}>
      {children}
    </TodoContext.Provider>
  )
}

export default TodoContext
