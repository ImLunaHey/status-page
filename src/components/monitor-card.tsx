import { InfoIcon } from './icons/info';
import { config } from '@/config';
import { MonitorStatusLabel } from './monitor-status-label';
import { MonitorHistogram } from './monitor-histogram';
import { Card } from './card';
import { KVMonitor } from '@/app/api/monitors/route';
import { TooltipContent } from './tooltip-content';

type MonitorCardProps = {
  key: number;
  monitor: {
    id: string;
    name: string;
    description?: string;
    url: string;
    linkable?: boolean;
  };
  data: KVMonitor;
};

export const MonitorCard = ({ monitor, data }: MonitorCardProps) => {
  return (
    <Card>
      <div className="flex flex-row justify-between items-center mb-2">
        <div className="flex flex-row items-center align-center">
          {monitor.description && (
            <div className="group">
              <InfoIcon />
              <TooltipContent className="text-center transform w-72 text-sm">{monitor.description}</TooltipContent>
            </div>
          )}
          {monitor.linkable === true || monitor.linkable === undefined ? (
            <a href={monitor.url} target="_blank">
              <div className="text-xl">{monitor.name}</div>
            </a>
          ) : (
            <span>
              <div className="text-xl">{monitor.name}</div>
            </span>
          )}
        </div>
        <MonitorStatusLabel kvMonitor={data} />
      </div>

      <MonitorHistogram monitorId={monitor.id} kvMonitor={data} />

      <div className="flex flex-row justify-between items-center text-gray-400 text-sm">
        <div>{config.settings.daysInHistogram} days ago</div>
        <div>Today</div>
      </div>
    </Card>
  );
};
