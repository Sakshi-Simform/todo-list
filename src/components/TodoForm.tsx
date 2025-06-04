import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TodoFormProps {
  addTodo: (task: string) => void;
  isEditing: boolean;
}

export default function TodoForm({ addTodo, isEditing }: TodoFormProps) {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo(value.trim());
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder={
          isEditing ? "Complete task editing ..." : "Add Task"
        }
        disabled={isEditing}
      />
      <Button
        type="submit"
        className="todo-btn"
        tabIndex={0}
        aria-disabled={isEditing || !value.trim()}
        onClick={(e) => {
          if (isEditing || !value.trim()) {
          e.preventDefault();
          return;
          }
        }}
      >
      Add Task
      </Button>

      {isEditing && (
        <div className="warning-message">
          Complete editing before adding a new task.
        </div>
      )}
    </form>
  );
}