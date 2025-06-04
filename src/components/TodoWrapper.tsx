import  { useState, useEffect } from "react";
import type{ ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../components/Theme";
import type { RootState, AppDispatch } from "./store/store"; 
import {
  addTodo,
  deleteTodo,
  toggleEditMode,
  updateTask,
  toggleComplete,
  changeTaskText,
  saveEditMode,
  cancelEditMode,
} from "./store/TodoSlice";

import { Todo } from "./Todo";
import TodoForm from "./TodoForm";
import { EditTodoForm } from "./EditForm";
import { Input } from "./ui/input";

type Filter = "all" | "completed" | "incompleted";

export default function TodoWrapper() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const { theme, toggleTheme } = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const isEditingTask = todos.some((todo) => todo.isEditing);

  const handleAddTodo = (task: string) => {
    if (isEditingTask) {
      alert("Complete editing before entering new task.");
      return;
    }
    dispatch(addTodo(task));
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (id: string) => {
    dispatch(toggleEditMode(id));
  };

  const handleEditTask = (task: string, id: string) => {
    dispatch(updateTask({ id, task }));
  };

  const handleToggleComplete = (id: string) => {
    dispatch(toggleComplete(id));
  };

  const handleChangeTask = (id: string, newTask: string) => {
    dispatch(changeTaskText({ id, task: newTask }));
  };

  const handleSaveEdit = (id: string) => {
    dispatch(saveEditMode(id));
  };

  const handleCancelEdit = (id: string) => {
    dispatch(cancelEditMode(id));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as Filter);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const editingTask = todos.find((t) => t.isEditing);
        if (editingTask) {
          dispatch(cancelEditMode(editingTask.id));
        }
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [todos, dispatch]);

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
    <div className={`TodoWrapper ${theme}`}>
      <div className="fixed-header">
        <div className="header-search-wrapper">
          <h1 tabIndex={0}>Task Manager</h1>
          <div className="header-right-wrapper">
            <span onClick={toggleTheme} style={{ cursor: "pointer" }} aria-label="Toggle theme">
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </span>
            <Input
              type="text"
              className="search-input"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearch}
              aria-label="Search tasks"
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

        <TodoForm addTodo={handleAddTodo} isEditing={isEditingTask} />
      </div>

      <div className="task-scroll-area">
        {filteredTodos.length === 0 ? (
          <p className="empty-message">No Tasks</p>
        ) : (
          filteredTodos.map((todo) =>
            todo.isEditing ? (
              <EditTodoForm
                key={todo.id}
                onEditTodo={handleEditTask}
                task={todo}
              />
            ) : (
              <Todo
                key={todo.id}
                task={todo}
                onDeleteTodo={handleDeleteTodo}
                editTodo={handleEditTodo}
                toggleComplete={handleToggleComplete}
                onChangeTask={handleChangeTask}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
              />
            )
          )
        )}
      </div>
    </div>
  );
}