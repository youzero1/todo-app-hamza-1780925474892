import clsx from 'clsx';
import type { FilterType } from '@/types';

type TodoFooterProps = {
  activeCount: number;
  completedCount: number;
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  clearCompleted: () => void;
};

const filters: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function TodoFooter({
  activeCount,
  completedCount,
  filter,
  setFilter,
  clearCompleted,
}: TodoFooterProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-gray-50 border-t border-gray-100">
      <span className="text-sm text-gray-500">
        <span className="font-semibold text-gray-700">{activeCount}</span>{' '}
        {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <div className="flex items-center gap-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              'px-3 py-1 rounded-lg text-sm font-medium transition-all',
              filter === f.value
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-gray-500 hover:text-brand-600 hover:bg-brand-50'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button
          onClick={clearCompleted}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  );
}
