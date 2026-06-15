"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme, THEMES, } from "@/app/contexts/ThemeContext";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // بستن منو با کلیک بیرون
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = THEMES.find((t) => t.id === theme);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="btn-secondary flex items-center gap-2"
      >
        <span>تم: {current?.label}</span>
      </button>

      {open && (
        <div className="absolute inset-e-0 mt-2 w-40 rounded-lg border border-border bg-card p-1 shadow-lg z-50">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
              className="block w-full rounded-md px-3 py-2 text-start hover:bg-secondary"
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
