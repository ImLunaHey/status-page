import { locations } from '@/locations';

type MonitorDayAverageProps = {
  location: keyof typeof locations;
  avg: number;
};

export const MonitorDayAverage = ({ location, avg }: MonitorDayAverageProps) => {
  return (
    <>
      <br />
      <small>
        {locations[location] || location}: {avg}ms
      </small>
    </>
  );
};
