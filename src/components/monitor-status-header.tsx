'use client';
import { cn } from '@/cn';
import { config } from '@/config';
import { locations } from '@/locations';
import { Card } from './card';
import { KVMonitors } from '@/common/get-kv-monitors';

type MonitorStatusHeaderProps = {
  lastUpdate?: KVMonitors['lastUpdate'];
};

export const MonitorStatusHeader = ({ lastUpdate }: MonitorStatusHeaderProps) => {
  const state = lastUpdate?.allOperational ? 'pass' : 'fail';
  const text = lastUpdate?.allOperational
    ? config.locales.en.allmonitorsOperational
    : config.locales.en.notAllmonitorsOperational;

  return (
    <Card
      className={cn('font-semibold', [
        state === 'pass' &&
          'bg-green-200 text-green-700 dark:bg-green-700 dark:text-green-200 border-green-300 dark:border-green-600',
        state === 'fail' &&
          'bg-yellow-200 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-200 border-yellow-300 dark:border-yellow-600',
      ])}
    >
      <div className="flex flex-row justify-between items-center">
        <div>{text}</div>
        {lastUpdate?.time && (
          <div className="text-xs font-light">
            checked {Math.round((Date.now() - lastUpdate.time) / 1_000)} sec ago (from{' '}
            {(lastUpdate.loc && locations[lastUpdate.loc]) || lastUpdate.loc})
          </div>
        )}
      </div>
    </Card>
  );
};
