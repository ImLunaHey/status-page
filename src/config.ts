import pkg from '@/../package.json';

type Settings = {
  title: string;
  description: string;
  daysInHistogram: number;
  collectResponseTimes: boolean;
  userAgent: string;
};

export type Monitor = {
  id: string;
  name: string;
  description?: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';
  expectStatus: number;
  followRedirect?: boolean;
  linkable?: boolean;
};

type Locale = {
  allmonitorsOperational: string;
  notAllmonitorsOperational: string;
  monitorLabelOperational: string;
  monitorLabelNotOperational: string;
  monitorLabelNoData: string;
  dayInHistogramNoData: string;
  dayInHistogramOperational: string;
  dayInHistogramNotOperational: string;
};

type Config = {
  settings: Settings;
  monitors: Monitor[];
  locales: {
    en: Locale;
  };
};

export const config = {
  settings: {
    /**
     * Title of the status page
     */
    title: 'Status Page',
    /**
     * Description of the status page
     */
    description: 'A simple status page for your services',
    /**
     * Number of days to show in the histogram
     */
    daysInHistogram: 90,
    /**
     * Collect response times from CRON locations
     */
    collectResponseTimes: true,
    /**
     * User agent to use when fetching monitor URLs
     */
    userAgent: `${pkg.name}@${pkg.version}`,
  },
  monitors: [
    {
      id: 'workers-cloudflare-com',
      name: 'workers.cloudflare.com',
      description: 'You write code. They handle the rest.',
      url: 'https://workers.cloudflare.com/',
      method: 'GET',
      expectStatus: 200,
      followRedirect: false,
      linkable: false,
    },
    {
      id: 'www-cloudflare-com',
      name: 'www.cloudflare.com',
      description: 'Built for anything connected to the Internet.',
      url: 'https://www.cloudflare.com',
      method: 'GET',
      expectStatus: 200,
      linkable: true,
    },
    {
      id: 'blog-cloudflare-com',
      name: 'The Cloudflare Blog',
      url: 'https://blog.cloudflare.com/',
      method: 'GET',
      expectStatus: 200,
    },
  ] satisfies Monitor[],
  locales: {
    en: {
      allmonitorsOperational: 'All Systems Operational',
      notAllmonitorsOperational: 'Not All Systems Operational',
      monitorLabelOperational: 'Operational',
      monitorLabelNotOperational: 'Not Operational',
      monitorLabelNoData: 'No data',
      dayInHistogramNoData: 'No data',
      dayInHistogramOperational: 'All good',
      dayInHistogramNotOperational: ' incident(s)', // xx incident(s) recorded
    },
  },
} satisfies Config as Config;
