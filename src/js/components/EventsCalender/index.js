import React from 'react';
import formatDate from 'date-fns/format';
import isBefore from 'date-fns/is_before';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import addHours from 'date-fns/add_hours';

const EVENT_PART = {
  CONTAINED: 'SINGLE',
  SPAN_START: 'SPAN_START',
  SPAN_CONTINUTED: 'SPAN_CONTINUTED',
  SPAN_END: 'SPAN_END',
};


function generateEventParts(events) {
  // for all events
  // if single day, add single day event SINGLE
  // if multi day
    // add start MULTI_START
    // each days continuation MULTI_CONT
    // add end MULTI_END
  const parts = [];

  events.forEach((event, index) => {
    // if event.startDate is same day as endDate
    // TODO: Ease nightlife events, keep contained when event only spans to < 6:30am
    if (!event.isOverMultipleDays) {
      parts.push({ type: EVENT_PART.CONTAINED, eventId: index, date: event.startDate });
      return;
    }

    parts.push({ type: EVENT_PART.SPAN_START, eventId: index, date: event.startDate });
    // get days in between
      // for each add
      // parts.push({ type: EVENT_PART.SPAN_CONTINUTED, eventId: event.id, date: continued });

    parts.push({ type: EVENT_PART.SPAN_END, eventId: index, date: event.endDate });
  });

  return parts;
}


function EventsCalender({ events }) {
  // let previousDay = null;
  const eventParts = generateEventParts(events);
  // chunk by day
  const nearDate = addHours(new Date(), 10);
  return (
    <div className="EventsCalender">
      {eventParts.map((part) => {
        /* eslint-disable jsx-a11y/anchor-has-content */
        const event = events[part.eventId];
        return (
          <div className="EventsCalender__item">
            <a className="u-faux-link" href={event.link} />
            <h2>{event.title}{part.type === EVENT_PART.SPAN_START ? '[starts]' : ''}{part.type === EVENT_PART.SPAN_END ? '[ends]' : ''}</h2>
            <div>
              {formatDate(event.startDate, 'dddd Mo MMMM [at] h:ssa')}
              {formatDate(event.endDate, 'dddd Mo MMMM [at] h:ssa')}
              {isBefore(event.startDate, nearDate) ? (
                <span> - Starts in {distanceInWordsToNow(event.startDate)}</span>
              ) : null}</div>
            <div className="">{event.description}</div>
          </div>
        );
        /* eslint-enable jsx-a11y/anchor-has-content */
      })};
    </div>
  );
}

export default EventsCalender;
