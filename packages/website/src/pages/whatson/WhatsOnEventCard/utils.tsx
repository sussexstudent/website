import React from 'react';
import { Event } from '@ussu/common/src/types/events';

export function renderEventLocation(event: Event) {
  if (!event.venue) {
    if (event.locationDisplay === '') {
      return null;
    }

    return <span> / {event.locationDisplay}</span>;
  }

  if (event.venue.websiteLink) {
    return (
      <span>
        {' '}
        /{' '}
        <a href={event.venue.websiteLink}>
          {event.locationDisplay || event.venue.name}
        </a>
      </span>
    );
  }

  return <span> / {event.locationDisplay || event.venue.name}</span>;
}
