import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import type { TodoItem } from '@/types/todo.types';

interface EditTodoFormProps {
  editTodo: (updatedTask: string, id: string) => void;
  task: TodoItem;
}

export const EditTodoForm: React.FC<EditTodoFormProps> = ({ editTodo, task }) => {
  const [value, setValue] = useState<string>(task.task);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTodo(value.trim(), task.id);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="todo-input"
        placeholder="Update Task..."
      />
      <button type="submit" className="todo-btn">Save Task</button>
    </form>
  );
}