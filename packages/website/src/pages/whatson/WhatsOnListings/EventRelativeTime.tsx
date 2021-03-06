import React from 'react';
import isWithinInterval from 'date-fns/isWithinInterval';
import formatDistance from 'date-fns/formatDistance';
import subMinutes from 'date-fns/subMinutes';
import { EventCardFragment } from 'packages/website/src/generated/graphql';

interface EventRelativeTimeProps {
  event: EventCardFragment;
}

export const EventRelativeTime: React.FC<EventRelativeTimeProps> = ({
  event,
}) => {
  const startsSoon = isWithinInterval(new Date(), {
    start: subMinutes(new Date(event.startTime), 90),
    end: new Date(event.startTime),
  });

  const onNow = isWithinInterval(new Date(), {
    start: new Date(event.startTime),
    end: new Date(event.endTime),
  });

  if (!startsSoon && !onNow) {
    return null;
  }

  return (
    <div className="EventsCalender__item-meta">
      {startsSoon
        ? `Starts in ${formatDistance(new Date(event.startTime), new Date())}`
        : ''}
      {onNow ? 'On now' : ''}
    </div>
  );
};
