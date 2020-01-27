import React from 'react';
import { EventCardFragment } from '../../../generated/graphql';

export function renderEventLocation(
  event: EventCardFragment,
): null | React.ReactElement {
  if (!event.venue) {
    if (event.locationDisplay === '') {
      return null;
    }

    return <span>{event.locationDisplay}</span>;
  }

  return <span>{event.locationDisplay || event.venue.name}</span>;
}
