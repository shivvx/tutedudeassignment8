import React from 'react'

function TodoItem({ todo, onToggleComplete, onEdit, onDelete }) {
  const { _id, title, description, completed, priority, dueDate } = todo

  // Helper function to format MongoDB ISO date string to a simple readable date
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // Check if task deadline is past today and is not marked completed yet
  const isOverdue = dueDate && new Date(dueDate) < new Date() && !completed

  return (
    <div className={`todo-item ${completed ? 'completed' : ''} ${priority}-priority`}>

      <div className="todo-item-checkbox">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggleComplete(_id, !completed)}
        />
      </div>

      <div className="todo-item-content">
        <h4 className="todo-item-title">{title}</h4>
        {description && <p className="todo-item-description">{description}</p>}

        <div className="todo-item-meta">
          <span className={`priority-badge ${priority}`}>{priority}</span>

          {dueDate && (
            <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
              {isOverdue ? 'Overdue: ' : 'Due: '}
              {formatDate(dueDate)}
            </span>
          )}
        </div>
      </div>

      <div className="todo-item-actions">
        <button className="btn-icon btn-edit" onClick={() => onEdit(todo)}>Edit</button>
        <button className="btn-icon btn-delete" onClick={() => onDelete(_id)}>Delete</button>
      </div>

    </div>
  )
}

export default TodoItem
