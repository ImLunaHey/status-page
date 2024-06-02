import { getRequestContext } from '@cloudflare/next-on-pages';
import { KVMonitors } from './get-kv-monitors';

export const setKVMonitors = async (kvMonitors: KVMonitors) => {
  return await getRequestContext().env.STATUS_PAGE.put('monitors', JSON.stringify(kvMonitors));
};
