import React from 'react';
import cx from 'classnames';
import has from 'lodash/has';
import formatDate from 'date-fns/format';
import isWithinRange from 'date-fns/is_within_range';
import distanceInWords from 'date-fns/distance_in_words_to_now';
import subMinutes from 'date-fns/sub_minutes';
import Image from '../Image';
import FauxLink from '../FauxLink';
import FauxRouterLink from '../FauxRouterLink';
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

function getTreat(event) {
  if (event.cost === 'FREE') {
    return 'Free';
  }

  if (event.ticketLevel === 'LA') {
    return 'Limited availability';
  }

  return null;
}

function EventsCalenderItem({
  part,
  useAnchors,
  inline = false,
  showDay = false,
  relative = false,
}) {
  const event = part.event;
  const treat = getTreat(event);
  const FauxFalmerLink = useAnchors ? FauxLink : FauxRouterLink;

  return (
    <div
      className={cx('EventsCalender__item', {
        'EventsCalender--inline': inline,
      })}
    >
      {event.url !== undefined && event.url !== '' ? (
        <FauxLink href={event.url} />
      ) : (
        <FauxFalmerLink
          href={
            useAnchors ? (
              `/whats-on/${event.slug}-${event.eventId}`
            ) : (
              `/${event.slug}-${event.eventId}`
            )
          }
        />
      )}
      {has(part, 'event.featuredImage.resource') ? (
        <div className="EventsCalender__item-image u-responsive-ratio u-responsive-ratio--wide">
          <Image src={event.featuredImage.resource} lazy />
          {treat !== null ? (
            <div className="EventsCalender__item-image-treat">{treat}</div>
          ) : null}
        </div>
      ) : null}
      {event.bundle !== null && event.bundle !== undefined ? (
        <div className="EventsCalender__item-banner EventsCalender__item-banner--bundle">
          {event.bundle.name}
        </div>
      ) : null}
      {event.ticketType !== undefined &&
      event.ticketType !== 'NA' &&
      event.ticketLevel !== 'SO' ? (
        <div className="EventsCalender__item-banner EventsCalender__item-banner--tickets">
          Buy Tickets
        </div>
      ) : null}
      <div className="EventsCalender__item-container">
        {event.kicker ? (
          <div className="EventsCalender__item-kicker">{event.kicker}</div>
        ) : null}
        <h2 className="EventsCalender__item-title">{event.title}</h2>
        <div className="EventsCalender__item-description">
          {event.shortDescription}
        </div>
        {relative ? (
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
        ) : null}
        <div className="EventsCalender__item-meta">
          {showDay ? formatDate(new Date(event.startTime), 'ddd ') : ''}
          {formatDate(new Date(event.startTime), 'h:ssa')}
          <span> - </span>
          {formatDate(new Date(event.endTime), 'h:ssa')}
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
