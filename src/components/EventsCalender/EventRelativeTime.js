import React from 'react';
import isWithinRange from 'date-fns/is_within_range';
import distanceInWords from 'date-fns/distance_in_words_to_now';
import subMinutes from 'date-fns/sub_minutes';

export default function EventRelativeTime() {
  return (
    <div className="EventsCalender__item-meta">
      {isWithinRange(
        new Date(),
        subMinutes(new Date(event.startTime), 90),
        new Date(event.startTime)
      ) ? (
        `Starts in ${distanceInWords(new Date(event.startTime))}`
      ) : (
        ''
      )}
      {isWithinRange(
        new Date(),
        new Date(event.startTime),
        new Date(event.endTime)
      ) ? (
        'On now'
      ) : (
        ''
      )}
    </div>
  );
}
