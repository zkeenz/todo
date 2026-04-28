import { useState, useRef } from 'react'
import { useTodos } from './useTodos'
import TodoItem from './TodoItem'
import type { Filter } from './types'

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'すべて', value: 'all' },
  { label: '未完了', value: 'active' },
  { label: '完了済み', value: 'completed' },
]

export default function App() {
  const { todos, filter, setFilter, add, toggle, remove, edit, setDueDate, clearCompleted, toggleAll, activeCount, completedCount } =
    useTodos()
  const [input, setInput] = useState('')
  const [dueDate, setDueDateInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAdd = () => {
    add(input, dueDate || undefined)
    setInput('')
    setDueDateInput('')
    inputRef.current?.focus()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center pt-16 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8 tracking-tight">
          Todo
        </h1>

        {/* Input */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              placeholder="新しいTodoを入力..."
              className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 px-4 py-2.5 text-sm outline-none focus:border-violet-400 dark:focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-900 transition-all"
            />
            <button
              onClick={handleAdd}
              className="bg-violet-500 hover:bg-violet-600 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-colors shadow-sm"
            >
              追加
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 dark:text-gray-500">期限</span>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDateInput(e.target.value)}
              className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 px-3 py-1.5 text-xs outline-none focus:border-violet-400 dark:focus:border-violet-500 transition-all"
            />
          </div>
        </div>

        {/* List */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          {todos.length > 0 && (
            <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
              <button
                onClick={toggleAll}
                className="text-xs text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
              >
                すべて切替
              </button>
            </div>
          )}

          {todos.length === 0 ? (
            <div className="py-16 text-center text-gray-400 dark:text-gray-600 text-sm">
              {filter === 'completed' ? '完了済みのTodoはありません' :
               filter === 'active' ? '未完了のTodoはありません' :
               'Todoを追加してみましょう'}
            </div>
          ) : (
            <ul>
              {todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={() => toggle(todo.id)}
                  onRemove={() => remove(todo.id)}
                  onEdit={text => edit(todo.id, text)}
                  onSetDueDate={date => setDueDate(todo.id, date)}
                />
              ))}
            </ul>
          )}

          {/* Footer */}
          {(activeCount > 0 || completedCount > 0) && (
            <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
              <span>{activeCount} 件残り</span>
              <div className="flex gap-1">
                {FILTERS.map(f => (
                  <button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    className={`px-2 py-1 rounded-md transition-colors ${
                      filter === f.value
                        ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950'
                        : 'hover:text-gray-600 dark:hover:text-gray-300'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="hover:text-red-400 dark:hover:text-red-400 transition-colors"
                >
                  完了済みを削除
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
