import React from 'react';
import isWithinInterval from 'date-fns/isWithinInterval';
import formatDistance from 'date-fns/formatDistance';
import subMinutes from 'date-fns/subMinutes';

export default function EventRelativeTime({ event }) {
  return (
    <div className="EventsCalender__item-meta">
      {isWithinInterval(
        new Date(),
        subMinutes(new Date(event.startTime), 90),
        new Date(event.startTime)
      )
        ? `Starts in ${formatDistance(new Date(event.startTime), new Date())}`
        : ''}
      {isWithinInterval(
        new Date(),
        new Date(event.startTime),
        new Date(event.endTime)
      )
        ? 'On now'
        : ''}
    </div>
  );
}
