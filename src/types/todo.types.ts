export interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
  originalTask?: string;
}

 export interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export interface TodosState {
  todos: Array<TodoItem>;
}