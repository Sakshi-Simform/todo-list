import { createContext, useState} from "react";
import type { ReactNode } from "react"
import type { ThemeContextType } from "@/types/todo.types";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProp{
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProp) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}