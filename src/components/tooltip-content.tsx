import { cn } from '@/cn';

type TooltipContentProps = {
  children: React.ReactNode;
  className?: string;
};

export const TooltipContent = ({ children, className }: TooltipContentProps) => (
  <div
    className={cn(
      'content',
      'invisible absolute z-50 inline-block',
      'rounded-lg py-1 px-2 bg-gray-100 dark:bg-gray-800 shadow',
      'opacity-0 transition-all duration-200 scale-50',
      'group-hover:visible group-hover:opacity-100 group-hover:scale-100',
      className,
    )}
  >
    {children}
  </div>
);
