import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

interface TodoFormProps {
  addTodo: (task: string) => void;
}

export default function TodoForm({ addTodo }: TodoFormProps) {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      addTodo(value.trim());
      setValue("");
    }
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
        placeholder="Add Task"
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
}