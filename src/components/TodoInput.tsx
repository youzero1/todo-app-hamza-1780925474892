import { useState } from 'react';
import { Plus, ChevronsDown } from 'lucide-react';
import clsx from 'clsx';
import type { Priority } from '@/types';

type TodoInputProps = {
  addTodo: (text: string, priority: Priority) => void;
  toggleAll: () => void;
  hasTodos: boolean;
};

const priorityOptions: { label: string; value: Priority; color: string }[] = [
  { label: 'Low', value: 'low', color: 'text-emerald-600' },
  { label: 'Medium', value: 'medium', color: 'text-amber-500' },
  { label: 'High', value: 'high', color: 'text-red-500' },
];

export default function TodoInput({ addTodo, toggleAll, hasTodos }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    addTodo(text, priority);
    setText('');
  }

  return (
    <div className="border-b border-gray-100 px-6 py-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        {hasTodos && (
          <button
            type="button"
            onClick={toggleAll}
            className="text-gray-400 hover:text-brand-500 transition-colors flex-shrink-0"
            title="Toggle all"
          >
            <ChevronsDown size={22} />
          </button>
        )}
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 text-gray-800 placeholder-gray-400 text-base outline-none bg-transparent py-1"
          autoFocus
        />
        <select
          value={priority}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value as Priority)}
          className={clsx(
            'text-sm font-medium border border-gray-200 rounded-lg px-2 py-1 outline-none bg-white cursor-pointer',
            priority === 'low' && 'text-emerald-600',
            priority === 'medium' && 'text-amber-500',
            priority === 'high' && 'text-red-500'
          )}
        >
          {priorityOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className={opt.color}>
              {opt.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={!text.trim()}
          className={clsx(
            'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all',
            text.trim()
              ? 'bg-brand-500 text-white hover:bg-brand-600 shadow-sm hover:shadow-md'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          )}
        >
          <Plus size={16} />
          Add
        </button>
      </form>
    </div>
  );
}
