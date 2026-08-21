import React, { useState } from 'react'
import TodoItem from './TodoItem'
import { useTodo } from '../context/TodoContext'

function TodoList({ todos, onToggleComplete, onEdit, onDelete }) {
  const { searchTerm, setSearchTerm } = useTodo()
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  // Apply filters on the frontend todo items list
  const filteredTodos = todos.filter((todo) => {
    let statusOk = true
    if (statusFilter === 'completed') statusOk = todo.completed
    if (statusFilter === 'active') statusOk = !todo.completed

    let priorityOk = true
    if (priorityFilter !== 'all') priorityOk = todo.priority === priorityFilter

    return statusOk && priorityOk
  })

  return (
    <div className="todo-list-container">

      <div className="todo-list-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="status-filter">Status</label>
            <select id="status-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="priority-filter">Priority</label>
            <select id="priority-filter" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>

      <div className="todo-items-list">
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <p>No tasks found. Try changing your filters or add a new task!</p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>

    </div>
  )
}

export default TodoList
