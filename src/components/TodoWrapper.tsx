import { useState } from "react";
import type { ChangeEvent } from "react";
import { Todo } from "./Todo";
import TodoForm from "./TodoForm";
import { EditTodoForm } from "./EditForm";
import type { TodoItem } from "../types/todo.types";

type Status = "all" | "completed" | "incompleted";

export default function TodoWrapper() {
  const [todos, setTodos] = useState<Array<TodoItem>>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<Status>("all");

  const addTodo = (todo: string): void => {
    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        task: todo,
        completed: false,
        isEditing: false,
      },
    ]);
  };

  const deleteTodo = (id: string): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id && !todo.completed
          ? { ...todo, isEditing: !todo.isEditing }
          : todo
      )
    );
  };

  const editTask = (task: string, id: string): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: false } : todo
      )
    );
  };

  const toggleComplete = (id: string): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as Status);
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "incompleted") return !todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.task.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="TodoWrapper">
      <div className="header-search-wrapper">
        <h1>Task Manager</h1>
        <div className="header-right-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={handleSearch}
          />

          <select
            value={filter}
            onChange={handleFilter}
            className="filter-dropdown"
            aria-label="Filter tasks"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incompleted">Incomplete</option>
          </select>
        </div>
      </div>

      <TodoForm addTodo={addTodo} />

      {filteredTodos.length === 0 ? (
        <p className="empty-message">No Tasks</p>
      ) : (
        filteredTodos.map((todo) =>
          todo.isEditing ? (
            <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
          ) : (
            <Todo
              key={todo.id}
              task={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              toggleComplete={toggleComplete}
            />
          )
        )
      )}
    </div>
  );
}
