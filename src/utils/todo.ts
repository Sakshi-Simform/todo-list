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
    todos.map((todo) => {
        if (todo.id === id && !todo.completed) {
            return {
                ...todo,
                isEditing: !todo.isEditing,
                originalTask: todo.originalTask ?? todo.task,
            };
        }
        return {
            ...todo,
            isEditing: false,
        };
    });

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

export const cancelEditMode = (todos: TodoItem[], id: string): TodoItem[] =>

    todos.map((todo) =>

        todo.id === id
            ? {
                ...todo,
                task: todo.originalTask || todo.task,
                isEditing: false,
                originalTask: undefined,
            }
            : todo,
    );