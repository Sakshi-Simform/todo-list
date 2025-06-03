import type { TodoItem } from "../types/todo.types";

export const addNewTodo = (todos: TodoItem[], task: string): TodoItem[] => {
    return [
        ...todos,
        {
            id: crypto.randomUUID(),
            task,
            completed: false,
            isEditing: false,
        },
    ];
};

export const deleteTodoById = (todos: TodoItem[], id: string): TodoItem[] =>
    todos.filter((todo) => todo.id !== id);

export const toggleEditMode = (todos: TodoItem[], id: string): TodoItem[] =>
    todos.map((todo) =>
        todo.id === id && !todo.completed
            ? { ...todo, isEditing: !todo.isEditing }
            : { ...todo, isEditing: false }
    );

export const updateTask = (
    todos: TodoItem[],
    id: string,
    updatedTask: string
): TodoItem[] =>
    todos.map((todo) =>
        todo.id === id ? { ...todo, task: updatedTask, isEditing: false } : todo
    );

export const toggleTaskComplete = (todos: TodoItem[], id: string): TodoItem[] =>
    todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

export const changeTaskText = (
    todos: TodoItem[],
    id: string,
    newText: string
): TodoItem[] =>
    todos.map((todo) =>
        todo.id === id ? { ...todo, task: newText } : todo
    );

export const saveEditMode = (todos: TodoItem[], id: string): TodoItem[] =>
    todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: false } : todo
    );