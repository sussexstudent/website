import { sortBy, orderBy, toPairs, padStart, groupBy } from 'lodash';
import isAfter from 'date-fns/isAfter';
import getYear from 'date-fns/getYear';
import setHours from 'date-fns/setHours';
import addDays from 'date-fns/addDays';
import subHours from 'date-fns/subHours';
import getMonth from 'date-fns/getMonth';
import getDayOfYear from 'date-fns/getDayOfYear';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import formatDate from 'date-fns/format';

import { Brand, Event, EventPart, EventPartType } from '../../types/events';

/* eslint-disable no-nested-ternary */

const now = setHours(new Date(), 0);
const rightNow = new Date();
const weekFromNow = setHours(addDays(new Date(), 7), 0);

export function splitEventsInToParts(events: Event[], removePast = true) {
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
    //
    // parts.push({
    //   type: EVENT_PART.SPAN_END,
    //   eventId: index,
    //   date: event.endDate,
    //   event,
    // });
  });

  return parts;
}

function poorMonthSort(key: string) {
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

    /*
    if (isBefore(event.date, weekFromNow)) {
      return 0;
    }
    */

    return `MONTH:${getYear(event.date)}-${getMonth(event.date)}`;
  });

  const pairs = toPairs(partsGrouped);

  const sorted = orderBy(pairs, (pair) => poorMonthSort(pair[0]), 'asc');

  const asList = sorted
    .filter(([key]) => key !== 'PAST')
    .map(([key, value]) => ({
      sectionTitle:
        key === '0' ? 'This week' : formatDate(value[0].date, 'MMMM'),
      parts: chunkEventsToRows(value),
    }));

  return asList;
}

export function getSmartDate(part: EventPart) {
  if (isSameDay(new Date(), part.date)) {
    return 'Today';
  }

  if (isSameDay(part.date, addDays(new Date(), 1))) {
    return 'Tomorrow';
  }

  if (isBefore(part.date, weekFromNow)) {
    // if (
    //   part.type === EVENT_PART.SPAN_END &&
    //   isBefore(part.event.startDate, now)
    // ) {
    //   return `until ${formatDate(part.date, 'dddd')}`;
    // }
    //
    // if (part.type === EVENT_PART.SPAN_START) {
    //   return `starts ${formatDate(part.date, 'dddd')}`;
    // }

    return formatDate(part.date, 'dddd');
  }

  return formatDate(part.date, 'ddd Do');
}

export function generateStylesForBrand(brand: Brand) {
  if (!brand.accent) {
    return {};
  }

  return {
    backgroundColor: brand.accent,
  };
}
