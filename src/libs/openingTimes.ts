import {
  getDay,
  addDays,
  setMinutes,
  setHours,
  isWithinInterval,
  isBefore,
} from 'date-fns';
import { flatten, flatMap, each } from 'lodash';

const daysMap = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export interface OpeningTimeInterval {
  start: Date;
  end: Date;
  day: number;
}

function generateDateForDay(day: number, time: string) {
  const [hours, minutes] = time.split(':');

  const now = new Date();
  const daysFromNow = (day - getDay(now) + 7) % 7;

  return setMinutes(
    setHours(addDays(now, daysFromNow), parseInt(hours, 10)),
    parseInt(minutes, 10),
  );
}

function getDaysFromDays(days: string): number[] {
  return flatten(
    days.split(',').map((daysRange) => {
      const range = daysRange.split('-');

      if (range.length >= 2) {
        const fill = [];
        const startDay = daysMap.indexOf(range[0]);
        const endDay = daysMap.indexOf(range[1]);

        for (let i = startDay; i % 7 !== endDay; i = i + 1) {
          fill.push(i);
        }

        fill.push(endDay);

        return fill;
      }

      return [daysMap.indexOf(range[0])];
    }),
  );
}

const generateIntervalForDay = (startTime: string, endTime: string) => (
  day: number,
) => {
  const start = generateDateForDay(day, startTime);
  let end = generateDateForDay(day, endTime);

  if (isBefore(end, start)) {
    end = addDays(end, 1);
  }

  return { day, start, end };
};

function parseOpeningTime(openingTime: string): OpeningTimeInterval[] {
  const [daysRange, time] = openingTime.split(' ');

  const days = getDaysFromDays(daysRange);

  const [startTime, endTime] = time.split('-');

  return days.map(generateIntervalForDay(startTime, endTime));
}

export function parseOpeningTimesToIntervals(
  openingTimes: string[],
): OpeningTimeInterval[] {
  return flatMap(openingTimes, parseOpeningTime);
}

export function isOpenNow(intervals: OpeningTimeInterval[]) {
  const now = new Date();
  let activeInterval: null | Interval = null;

  each(intervals, (interval) => {
    if (isWithinInterval(now, interval)) {
      activeInterval = interval;

      return false;
    }
  });

  return activeInterval;
}
