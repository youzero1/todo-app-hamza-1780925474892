import type { Todo } from '@/types';
import TodoItem from '@/components/TodoItem';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  return (
    <ul className="divide-y divide-gray-50">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
