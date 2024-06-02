import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/cn';
import { config } from '@/config';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: config.settings.title,
  description: config.settings.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-50')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
