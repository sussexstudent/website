import React from 'react';
import formatDate from 'date-fns/format';
import FauxInternalAppLink from '../../../components/FauxInternalAppLink';
import minimalisticTimeRenderer from '@ussu/common/src/libs/minimalisticTimeRenderer';
import { EventRelativeTime } from '../WhatsOnListings/EventRelativeTime';
import { AspectRatio, OneImage } from '../../../components/OneImage';
import { PatternPlaceholder } from '../../../components/PatternPlaceholder';
import { EventLikeButton } from '../WhatsOnListings/EventLikeButton';
import { cardActionable, contentCard } from '@ussu/basil/src/style/cards';
import { COLORS, MQ } from '@ussu/basil/src/style';
import { type, Typeface, TypeSize } from '@ussu/basil/src/style/type';
import { getTagsForEvent } from './tags';
import { renderEventLocation } from './utils';
import { WhatsOnEventCardTags } from './WhatsOnEventCardTags';
import {
  WhatsOnEventCardBanner,
  WhatsOnEventCardBannerType,
} from './WhatsOnEventCardBanner';
import { WhatsOnEventCardCanceledStamp } from './WhatsOnEventCardCanceledStamp';
import { EventCardFragment } from 'packages/website/src/generated/graphql';

interface EventsCalenderItemProps {
  relative?: boolean;
  showDay?: boolean;
  event: EventCardFragment;
}

export const WhatsOnEventCard: React.FC<EventsCalenderItemProps> = ({
  event,
  showDay = false,
  relative = false,
}) => {
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
      {event.canceledAt !== null && <WhatsOnEventCardCanceledStamp />}

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
        {event?.featuredImage?.resource ? (
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
        <WhatsOnEventCardTags tags={Array.from(getTagsForEvent(event))} />
      </div>
      {event.bundle !== null && event.bundle !== undefined ? (
        <WhatsOnEventCardBanner type={WhatsOnEventCardBannerType.Bundle}>
          Included in the {event.bundle.name}
        </WhatsOnEventCardBanner>
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
