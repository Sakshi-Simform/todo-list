import { useState } from "react";
import type { ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import TodoForm from "./TodoForm";
import { EditTodoForm } from "./EditForm";
import type { TodoItem } from "../types/todo.types";

export default function TodoWrapper() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "completed" | "incompleted">("all");

  const addTodo = (todo: string): void => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
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
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
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

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as "all" | "completed" | "incompleted");
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
            onChange={handleSearchChange}
          />

          <select
            value={filter}
            onChange={handleFilterChange}
            className="filter-dropdown"
            aria-label="Filter tasks"
            style={{ marginLeft: "1rem", padding: "0.3rem 0.6rem", fontSize: "1rem" }}
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