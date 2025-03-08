"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

// Definizione del contesto del tema
interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("⚡ Applicando il tema:", theme); // 🔍 DEBUG

      // Modifica delle variabili CSS
      document.documentElement.style.setProperty(
        "--background",
        theme === "dark"
          ? "#0a0a0a"
          : theme === "blue"
          ? "#001f3f"
          : theme === "red"
          ? "#8b0000"
          : "#ffffff"
      );

      document.documentElement.style.setProperty(
        "--foreground",
        theme === "dark" ? "#ededed" : "#171717"
      );

      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100vh" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
