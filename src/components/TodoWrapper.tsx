import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { Todo } from "./Todo";
import TodoForm from "./TodoForm";
import { EditTodoForm } from "./EditForm";
import type { TodoItem } from "../types/todo.types";
import {
  addNewTodo,
  deleteTodoById,
  toggleEditMode,
  updateTask,
  toggleTaskComplete,
  changeTaskText,
  saveEditMode,
  cancelEditMode
} from "../utils/todo";

type Filter = "all" | "completed" | "incompleted";

export default function TodoWrapper() {
  const [todos, setTodos] = useState<Array<TodoItem>>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const isEditingTask = todos.some((todo) => todo.isEditing);

  const addTodo = (task: string): void => {
    if (isEditingTask) {
      alert("Complete editing before entering new task.");
      return;
    }
    setTodos(addNewTodo(todos, task));
  };

  const deleteTodo = (id: string): void => {
    setTodos(deleteTodoById(todos, id));
  };

  const editTodo = (id: string): void => {
    setTodos(toggleEditMode(todos, id));
  };

  const editTask = (task: string, id: string): void => {
    setTodos(updateTask(todos, id, task));
  };

  const toggleComplete = (id: string): void => {
    setTodos(toggleTaskComplete(todos, id));
  };

  const onChangeTask = (id: string, newTask: string): void => {
    setTodos(changeTaskText(todos, id, newTask));
  };

  const onSaveEdit = (id: string): void => {
    setTodos(saveEditMode(todos, id));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>): void => {
    setFilter(e.target.value as Filter);
  };

  const cancelEdit = (id: string): void => {
    setTodos(cancelEditMode(todos, id));
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const editingTask = todos.find((t) => t.isEditing);
        if (editingTask) {
          setTodos(cancelEditMode(todos, editingTask.id));
        }
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [todos]);

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
      <div className="fixed-header">
        <div className="header-search-wrapper">
          <h1 tabIndex={0}>Task Manager</h1>
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

        <TodoForm addTodo={addTodo} isEditing={isEditingTask} />
      </div>

      <div className="task-scroll-area">
        {filteredTodos.length === 0 ? (
          <p className="empty-message">No Tasks</p>
        ) : (
          filteredTodos.map((todo) =>
            todo.isEditing ? (
              <EditTodoForm
                key={todo.id}
                onEditTodo={editTask}
                task={todo}
              />
            ) : (
              <Todo
                key={todo.id}
                task={todo}
                onDeleteTodo={deleteTodo}
                editTodo={editTodo}
                toggleComplete={toggleComplete}
                onChangeTask={onChangeTask}
                onSaveEdit={onSaveEdit}
                onCancelEdit={cancelEdit}
              />
            )
          )
        )}
      </div>
    </div>
  );
}