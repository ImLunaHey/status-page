import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(typeof window !== 'undefined' ? localStorage.theme : 'dark');

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return [theme, setTheme] as const;
};
