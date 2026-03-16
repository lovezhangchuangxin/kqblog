"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore, useCallback, useState, useRef, useEffect } from "react";

const themes = [
  { name: "light", label: "浅色" },
  { name: "dark", label: "深色" },
  { name: "ocean", label: "海洋" },
  { name: "forest", label: "森林" },
  { name: "system", label: "跟随系统" },
] as const;

function useMounted() {
  return useSyncExternalStore(
    useCallback(() => () => {}, []),
    () => true,
    () => false
  );
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className="w-16 h-9 rounded-lg bg-secondary animate-pulse" />
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 触发按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                   bg-secondary/50 hover:bg-secondary
                   border border-border/50 hover:border-border
                   text-sm font-medium text-foreground
                   transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="切换主题"
        aria-expanded={isOpen}
      >
        <span>主题</span>
        <svg
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 下拉选项 */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 py-1 min-w-[120px]
                     bg-background/95 backdrop-blur-sm
                     border border-border rounded-lg shadow-lg
                     animate-in fade-in-0 zoom-in-95 duration-150"
        >
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => {
                setTheme(t.name);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm
                         transition-colors duration-150
                         ${
                           theme === t.name
                             ? "text-primary bg-primary/10"
                             : "text-foreground hover:bg-secondary"
                         }`}
            >
              {t.label}
              {theme === t.name && (
                <span className="float-right text-primary">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
