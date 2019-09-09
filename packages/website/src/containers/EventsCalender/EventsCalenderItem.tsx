import React from 'react';
import cx from 'classnames';
import { has } from 'lodash';
import formatDate from 'date-fns/format';
import FauxInternalAppLink from '../../components/FauxInternalAppLink';
import minimalisticTimeRenderer from '@ussu/common/src/libs/minimalisticTimeRenderer';
import EventRelativeTime from './EventRelativeTime';
import { Event, TicketCost, TicketType } from '@ussu/common/src/types/events';
import { AspectRatio, OneImage } from '../../components/OneImage';
import PatternPlaceholder from '../../components/PatternPlaceholder';
import { EventLikeButton } from './EventLikeButton';
import { cardActionable } from '@ussu/common/src/libs/style/cards';
import { COLORS, MQ } from '@ussu/common/src/libs/style';
import { type, Typeface, TypeSize } from '@ussu/common/src/libs/style/type';

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
  part: {
    event: Event;
  };
}

const EventItemImageTreat: React.FC = ({ children }) => (
  <div
    css={{
      position: 'absolute',
      color: '#fff',
      fontWeight: 600,
      padding: '0.1rem 0.3rem',
      textShadow: '0 0 4px rgba(50, 50, 50, 0.8)',
      bottom: 0,
      right: 0,
      fontSize: '0.9rem',
      textTransform: 'uppercase',
    }}
  >
    {children}
  </div>
);

enum EventItemBannerType {
  Bundle,
  Ticket,
}

const EventItemBanner: React.FC<{ type: EventItemBannerType }> = ({
  type,
  children,
}) => (
  <div
    css={{
      color: '#fff',
      fontWeight: 600,
      fontSize: '0.9rem',
      textAlign: 'center',
      display: 'block',
      backgroundColor:
        type === EventItemBannerType.Bundle ? '#fbaa05' : COLORS.BRAND_GREEN,
    }}
  >
    {children}
  </div>
);

const EventsCalenderItem: React.FC<EventsCalenderItemProps> = ({
  part,
  showDay = false,
  relative = false,
}) => {
  const event = part.event;
  const treat = getTreat(event);

  return (
    <div
      className={cx('EventsCalender__item')}
      css={[
        cardActionable,
        {
          borderRadius: 6,
          background: '#fff',
          display: 'block',
          position: 'relative',
          marginBottom: '1rem',
          width: '100%',
          [MQ.Small]: {
            width: 240,
            marginRight: '1rem',
          },
          [MQ.Medium]: {
            width: 280,
          },
          [MQ.Large]: {
            marginRight: '1.5rem',
            width: 320,
          },
        },
      ]}
    >
      {event.url !== undefined && event.url !== '' ? (
        <FauxInternalAppLink href={event.url} />
      ) : (
        <FauxInternalAppLink
          href={`/whats-on/${event.slug}-${event.eventId}`}
        />
      )}
      <div className="EventsCalender__item-image u-responsive-ratio u-responsive-ratio--wide">
        {has(part, 'event.featuredImage.resource') ? (
          <OneImage
            src={event.featuredImage.resource}
            aspectRatio={AspectRatio.r16by9}
            alt=""
            withoutContainer
          />
        ) : (
          <PatternPlaceholder />
        )}
        <div className="EventsCalender__item-image-like">
          <EventLikeButton event={event} />
        </div>

        {treat !== null ? (
          <EventItemImageTreat>{treat}</EventItemImageTreat>
        ) : null}
      </div>
      {event.bundle !== null && event.bundle !== undefined ? (
        <EventItemBanner type={EventItemBannerType.Bundle}>
          Included in the {event.bundle.name}
        </EventItemBanner>
      ) : null}
      {event.ticketType !== undefined &&
      event.ticketType !== TicketType.NA &&
      event.ticketLevel !== 'SO' ? (
        <EventItemBanner type={EventItemBannerType.Ticket}>
          {event.cost === TicketCost.Free
            ? 'Reserve your space'
            : 'Tickets available'}
        </EventItemBanner>
      ) : null}
      <div
        css={{
          padding: '0.5rem',
        }}
      >
        {event.kicker ? (
          <div
            css={[
              type(TypeSize.Minion, Typeface.Secondary),
              {
                marginTop: '0.3rem',
                fontWeight: 600,
              },
            ]}
          >
            {event.kicker}
          </div>
        ) : null}
        <h2
          css={[
            type(TypeSize.DoublePica),
            {
              margin: '0.2rem 0 0.4rem 0',
            },
          ]}
        >
          {event.title}
          {relative ? <EventRelativeTime event={event} /> : null}
        </h2>
        <div
          css={{
            fontSize: '0.8rem',
          }}
        >
          {event.shortDescription}
        </div>
        <div
          css={[
            type(TypeSize.Minion, Typeface.Primary),
            {
              color: COLORS.GREY_SLATE,
              fontWeight: 500,
              paddingTop: '1rem',
              fontSize: '0.8rem',
            },
          ]}
        >
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
