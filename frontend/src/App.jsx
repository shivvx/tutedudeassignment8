import React from 'react'
import { useTodo } from './context/TodoContext'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const {
    todos,
    loading,
    error,
    editingTodo,
    setEditingTodo,
    actionError,
    setActionError,
    handleAddTodo,
    handleUpdateTodo,
    handleToggleComplete,
    handleDeleteTodo
  } = useTodo()

  // Form submit handles both adding a new task and saving edits
  const handleSubmitTodo = async (todoData) => {
    try {
      if (editingTodo) {
        await handleUpdateTodo(editingTodo._id, todoData)
      } else {
        await handleAddTodo(todoData)
      }
    } catch (err) {
      // Error is stored inside global context state, so nothing else to do here
    }
  }

  const handleEditTodo = (todo) => {
    setActionError('')
    setEditingTodo(todo)
    // Scroll smoothly to top where the form is located
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingTodo(null)
  }

  return (
    <div className="app-container">
      <header>
        <h1>Task Manager</h1>
        <p>Keep track of your daily tasks, priorities, and deadlines</p>
      </header>

      {actionError && <div className="alert-error">{actionError}</div>}

      <main className="main-content">
        <section className="form-section">
          <TodoForm
            onSubmit={handleSubmitTodo}
            initialTodo={editingTodo}
            onCancel={handleCancelEdit}
          />
        </section>

        <section className="list-section">
          {loading && todos.length === 0 ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading your tasks...</p>
            </div>
          ) : error ? (
            <div className="alert-error">
              <h4>Error loading tasks</h4>
              <p>{error}</p>
            </div>
          ) : (
            <TodoList
              todos={todos}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTodo}
              onDelete={handleDeleteTodo}
            />
          )}
        </section>
      </main>
    </div>
  )
}

export default App
