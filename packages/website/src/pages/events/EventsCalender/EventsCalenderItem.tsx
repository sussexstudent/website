import React from 'react';
import { has } from 'lodash';
import formatDate from 'date-fns/format';
import FauxInternalAppLink from '../../../components/FauxInternalAppLink';
import minimalisticTimeRenderer from '@ussu/common/src/libs/minimalisticTimeRenderer';
import { EventRelativeTime } from './EventRelativeTime';
import { Event, TicketCost, TicketType } from '@ussu/common/src/types/events';
import { AspectRatio, OneImage } from '../../../components/OneImage';
import { PatternPlaceholder } from '../../../components/PatternPlaceholder';
import { EventLikeButton } from './EventLikeButton';
import { cardActionable, contentCard } from '@ussu/common/src/libs/style/cards';
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

enum EventTagType {
  Info,
  Requirement,
  Taste,
}

function createTag(title: string, type: EventTagType): EventTag {
  return { title, type };
}

function* getTagsForEvent(event: Event) {
  if (event.isOver18Only) {
    yield createTag('18+', EventTagType.Requirement);
  }

  if (event.cost === 'FREE') {
    yield createTag('Free', EventTagType.Info);
  }

  if (
    event.ticketType !== undefined &&
    event.ticketType !== TicketType.NA &&
    event.ticketLevel !== 'SO'
  ) {
    yield createTag(
      event.cost === TicketCost.Free ? 'Ticketed' : 'Ticketed',
      EventTagType.Info,
    );
  }

  if (event.ticketLevel === 'LA') {
    yield createTag('Limited availability', EventTagType.Info);
  }

  if (event.type) {
    yield createTag(event.type.name, EventTagType.Taste);
  }

  if (event.categories && event.categories.length > 0) {
    yield* event.categories
      .slice(0, 2)
      .map((cat) => createTag(cat.name, EventTagType.Taste));
  }
}

interface EventsCalenderItemProps {
  relative?: boolean;
  showDay?: boolean;
  part: {
    event: Event;
  };
}

interface EventTag {
  title: string;
  type: EventTagType;
}

const EventItemTags: React.FC<{ tags: EventTag[] }> = ({ tags }) => (
  <ul
    css={{
      position: 'absolute',
      color: '#fff',
      fontWeight: 600,
      bottom: 6,
      left: 0,
      right: 0,
      fontSize: '0.7rem',
      margin: 0,
      padding: 0,
      listStyle: 'none',
      overflow: 'hidden',
      display: 'flex',
    }}
  >
    {tags.map((tag) => (
      <li
        css={{
          padding: '0.1rem 0.3rem',
          marginLeft: 6,
          borderRadius: '10px',
          display: 'inline-block',
          flex: '0 0 auto',
          background:
            tag.type === EventTagType.Info
              ? COLORS.BRAND_BLUE
              : tag.type === EventTagType.Requirement
              ? COLORS.BRAND_RED
              : COLORS.BRAND_GREEN,
        }}
      >
        {tag.title}
      </li>
    ))}
  </ul>
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

const CanceledStamp: React.FC = () => (
  <div
    css={[
      type(TypeSize.Trafalgar, Typeface.Secondary),
      {
        color: '#ff4144',
        position: 'absolute',
        textTransform: 'uppercase',
        fontWeight: 800,
        top: 80,
        left: 0,
        right: 0,
        textAlign: 'center',
        transform: 'rotate(13deg)',
        zIndex: 1,
      },
    ]}
  >
    Cancelled
  </div>
);

export const EventsCalenderItem: React.FC<EventsCalenderItemProps> = ({
  part,
  showDay = false,
  relative = false,
}) => {
  const event = part.event;
  return (
    <div
      className="EventsCalender__item"
      css={[
        cardActionable,
        contentCard,
        {
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
      {event.canceledAt !== null && <CanceledStamp />}

      {event.url !== undefined && event.url !== '' ? (
        <FauxInternalAppLink href={event.url} />
      ) : (
        <FauxInternalAppLink
          href={`/whats-on/${event.slug}-${event.eventId}`}
        />
      )}
      <div
        css={event.canceledAt !== null && { opacity: 0.3 }}
        className="EventsCalender__item-image u-responsive-ratio u-responsive-ratio--wide"
      >
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
        <EventItemTags tags={Array.from(getTagsForEvent(event))} />
      </div>
      {event.bundle !== null && event.bundle !== undefined ? (
        <EventItemBanner type={EventItemBannerType.Bundle}>
          Included in the {event.bundle.name}
        </EventItemBanner>
      ) : null}
      <div
        css={[
          event.canceledAt !== null && { opacity: 0.3 },
          {
            padding: '0.5rem',
          },
        ]}
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
        <div
          css={[
            type(TypeSize.GreatPrimer, Typeface.Secondary),
            {
              fontWeight: '600',
              margin: '0.2rem 0 0.4rem 0',
            },
          ]}
        >
          {event.title}
          {relative ? <EventRelativeTime event={event} /> : null}
        </div>
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
