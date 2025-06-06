import { useContext } from "react";
import { ThemeContext } from "@/components/Theme";
import type { ThemeContextType } from "@/types/todo.types";

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}