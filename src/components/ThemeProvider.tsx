"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface ThemeOption {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const themes: ThemeOption[] = [
  { id: "default", name: "智慧紫", icon: "💜", description: "经典优雅的知识感" },
  { id: "cyberpunk", name: "赛博朋克", icon: "🌃", description: "霓虹闪烁的未来感" },
  { id: "dark", name: "暗夜模式", icon: "🌙", description: "护眼深色，夜间阅读" },
  { id: "nature", name: "自然森林", icon: "🌿", description: "大地色系，沉静自然" },
  { id: "ocean", name: "深海蓝", icon: "🌊", description: "清爽蓝色，理性冷静" },
  { id: "sunset", name: "日落暖阳", icon: "🌅", description: "温暖橘红，热情活力" },
];

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "cyberpunk",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

const STORAGE_KEY = "mm-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState("cyberpunk");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && themes.some((t) => t.id === saved)) {
      setThemeState(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
    setMounted(true);
  }, []);

  const setTheme = (id: string) => {
    setThemeState(id);
    document.documentElement.setAttribute("data-theme", id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: "default", setTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
