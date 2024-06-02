import { config } from '@/config';
import { MonitorDayAverage } from './monitor-day-average';
import { Bar } from './bar';
import { KVMonitor } from '@/app/api/monitors/route';
import { keysFromObject } from '@/common/keys-from-object';

type MonitorHistogramProps = {
  monitorId: string;
  kvMonitor: KVMonitor;
};

export const MonitorHistogram = ({ monitorId, kvMonitor }: MonitorHistogramProps) => {
  // create date and set date - daysInHistogram for the first day of the histogram
  let date = new Date();
  date.setDate(date.getDate() - config.settings.daysInHistogram);

  return (
    <div key={`${monitorId}-histogram`} className="flex flex-row items-center h-6 w-full mx-auto">
      {Array.from(Array(config.settings.daysInHistogram).keys()).map((key) => {
        date.setDate(date.getDate() + 1);
        const dayInHistogram = date.toISOString().split('T')[0];

        let state: 'pass' | 'fail' | undefined;
        let dayInHistogramLabel: string = config.locales.en.dayInHistogramNoData;

        // filter all dates before first check, then check the rest
        if (kvMonitor && kvMonitor.firstCheck <= dayInHistogram) {
          if (dayInHistogram in kvMonitor.checks && kvMonitor.checks[dayInHistogram].fails > 0) {
            state = 'fail';
            dayInHistogramLabel = `${kvMonitor.checks[dayInHistogram].fails} ${config.locales.en.dayInHistogramNotOperational}`;
          } else {
            state = 'pass';
            dayInHistogramLabel = config.locales.en.dayInHistogramOperational;
          }
        }

        return (
          <div key={key} className="hitbox tooltip">
            <Bar state={state} />
            <div className="content text-center py-1 px-2 mt-2 left-1/2 -ml-20 w-40 text-xs">
              {dayInHistogram}
              <br />
              <span className="font-semibold text-sm">{dayInHistogramLabel}</span>
              {kvMonitor &&
                dayInHistogram in kvMonitor.checks &&
                keysFromObject(kvMonitor.checks[dayInHistogram].res).map((key) => {
                  return <MonitorDayAverage key={key} location={key} avg={kvMonitor.checks[dayInHistogram].res[key].a} />;
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
