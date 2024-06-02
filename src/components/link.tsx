import { cn } from '@/cn';
import NextLink from 'next/link';
import { ComponentProps } from 'react';

export const Link = ({ className, href, children }: ComponentProps<typeof NextLink>) => (
  <NextLink className={cn('text-blue-500 dark:text-blue-400', className)} href={href}>
    {children}
  </NextLink>
);
