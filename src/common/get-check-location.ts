import { locations } from '@/locations';

export const getCheckLocation = async () => {
  const res = await fetch('https://cloudflare-dns.com/dns-query', {
    method: 'OPTIONS',
  });
  return res.headers.get('cf-ray')?.split('-')[1] as keyof typeof locations;
};
