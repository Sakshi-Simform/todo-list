import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type { TodosState } from '@/types/todo.types';

const initialState: TodosState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: crypto.randomUUID(),
        task: action.payload,
        completed: false,
        isEditing: false,
      });
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleEditMode: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.map(todo => {
        if (todo.id === action.payload && !todo.completed) {
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
    },
    updateTask: (state, action: PayloadAction<{ id: string; task: string }>) => {
      const { id, task } = action.payload;
      state.todos = state.todos.map(todo =>
        todo.id === id ? { ...todo, task, isEditing: false } : todo
      );
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
    changeTaskText: (state, action: PayloadAction<{ id: string; task: string }>) => {
      const { id, task } = action.payload;
      state.todos = state.todos.map(todo =>
        todo.id === id ? { ...todo, task } : todo
      );
    },
    saveEditMode: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.map(todo =>
        todo.id === action.payload ? { ...todo, isEditing: false } : todo
      );
    },
    cancelEditMode: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.map(todo =>
        todo.id === action.payload
          ? {
              ...todo,
              task: todo.originalTask || todo.task,
              isEditing: false,
              originalTask: undefined,
            }
          : todo
      );
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleEditMode,
  updateTask,
  toggleComplete,
  changeTaskText,
  saveEditMode,
  cancelEditMode,
} = todoSlice.actions;

export default todoSlice.reducer;