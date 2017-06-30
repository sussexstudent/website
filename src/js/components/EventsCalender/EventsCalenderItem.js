import React from 'react';
import has from 'lodash/has';
import formatDate from 'date-fns/format';
import Image from '../Image/index';
// import PropTypes from 'prop-types';

function renderEventLocation(event) {
  if (!event.venue) {
    return <span>{event.locationDisplay}</span>;
  }

  if (event.venue.websiteLink) {
    return (
      <a href={event.venue.websiteLink}>
        {event.locationDisplay || event.venue.name}
      </a>
    );
  }

  return <span>{event.locationDisplay || event.venue.name}</span>;
}

function EventsCalenderItem({ part }) {
  const event = part.event;
  /* eslint-disable jsx-a11y/anchor-has-content */
  return (
    <div className="EventsCalender__item">
      <a className="u-faux-link" href={event.link} />
      {has(part, 'event.featuredImage.resource')
        ? <div className="EventsCalender__item-image u-responsive-ratio u-responsive-ratio--wide">
            <Image src={event.featuredImage.resource} />
          </div>
        : null}
      <div className="EventsCalender__item-container">
        {event.kicker
          ? <div className="EventsCalender__item-kicker">{event.kicker}</div>
          : null}
        <h2 className="EventsCalender__item-title">
          {event.title}
        </h2>
        <div className="EventsCalender__item-description">
          {event.description}
        </div>
        <div className="EventsCalender__item-meta">
          {formatDate(event.startDate, 'h:ssa')}
          <span> - </span>
          {formatDate(event.endDate, 'h:ssa')}
          <span> / </span>
          {renderEventLocation(event)}
        </div>
      </div>
    </div>
  );
  /* eslint-enable jsx-a11y/anchor-has-content */
}

// TODO: Add relative date if near or started and not ended
// const nearDate = addHours(new Date(), 10);
// {isBefore(event.startDate, nearDate)
//   ? <span>
//               {' '}- Starts in {distanceInWordsToNow(event.startDate)}
//             </span>
//   : null}

EventsCalenderItem.PropTypes = {};

export default EventsCalenderItem;
