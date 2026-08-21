import axios from 'axios'

// API endpoint path resolved automatically via Vite proxy locally or Vercel routing in prod
const API_URL = '/api/todos'

// Create a new task via POST call
export const createTodo = async (todoData) => {
  try {
    const response = await axios.post(API_URL, todoData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Could not create task. Try again.')
  }
}

// Update task details via PUT call
export const updateTodo = async (id, todoData) => {
  try {
    const response = await axios.put(API_URL + '/' + id, todoData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Could not update task. Try again.')
  }
}

// Toggle status via PATCH call
export const updateTodoStatus = async (id, completed) => {
  try {
    const response = await axios.patch(API_URL + '/' + id + '/status', { completed })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Could not update task status. Try again.')
  }
}

// Delete task via DELETE call
export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(API_URL + '/' + id)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Could not delete task. Try again.')
  }
}
