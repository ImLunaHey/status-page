import { cn } from '@/cn';

type PillProps = {
  children: React.ReactNode;
  className?: string;
};

export const Pill = ({ children, className }: PillProps) => (
  <div className={cn('px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full', className)}>{children}</div>
);
