'use client';
import { useRef, useState } from 'react';
import { SearchIcon } from './icons/search';
import { useKeyPress } from '@/hooks/use-key-press';

type MonitorFilterProps = {
  callback: (value: string) => void;
};

export const MonitorFilter = ({ callback }: MonitorFilterProps) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on '/' key press
  useKeyPress('/', () => {
    inputRef.current?.focus();
  });

  // Handle input change
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '/') return;
    setInput(event.target.value);
    callback(event.target.value);
  };

  // Handle 'Escape' key press
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') event.currentTarget.blur();
  };

  return (
    <div className="col-span-6 sm:col-span-3 relative">
      <input
        ref={inputRef}
        className="block w-full py-2 px-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        type="text"
        value={input}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Tap '/' to search"
        tabIndex={0}
      />
      <div className="absolute inset-y-1 right-1 flex z-1 items-center">
        <SearchIcon />
      </div>
    </div>
  );
};
