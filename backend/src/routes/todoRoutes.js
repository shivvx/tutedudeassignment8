import express from 'express'
import { getTodos, createTodo, updateTodo, updateTodoStatus, deleteTodo } from '../controllers/todoController.js'

const router = express.Router()

// Route mapping for core todos endpoint
router.get('/', getTodos)
router.post('/', createTodo)

// Route mapping for operations on specific todo items
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)

// Route mapping for toggling status
router.patch('/:id/status', updateTodoStatus)

export default router
