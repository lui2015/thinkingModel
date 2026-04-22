"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme, themes } from "./ThemeProvider";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const current = themes.find((t) => t.id === theme) || themes[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-surface-alt hover:bg-border/50 transition-colors"
        aria-label="切换主题"
        title="切换主题"
      >
        <span className="text-base">{current.icon}</span>
        <span className="hidden sm:inline text-text-secondary">{current.name}</span>
        <svg
          className={`w-3.5 h-3.5 text-text-light transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-xl shadow-xl z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-2 text-xs font-semibold text-text-light uppercase tracking-wider">
            选择主题风格
          </div>
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                theme === t.id
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-surface-alt text-text"
              }`}
            >
              <span className="text-xl w-8 text-center">{t.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-text-secondary">{t.description}</div>
              </div>
              {theme === t.id && (
                <svg className="w-4 h-4 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
