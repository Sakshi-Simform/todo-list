import { useState } from 'react';
import type { FormEvent } from 'react';
import type { TodoItem } from '@/types/todo.types';

interface EditTodoFormProps {
  editTodo: (updatedTask: string, id: string) => void;
  task: TodoItem;
}

export const EditTodoForm: React.FC<EditTodoFormProps> = ({ editTodo, task }) => {
  const [value, setValue] = useState<string>(task.task);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) {
      return; 
    }
    editTodo(value.trim(), task.id);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <div className="input-wrapper">
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="todo-update"
          placeholder="Update Task..."
          autoFocus
        />
      </div>
      <button type="submit" className="todo-btn" disabled={!value.trim()}>
        Save Task
      </button>
    </form>
  );
}
