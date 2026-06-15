// app/contexts/ThemeContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'blue' | 'green' | 'pink' | 'purple';

const VALID_THEMES: Theme[] = ['light', 'dark', 'blue', 'green', 'pink', 'purple'];

type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('dark');

    useEffect(() => {
        const saved = localStorage.getItem('app-theme') as Theme | null;
        if (saved && VALID_THEMES.includes(saved)) {
            setThemeState(saved);
            document.documentElement.setAttribute('data-theme', saved);
        }
    }, []);

    const setTheme = (t: Theme) => {
        setThemeState(t);
        localStorage.setItem('app-theme', t);
        document.documentElement.setAttribute('data-theme', t);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}

export const THEMES: { id: Theme; label: string }[] = [
    { id: 'light',  label: 'روشن'   },
    { id: 'dark',   label: 'تیره'   },
    { id: 'blue',   label: 'آبی'    },
    { id: 'green',  label: 'سبز'    },
    { id: 'pink',   label: 'صورتی'  },
    { id: 'purple', label: 'بنفش'   },
];
