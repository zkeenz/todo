import { useState, useRef, useEffect } from 'react'
import type { Todo } from './types'

interface Props {
  todo: Todo
  onToggle: () => void
  onRemove: () => void
  onEdit: (text: string) => void
}

export default function TodoItem({ todo, onToggle, onRemove, onEdit }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.select()
  }, [editing])

  const commit = () => {
    setEditing(false)
    onEdit(draft)
  }

  return (
    <li className="group flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <button
        onClick={onToggle}
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-violet-500 border-violet-500 text-white'
            : 'border-gray-300 dark:border-gray-600 hover:border-violet-400'
        }`}
        aria-label={todo.completed ? '未完了に戻す' : '完了にする'}
      >
        {todo.completed && (
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {editing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={e => {
            if (e.key === 'Enter') commit()
            if (e.key === 'Escape') { setEditing(false); setDraft(todo.text) }
          }}
          className="flex-1 bg-transparent outline-none border-b border-violet-400 text-gray-800 dark:text-gray-100 py-0.5"
        />
      ) : (
        <span
          onDoubleClick={() => { setEditing(true); setDraft(todo.text) }}
          className={`flex-1 text-sm cursor-default select-none ${
            todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-200'
          }`}
        >
          {todo.text}
        </span>
      )}

      <button
        onClick={onRemove}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-opacity ml-auto"
        aria-label="削除"
      >
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </li>
  )
}
