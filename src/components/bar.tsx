import { cn } from '@/cn';

type BarProps = {
  className?: string;
  state?: 'pass' | 'fail';
};

export const Bar = ({ className, state }: BarProps) => (
  <div
    className={cn(
      'bg-gray-300 dark:bg-gray-600 h-full w-[85%] rounded-full pb-[1px]',
      state === 'pass' && 'bg-green-400 dark:bg-green-700',
      state === 'fail' && 'bg-red-400 dark:bg-red-700',
      className,
    )}
  />
);
