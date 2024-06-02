import { cn } from '@/cn';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => (
  <div
    className={cn(
      'p-4 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 shadow rounded-lg mb-2',
      className,
    )}
  >
    {children}
  </div>
);
