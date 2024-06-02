'use client';
import { Link } from '@/components/link';
import { MonitorCard } from '@/components/monitor-card';
import { MonitorFilter } from '@/components/monitor-filter';
import { MonitorStatusHeader } from '@/components/monitor-status-header';
import { config } from '@/config';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';
import { KVMonitors } from '@/common/get-kv-monitors';

const ThemeSwitcher = dynamic(() => import('@/components/theme-switcher'), { ssr: false });

export default function Home() {
  const [filter, setFilter] = useState('');
  const monitors = config.monitors.filter((monitor) => {
    return monitor.name.toLowerCase().includes(filter);
  });
  const { data, isLoading } = useQuery({
    queryKey: ['monitors', filter],
    queryFn: async () => {
      const response = await fetch('/api/monitors');
      return response.json() as Promise<KVMonitors>;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  if (!data) {
    return <div>Failed to load data</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-row justify-between items-center p-4">
          <div className="flex flex-row items-center">
            <Image className="h-8 w-auto" src="/logo-192x192.png" alt="logo" width={192} height={192} />
            <h1 className="ml-4 text-3xl">{config.settings.title}</h1>
          </div>
          <div className="flex flex-row items-center">
            <ThemeSwitcher />
            <MonitorFilter
              callback={(value) => {
                setFilter(value);
              }}
            />
          </div>
        </div>
        <MonitorStatusHeader lastUpdate={data?.lastUpdate} />
        {monitors.map((monitor, key) => {
          return <MonitorCard key={key} monitor={monitor} data={data?.monitors[monitor.id]} />;
        })}
        <div className="flex flex-row justify-between mt-4 text-sm">
          <div>
            Powered by{' '}
            <Link
              href="https://workers.cloudflare.com/"
              target="_blank"
              className="text-blue-500 dark:text-blue-300 hover:underline"
            >
              Cloudflare Workers{' '}
            </Link>
            &{' '}
            <Link href="https://nextjs.org/" target="_blank" className="text-blue-500 dark:text-blue-300 hover:underline">
              Nextjs{' '}
            </Link>
          </div>
          <div>
            <Link
              href="https://github.com/eidam/cf-workers-status-page"
              target="_blank"
              className="text-blue-500 dark:text-blue-300 hover:underline"
            >
              Get Your Status Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
