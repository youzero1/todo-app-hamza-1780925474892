import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFooter from '@/components/TodoFooter';
import { CheckSquare } from 'lucide-react';

export default function TodoPage() {
  const {
    todos,
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="bg-brand-500 text-white p-2 rounded-xl shadow-md">
            <CheckSquare size={28} />
          </div>
          <h1 className="text-4xl font-bold text-brand-800 tracking-tight">
            My Todos
          </h1>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-8 justify-center">
          <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-brand-100 text-center">
            <p className="text-2xl font-bold text-brand-600">{todos.length}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
          </div>
          <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-brand-100 text-center">
            <p className="text-2xl font-bold text-amber-500">{activeCount}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Active</p>
          </div>
          <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-brand-100 text-center">
            <p className="text-2xl font-bold text-emerald-500">{completedCount}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Done</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-brand-100 overflow-hidden">
          <TodoInput addTodo={addTodo} toggleAll={toggleAll} hasTodos={todos.length > 0} />

          {filteredTodos.length > 0 ? (
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ) : (
            <div className="py-16 text-center text-gray-400">
              <CheckSquare size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium">
                {filter === 'all' ? 'No todos yet!' : filter === 'active' ? 'No active todos!' : 'No completed todos!'}
              </p>
              {filter === 'all' && (
                <p className="text-sm mt-1">Add your first task above</p>
              )}
            </div>
          )}

          {todos.length > 0 && (
            <TodoFooter
              activeCount={activeCount}
              completedCount={completedCount}
              filter={filter}
              setFilter={setFilter}
              clearCompleted={clearCompleted}
            />
          )}
        </div>
      </div>
    </div>
  );
}
