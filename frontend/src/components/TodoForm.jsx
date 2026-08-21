import React, { useState, useEffect } from 'react'

function TodoForm({ onSubmit, initialTodo, onCancel }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')

  // Populates form fields when editing a todo
  useEffect(() => {
    if (initialTodo) {
      setTitle(initialTodo.title || '')
      setDescription(initialTodo.description || '')
      setPriority(initialTodo.priority || 'medium')
      // Format due date string to match standard HTML date input format
      if (initialTodo.dueDate) {
        setDueDate(new Date(initialTodo.dueDate).toISOString().split('T')[0])
      } else {
        setDueDate('')
      }
    } else {
      setTitle('')
      setDescription('')
      setPriority('medium')
      setDueDate('')
    }
    setError('')
  }, [initialTodo])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Form inputs client side validation
    if (!title.trim()) {
      setError('Please enter a task title')
      return
    }

    if (title.length > 100) {
      setError('Title cannot exceed 100 characters')
      return
    }

    if (description.length > 500) {
      setError('Description cannot exceed 500 characters')
      return
    }

    if (dueDate) {
      const today = new Date().toISOString().split('T')[0]
      if (dueDate < today) {
        setError('Due date cannot be in the past')
        return
      }
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || null
    })

    // Reset input fields only if it's a new task creation
    if (!initialTodo) {
      setTitle('')
      setDescription('')
      setPriority('medium')
      setDueDate('')
    }
    setError('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h3>{initialTodo ? 'Edit Task' : 'Add New Task'}</h3>

      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Finish chemistry project"
          maxLength={120}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about this task..."
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group col">
          <label htmlFor="priority">Priority</label>
          <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group col">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="form-actions">
        {initialTodo && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {initialTodo ? 'Save Changes' : 'Add Task'}
        </button>
      </div>
    </form>
  )
}

export default TodoForm
