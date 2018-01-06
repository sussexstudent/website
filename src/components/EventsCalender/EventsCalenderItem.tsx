import React from 'react';
import cx from 'classnames';
import has from 'lodash/has';
import formatDate from 'date-fns/format';
import Image from '../Image';
import FauxLink from '../FauxLink';
import FauxRouterLink from '../FauxRouterLink';
import minimalisticTimeRenderer from '../../libs/minimalisticTimeRenderer';
import EventRelativeTime from './EventRelativeTime';
import {Event} from "../../types/events";
// import PropTypes from 'prop-types';

function renderEventLocation(event: Event) {
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

function getTreat(event: Event) {
  if (event.cost === 'FREE') {
    return 'Free';
  }

  if (event.ticketLevel === 'LA') {
    return 'Limited availability';
  }

  return null;
}

interface IProps {
  useAnchors: boolean;
  relative?: boolean;
  showDay?: boolean;
  inline?: boolean;
  part: {
    event: Event
  }
}

function EventsCalenderItem({
  part,
  useAnchors,
  inline = false,
  showDay = false,
  relative = false,
}: IProps) {
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
        <FauxFalmerLink href={`/whats-on/${event.slug}-${event.eventId}`} />
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
        <h2 className="EventsCalender__item-title">
          {event.title}
          {relative ? <EventRelativeTime event={event} /> : null}
        </h2>
        <div className="EventsCalender__item-description">
          {event.shortDescription}
        </div>
        <div className="EventsCalender__item-meta">
          {showDay ? formatDate(new Date(event.startTime), 'ddd ') : ''}
          {minimalisticTimeRenderer(new Date(event.startTime))}
          <span> – </span>
          {minimalisticTimeRenderer(new Date(event.endTime))}
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

export default EventsCalenderItem;
