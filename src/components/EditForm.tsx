import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import type { TodoItem } from '@/types/todo.types';

interface EditTodoFormProps {
  onEditTodo: (updatedTask: string, id: string) => void;
  task: TodoItem;
}

export const EditTodoForm: React.FC<EditTodoFormProps> = ({  onEditTodo, task }) => {
  const [value, setValue] = useState<string>(task.task);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim() || value.trim() === task.task.trim()) return;
    onEditTodo(value.trim(), task.id);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-update"
        placeholder="Update Task..."
        autoFocus
      />

      <Button
        type="submit"
        className="todo-btn"
        disabled={!value.trim()}
      >
        Save Task
      </Button>
    </form>
  );
};