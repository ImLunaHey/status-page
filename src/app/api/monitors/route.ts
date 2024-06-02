import { getKVMonitors } from '@/common/get-kv-monitors';
import { locations } from '@/locations';

export type KVMonitor = {
  firstCheck: string;
  lastCheck: {
    operational: boolean;
    status: number;
    statusText: string;
  };
  checks: {
    [key: string]: {
      fails: number;
      res: {
        [K in keyof typeof locations]: {
          n: number;
          ms: number;
          a: number;
        };
      };
    };
  };
};

export const runtime = 'edge';

export async function GET() {
  const kvMonitors = await getKVMonitors();
  return new Response(JSON.stringify(kvMonitors), {
    headers: {
      'content-type': 'application/json',
    },
  });
}
