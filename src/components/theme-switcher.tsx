'use client';
import { SunIcon } from './icons/sun';
import { MoonIcon } from './icons/moon';
import { cn } from '@/cn';
import { useTheme } from '@/hooks/use-theme';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useTheme();
  const buttonColor = theme === 'dark' ? 'bg-gray-700 focus:ring-gray-700' : 'bg-gray-200 focus:ring-gray-200';

  return (
    <button
      className={cn(`rounded-full h-7 w-7 mr-4 focus:outline-none focus:ring-2 focus:ring-opacity-50`, buttonColor)}
      onClick={() => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
      }}
    >
      {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
