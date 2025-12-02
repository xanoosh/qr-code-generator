import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeStoreType } from '@/types';

export const useThemeStore = create<ThemeStoreType>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
