import { KVMonitor } from '@/app/api/monitors/route';
import { locations } from '@/locations';
import { getRequestContext } from '@cloudflare/next-on-pages';

export type KVMonitors = {
  monitors: {
    [key: string]: KVMonitor;
  };
  lastUpdate: {
    allOperational?: boolean;
    lastUpdate?: string;
    time?: number;
    loc?: keyof typeof locations;
  };
};

export const getKVMonitors = async () => {
  const kv = getRequestContext().env.STATUS_PAGE;
  return await kv.get<KVMonitors>('monitors', 'json');
};
