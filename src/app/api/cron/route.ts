import { getKVMonitors } from '@/common/get-kv-monitors';
import { getCheckLocation } from '@/common/get-check-location';
import { getCurrentDate } from '@/common/get-current-date';
import { config } from '@/config';
import { setKVMonitors } from '@/common/set-kv-monitors';

export const runtime = 'edge';

export async function GET() {
  // Get Worker PoP and save it to monitorsStateMetadata
  const checkLocation = await getCheckLocation();
  const checkDay = getCurrentDate();

  // Get monitors state from KV
  let monitorsState = await getKVMonitors();

  // Create empty state objects if not exists in KV storage yet
  if (!monitorsState) {
    monitorsState = {
      lastUpdate: {},
      monitors: {},
    };
  }

  // Reset default all monitors state to true
  monitorsState.lastUpdate.allOperational = true;

  for (const monitor of config.monitors) {
    // Create default monitor state if does not exist yet
    if (typeof monitorsState.monitors[monitor.id] === 'undefined') {
      monitorsState.monitors[monitor.id] = {
        firstCheck: checkDay,
        lastCheck: {
          operational: false,
          status: 0,
          statusText: '',
        },
        checks: {},
      };
    }

    console.info(`Checking ${monitor.name} ...`);

    // Perform a check and measure time
    const requestStartTime = Date.now();
    const checkResponse = await fetch(monitor.url, {
      method: monitor.method || 'GET',
      redirect: monitor.followRedirect ? 'follow' : 'manual',
      headers: {
        'User-Agent': config.settings.userAgent || 'cf-worker-status-page',
      },
    });
    const requestTime = Math.round(Date.now() - requestStartTime);

    // Determine whether operational and status changed
    const monitorOperational = checkResponse.status === (monitor.expectStatus || 200);
    const monitorStatusChanged = monitorsState.monitors[monitor.id].lastCheck.operational !== monitorOperational;

    // Save monitor's last check response status
    monitorsState.monitors[monitor.id].lastCheck = {
      status: checkResponse.status,
      statusText: checkResponse.statusText,
      operational: monitorOperational,
    };

    // make sure checkDay exists in checks in cases when needed
    if (
      (config.settings.collectResponseTimes || !monitorOperational) &&
      !monitorsState.monitors[monitor.id].checks.hasOwnProperty(checkDay)
    ) {
      monitorsState.monitors[monitor.id].checks[checkDay] = {
        fails: 0,
        res: {},
      };
    }

    if (config.settings.collectResponseTimes && monitorOperational) {
      // make sure location exists in current checkDay
      if (!monitorsState.monitors[monitor.id].checks[checkDay].res.hasOwnProperty(checkLocation)) {
        monitorsState.monitors[monitor.id].checks[checkDay].res[checkLocation] = {
          n: 0,
          ms: 0,
          a: 0,
        };
      }

      // increment number of checks and sum of ms
      const no = ++monitorsState.monitors[monitor.id].checks[checkDay].res[checkLocation].n;
      const ms = (monitorsState.monitors[monitor.id].checks[checkDay].res[checkLocation].ms += requestTime);

      // save new average ms
      monitorsState.monitors[monitor.id].checks[checkDay].res[checkLocation].a = Math.round(ms / no);
    } else if (!monitorOperational) {
      // Save allOperational to false
      monitorsState.lastUpdate.allOperational = false;

      // Increment failed checks on status change or first fail of the day (maybe call it .incidents instead?)
      if (monitorStatusChanged || monitorsState.monitors[monitor.id].checks[checkDay].fails == 0) {
        monitorsState.monitors[monitor.id].checks[checkDay].fails++;
      }
    }
  }

  // Save last update information
  monitorsState.lastUpdate.time = Date.now();
  monitorsState.lastUpdate.loc = checkLocation;

  // Save monitorsState to KV storage
  await setKVMonitors(monitorsState);

  return new Response('OK');
}
