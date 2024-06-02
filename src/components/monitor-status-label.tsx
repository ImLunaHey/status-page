import { cn } from '@/cn';
import { config } from '@/config';
import { Pill } from './pill';
import { KVMonitor } from '@/app/api/monitors/route';

type MonitorStatusLabelProps = {
  kvMonitor?: KVMonitor;
};

export const MonitorStatusLabel = ({ kvMonitor }: MonitorStatusLabelProps) => {
  // No data
  if (kvMonitor === undefined) {
    return <Pill className="leading-5 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200">No data</Pill>;
  }

  const state = kvMonitor.lastCheck.operational ? 'operational' : 'not-operational';
  const text = kvMonitor.lastCheck.operational
    ? config.locales.en.monitorLabelOperational
    : config.locales.en.monitorLabelNotOperational;

  return (
    <Pill
      className={cn('leading-5', [
        state === 'operational' && 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200',
        state === 'not-operational' && 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200',
      ])}
    >
      {text}
    </Pill>
  );
};
