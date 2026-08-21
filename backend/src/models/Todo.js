import mongoose from 'mongoose'

// Mongoose schema definition for Todo model
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter a task title'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date
  }
}, {
  // auto add createdAt and updatedAt fields
  timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema)
export default Todo
