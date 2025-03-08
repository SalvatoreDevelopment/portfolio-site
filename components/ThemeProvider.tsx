import { createContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  font: string;
  setFont: (font: string) => void;
  borderRadius: string;
  setBorderRadius: (radius: string) => void;
  transitionSpeed: string;
  setTransitionSpeed: (speed: string) => void;
  neonEffect: boolean;
  setNeonEffect: (state: boolean) => void;
  glitchEffect: boolean;
  setGlitchEffect: (state: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("dark");
  const [font, setFont] = useState("sans-serif");
  const [borderRadius, setBorderRadius] = useState("rounded-lg");
  const [transitionSpeed, setTransitionSpeed] = useState("medium");
  const [neonEffect, setNeonEffect] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-family", font);
    document.documentElement.style.setProperty("--border-radius", borderRadius);
    document.documentElement.style.setProperty("--transition-speed", transitionSpeed);
    document.documentElement.style.setProperty("--background", theme === "red" ? "#8b0000" : theme === "blue" ? "#00008b" : theme === "green" ? "#006400" : "#101828");
    document.documentElement.style.setProperty("--foreground", theme === "red" ? "#ffffff" : "#ffffff");

  // Rimuove tutte le classi di sfondo esistenti
  document.body.classList.remove("bg-gray-900", "bg-red-500", "bg-blue-500", "bg-green-500");

  // Aggiunge la nuova classe di sfondo
  document.body.classList.add(theme === "red" ? "bg-red-500" : theme === "blue" ? "bg-blue-500" : theme === "green" ? "bg-green-500" : "bg-gray-900");

  console.log("Tema aggiornato:", theme);
  console.log("Classe BODY aggiornata:", document.body.className);
  
    console.log("Tema aggiornato:", theme);
    console.log("Nuovo valore --background:", getComputedStyle(document.documentElement).getPropertyValue("--background"));

    if (neonEffect) {
      document.body.classList.add("neon-mode");
    } else {
      document.body.classList.remove("neon-mode");
    }

    if (glitchEffect) {
      document.body.classList.add("glitch-mode");
    } else {
      document.body.classList.remove("glitch-mode");
    }

  }, [theme, font, borderRadius, transitionSpeed, neonEffect, glitchEffect]);

  return (
    <ThemeContext.Provider value={{ 
      theme, setTheme, 
      font, setFont, 
      borderRadius, setBorderRadius, 
      transitionSpeed, setTransitionSpeed, 
      neonEffect, setNeonEffect, 
      glitchEffect, setGlitchEffect 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

