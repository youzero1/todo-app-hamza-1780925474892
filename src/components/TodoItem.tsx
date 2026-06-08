import { useState, useRef, useEffect } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import type { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

const priorityDot: Record<string, string> = {
  low: 'bg-emerald-400',
  medium: 'bg-amber-400',
  high: 'bg-red-400',
};

const priorityLabel: Record<string, string> = {
  low: 'text-emerald-600',
  medium: 'text-amber-500',
  high: 'text-red-500',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function handleEditSubmit(): void {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    } else {
      setEditText(todo.text);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  return (
    <li
      className={clsx(
        'group flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors',
        todo.completed && 'opacity-60'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
          todo.completed
            ? 'bg-brand-500 border-brand-500 text-white'
            : 'border-gray-300 hover:border-brand-400'
        )}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && <Check size={12} strokeWidth={3} />}
      </button>

      {/* Priority dot */}
      <span
        className={clsx('flex-shrink-0 w-2 h-2 rounded-full', priorityDot[todo.priority])}
        title={`${todo.priority} priority`}
      />

      {/* Text or Edit Input */}
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
          onBlur={handleEditSubmit}
          onKeyDown={handleKeyDown}
          className="flex-1 text-gray-800 bg-brand-50 border border-brand-300 rounded-lg px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-brand-400"
        />
      ) : (
        <span
          onDoubleClick={() => { if (!todo.completed) setEditing(true); }}
          className={clsx(
            'flex-1 text-gray-800 text-sm leading-relaxed cursor-default select-none',
            todo.completed && 'line-through text-gray-400'
          )}
          title={!todo.completed ? 'Double-click to edit' : undefined}
        >
          {todo.text}
        </span>
      )}

      {/* Priority badge */}
      <span className={clsx('text-xs font-semibold hidden sm:inline-block', priorityLabel[todo.priority])}>
        {todo.priority}
      </span>

      {/* Action buttons */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {editing ? (
          <>
            <button
              onClick={handleEditSubmit}
              className="p-1.5 rounded-lg text-brand-500 hover:bg-brand-50 transition-colors"
              title="Save"
            >
              <Check size={15} />
            </button>
            <button
              onClick={() => { setEditText(todo.text); setEditing(false); }}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
              title="Cancel"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            {!todo.completed && (
              <button
                onClick={() => setEditing(true)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-brand-50 transition-colors"
                title="Edit"
              >
                <Pencil size={15} />
              </button>
            )}
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Delete"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
