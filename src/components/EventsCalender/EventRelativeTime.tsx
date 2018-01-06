import React from 'react';
import isWithinInterval from 'date-fns/isWithinInterval';
import formatDistance from 'date-fns/formatDistance';
import subMinutes from 'date-fns/subMinutes';
import {Event} from "../../types/events";

interface IProps {
  event: Event;
}

export default function EventRelativeTime({ event }: IProps) {
  return (
    <div className="EventsCalender__item-meta">
      {isWithinInterval(new Date(), {
        start: subMinutes(new Date(event.startTime), 90),
        end: new Date(event.startTime),
      })
        ? `Starts in ${formatDistance(new Date(event.startTime), new Date())}`
        : ''}
      {isWithinInterval(new Date(), {
        start: new Date(event.startTime),
        end: new Date(event.endTime),
      })
        ? 'On now'
        : ''}
    </div>
  );
}
