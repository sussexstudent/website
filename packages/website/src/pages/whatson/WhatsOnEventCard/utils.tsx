import React from 'react';
import { EventCardFragment } from '../../../generated/graphql';

export function renderEventLocation(
  event: EventCardFragment,
): null | React.ReactElement {
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
