import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // الهام از pgAdmin - رنگ‌های ملایم و جذاب
        primary: {
          50:  "#f0f4ff",  // آبی خیلی روشن
          100: "#e0eaff",
          500: "#4f7cee",  // آبی اصلی
          600: "#3b66d4",
          700: "#2d4fb8",
        },
        success: {
          500: "#22c55e",  // سبز
          600: "#16a34a",
        },
        warning: {
          500: "#f59e0b",  // نارنجی
          600: "#d97706",
        },
        purple: {
          500: "#a855f7",  // بنفش
          600: "#9333ea",
        },
        slate: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          700: "#334155",
          800: "#1e293b",
        },
      },
      fontFamily: {
        sans: ["Vazirmatn", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08)",
        hover: "0 4px 12px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
