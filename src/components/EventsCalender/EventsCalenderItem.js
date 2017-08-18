import React from 'react';
import has from 'lodash/has';
import formatDate from 'date-fns/format';
import Image from '../Image';
import FauxLink from '../FauxLink';
import FauxRouterLink from '../FauxRouterLink';
// import PropTypes from 'prop-types';

function renderEventLocation(event) {
  if (!event.venue) {
    return (
      <span>
        {event.locationDisplay}
      </span>
    );
  }

  if (event.venue.websiteLink) {
    return (
      <a href={event.venue.websiteLink}>
        {event.locationDisplay || event.venue.name}
      </a>
    );
  }

  return (
    <span>
      {event.locationDisplay || event.venue.name}
    </span>
  );
}

function getTreat(event) {
  if (event.cost === 'FREE') {
    return 'Free';
  }

  if (event.ticketLevel === 'LA') {
    return 'Limited availability';
  }

  return null;
}

function EventsCalenderItem({ part }) {
  const event = part.event;
  const treat = getTreat(event);
  return (
    <div className="EventsCalender__item">
      {event.url !== ''
        ? <FauxLink href={event.url} />
        : <FauxRouterLink href={`/${event.slug}-${event.id}`} />}
      {has(part, 'event.featuredImage.resource')
        ? <div className="EventsCalender__item-image u-responsive-ratio u-responsive-ratio--wide">
            <Image src={event.featuredImage.resource} lazy />
            {treat !== null
              ? <div className="EventsCalender__item-image-treat">
                  {treat}
                </div>
              : null}
          </div>
        : null}
      {event.bundle !== null
        ? <div className="EventsCalender__item-bundle">
            {event.bundle.name}
          </div>
        : null}
      <div className="EventsCalender__item-container">
        {event.kicker
          ? <div className="EventsCalender__item-kicker">
              {event.kicker}
            </div>
          : null}
        <h2 className="EventsCalender__item-title">
          {event.title}
        </h2>
        <div className="EventsCalender__item-description">
          {event.shortDescription}
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
