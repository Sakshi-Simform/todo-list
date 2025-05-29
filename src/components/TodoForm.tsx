import { useState } from 'react';

interface TodoFormProps {
  addTodo: (task: string) => void;
}

export default function TodoForm({ addTodo }: TodoFormProps) {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      addTodo(value.trim());
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)} 
        className="todo-input"
        placeholder="Add Task"
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
}