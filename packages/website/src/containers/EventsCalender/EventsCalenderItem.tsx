import React from 'react';
import cx from 'classnames';
import { has } from 'lodash';
import formatDate from 'date-fns/format';
import FauxLink from '../../components/FauxLink';
import FauxInternalAppLink from '../../components/FauxInternalAppLink';
import minimalisticTimeRenderer from '@ussu/common/src/libs/minimalisticTimeRenderer';
import EventRelativeTime from './EventRelativeTime';
import { Event, TicketCost, TicketType } from '@ussu/common/src/types/events';
import { AspectRatio, OneImage } from '../../components/OneImage';

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

interface EventsCalenderItemProps {
  relative?: boolean;
  showDay?: boolean;
  inline?: boolean;
  small?: boolean;
  part: {
    event: Event;
  };
}

const EventsCalenderItem: React.FC<EventsCalenderItemProps> = ({
  part,
  inline = false,
  showDay = false,
  relative = false,
  small = false,
}) => {
  const event = part.event;
  const treat = getTreat(event);

  return (
    <div
      className={cx('EventsCalender__item', {
        'EventsCalender--inline': inline,
        'EventsCalender--small': small,
      })}
    >
      {event.url !== undefined && event.url !== '' ? (
        <FauxLink href={event.url} />
      ) : (
        <FauxInternalAppLink
          href={`/whats-on/${event.slug}-${event.eventId}`}
        />
      )}
      {has(part, 'event.featuredImage.resource') ? (
        <div className="EventsCalender__item-image u-responsive-ratio u-responsive-ratio--wide">
          <OneImage
            src={event.featuredImage.resource}
            aspectRatio={AspectRatio.r16by9}
            alt=""
            withoutContainer
          />
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
      event.ticketType !== TicketType.NA &&
      event.ticketLevel !== 'SO' ? (
        <div className="EventsCalender__item-banner EventsCalender__item-banner--tickets">
          {event.cost === TicketCost.Free
            ? 'Reserve your space'
            : 'Buy Tickets'}
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
          {showDay ? formatDate(new Date(event.startTime), 'EEE ') : ''}
          {minimalisticTimeRenderer(new Date(event.startTime))}
          <span> – </span>
          {minimalisticTimeRenderer(new Date(event.endTime))}
          {renderEventLocation(event)}
        </div>
      </div>
    </div>
  );
};

// TODO: Add relative date if near or started and not ended
// const nearDate = addHours(new Date(), 10);
// {isBefore(event.startDate, nearDate)
//   ? <span>
//               {' '}- Starts in {distanceInWordsToNow(event.startDate)}
//             </span>
//   : null}

export default EventsCalenderItem;
