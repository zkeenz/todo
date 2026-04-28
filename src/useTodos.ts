import { useState, useEffect } from 'react'
import type { Todo, Filter } from './types'

const STORAGE_KEY = 'todos'

function load(): Todo[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(load)
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const add = (text: string, dueDate?: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos(prev => [
      { id: crypto.randomUUID(), text: trimmed, completed: false, createdAt: Date.now(), dueDate },
      ...prev,
    ])
  }

  const setDueDate = (id: string, dueDate: string | undefined) =>
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, dueDate } : t)))

  const toggle = (id: string) =>
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)))

  const remove = (id: string) =>
    setTodos(prev => prev.filter(t => t.id !== id))

  const edit = (id: string, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) {
      remove(id)
      return
    }
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text: trimmed } : t)))
  }

  const clearCompleted = () =>
    setTodos(prev => prev.filter(t => !t.completed))

  const toggleAll = () => {
    const allDone = todos.every(t => t.completed)
    setTodos(prev => prev.map(t => ({ ...t, completed: !allDone })))
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length

  return { todos: filtered, filter, setFilter, add, toggle, remove, edit, setDueDate, clearCompleted, toggleAll, activeCount, completedCount }
}
