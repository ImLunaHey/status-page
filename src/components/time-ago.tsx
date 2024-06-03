const DIVISIONS = [
  { amount: 60, name: 'seconds' },
  { amount: 60, name: 'minutes' },
  { amount: 24, name: 'hours' },
  { amount: 7, name: 'days' },
  { amount: 4.34524, name: 'weeks' },
  { amount: 12, name: 'months' },
  { amount: Number.POSITIVE_INFINITY, name: 'years' },
] as const;

const formatTimeAgo = (date: number) => {
  const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: 'auto',
  });
  let duration = (date - Date.now()) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
};

export const TimeAgo = ({ date }: Readonly<{ date: number }>) => {
  return <time dateTime={new Date(date).toISOString()}>{formatTimeAgo(date)}</time>;
};
