import React from 'react';
import { groupBy, orderBy, padStart, sortBy, toPairs } from 'lodash';
import { isAfter } from 'date-fns';
import getYear from 'date-fns/getYear';
import setHours from 'date-fns/setHours';
import addDays from 'date-fns/addDays';
import subHours from 'date-fns/subHours';
import getMonth from 'date-fns/getMonth';
import getDayOfYear from 'date-fns/getDayOfYear';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import formatDate from 'date-fns/format';

import { Brand, EventPart, EventPartType } from '@ussu/common/src/types/events';
import { addWeeks, getDate, startOfWeek } from 'date-fns';
import {
  EventCardFragment,
  GetAllEventsWithFilterQuery,
} from '../../generated/graphql';

const now = setHours(new Date(), 0);
const rightNow = new Date();
const startOfNextWeek = addWeeks(
  startOfWeek(new Date(), { weekStartsOn: 1 }),
  1,
);

export type WithHydratedDates<TEvent> = TEvent & {
  startDate: Date;
  endDate: Date;
};

export function hydrateWithDates(
  events: GetAllEventsWithFilterQuery['allEvents']['edges'],
): WithHydratedDates<EventCardFragment>[] {
  return events.map(({ node }) => ({
    ...node,
    startDate: new Date(node.startTime),
    endDate: new Date(node.endTime),
  }));
}
export function splitEventsInToParts(
  events: WithHydratedDates<EventCardFragment>[],
  removePast = true,
) {
  // for all events
  // if single day, add single day event SINGLE
  // if multi day
  // add start MULTI_START
  // each days continuation MULTI_CONT
  // add end MULTI_END
  const parts: EventPart[] = [];

  events.forEach((event, index) => {
    // if event.startDate is same day as endDate
    // TODO: Ease nightlife events, keep contained when event only spans to < 6:30am
    if (
      isSameDay(event.startDate, event.endDate) ||
      isSameDay(event.startDate, subHours(event.endDate, 6))
    ) {
      if (isBefore(event.endDate, rightNow) && removePast) {
        return;
      }

      parts.push({
        event,
        type: EventPartType.Contained,
        eventId: index,
        date: event.startDate,
      });

      return;
    }

    if (!isAfter(event.startDate, rightNow) && removePast) {
      parts.push({
        event,
        type: EventPartType.SpanStart,
        eventId: index,
        date: new Date(),
      });
    } else {
      parts.push({
        event,
        type: EventPartType.SpanStart,
        eventId: index,
        date: event.startDate,
      });
    }
  });

  return parts;
}

function poorMonthSort(key: string): number {
  if (key === '0') {
    return 0;
  }

  if (key === 'PAST') {
    return -1;
  }

  if (key.startsWith('MONTH')) {
    const numbers = key.slice(6).split('-');
    const z = parseInt(numbers[0] + padStart(numbers[1], 2, '0'), 10);
    return z;
  }

  return 2;
}

function chunkEventsToRows(events: EventPart[]) {
  const eventNest: EventPart[][] = [];
  const keysMap: { [key: string]: number } = {};

  events.forEach((event) => {
    const dayIndex = getDayOfYear(event.date);
    if (Object.hasOwnProperty.call(keysMap, dayIndex)) {
      eventNest[keysMap[dayIndex]].push(event);
    } else {
      keysMap[dayIndex] = eventNest.push([event]) - 1;
    }
  });

  return eventNest;
}

export function organisePartsForUI(eventParts: EventPart[], removePast = true) {
  const orderedParts = sortBy(eventParts, [(part: EventPart) => part.date]);

  // next up 7:

  const partsGrouped = groupBy(orderedParts, (event) => {
    if (isBefore(event.date, now) && removePast) {
      return 'PAST';
    }

    if (isBefore(event.date, startOfNextWeek)) {
      return 0;
    }

    return `MONTH:${getYear(event.date)}-${getMonth(event.date)}`;
  });

  const pairs = toPairs(partsGrouped);

  const sorted = orderBy(pairs, (pair) => poorMonthSort(pair[0]), 'asc');

  const asList = sorted
    .filter(([key]) => key !== 'PAST')
    .map(([key, value]) => ({
      title: key === '0' ? 'This week' : formatDate(value[0].date, 'MMMM'),
      data: chunkEventsToRows(value),
    }));

  return asList;
}

export function getOrdinal(day: number): 'st' | 'nd' | 'th' | 'rd' {
  const rem100 = day % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
    }
  }
  return 'th';
}

export function getSmartDate(part: EventPart): string | React.ReactElement {
  if (isSameDay(new Date(), part.date)) {
    return 'Today';
  }

  if (isSameDay(part.date, addDays(new Date(), 1))) {
    return 'Tomorrow';
  }

  if (isBefore(part.date, startOfNextWeek)) {
    return `This ${formatDate(part.date, 'EEEE')}`;
  }

  return (
    <span>
      {formatDate(part.date, 'EEE')} {getDate(part.date)}
      <sup>{getOrdinal(getDate(part.date))}</sup>{' '}
      {formatDate(part.date, 'LLL yyyy')}
    </span>
  );
}

export function getSmartDatePlain(part: EventPart): string {
  if (isSameDay(new Date(), part.date)) {
    return 'Today';
  }

  if (isSameDay(part.date, addDays(new Date(), 1))) {
    return 'Tomorrow';
  }

  if (isBefore(part.date, startOfNextWeek)) {
    return `This ${formatDate(part.date, 'EEEE')}`;
  }

  return `${formatDate(part.date, 'EEE')} ${getDate(part.date)}${getOrdinal(
    getDate(part.date),
  )} ${formatDate(part.date, 'LLL yyyy')}`;
}

export function generateStylesForBrand(brand: Brand): object {
  if (!brand.accent) {
    return {};
  }

  return {
    backgroundColor: brand.accent,
  };
}
