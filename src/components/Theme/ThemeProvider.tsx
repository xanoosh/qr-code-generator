'use client'; // Dla Vite niepotrzebne, ale kompatybilne
import { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    const activeTheme = theme === 'system' ? systemTheme : theme;

    root.classList.add(activeTheme);
  }, [theme]);

  return <>{children}</>;
}
