import React from 'react';
import formatDate from 'date-fns/format';
import FauxInternalAppLink from '../../../components/FauxInternalAppLink';
import minimalisticTimeRenderer from '@ussu/common/src/libs/minimalisticTimeRenderer';
import { EventRelativeTime } from '../WhatsOnListings/EventRelativeTime';
import { AspectRatio, OneImage } from '../../../components/OneImage';
import { PatternPlaceholder } from '../../../components/PatternPlaceholder';
import { EventLikeButton } from '../WhatsOnListings/EventLikeButton';
import { COLORS } from '@ussu/basil/src/style';
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
        {
          borderRadius: 6,
          overflow: 'hidden',
          display: 'block',
          position: 'relative',
          width: '100%',
          transition: 'box-shadow 300ms ease, background 300ms ease',
          background: 'transparent',
          boxShadow: '0 2px 0px rgba(30, 30, 30, 0)',
          '&:hover': {
            background: '#fff',
            boxShadow:
              '0 2px 12px rgba(30, 30, 30, 0.1), 0 0 2px rgba(30, 30, 80, 0.1)',
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
        <div css={[type(TypeSize.Minion, Typeface.Secondary)]}>
          <span css={{ color: COLORS.BRAND_RED, fontWeight: 600 }}>
            {showDay ? formatDate(new Date(event.startTime), 'EEE ') : ''}
            {minimalisticTimeRenderer(new Date(event.startTime))}
          </span>
          {event.kicker ? (
            <span
              css={[
                {
                  paddingLeft: '0.5rem',
                  marginTop: '0.3rem',
                  fontWeight: 600,
                },
              ]}
            >
              {event.kicker}
            </span>
          ) : null}
        </div>
        <div
          css={[
            type(TypeSize.Pica, Typeface.Secondary),
            {
              fontWeight: '600',
              padding: '0.2rem 0',
            },
          ]}
        >
          {event.title}
          {relative ? <EventRelativeTime event={event} /> : null}
        </div>
        <div
          css={{
            fontSize: '0.8rem',
            display: 'none',
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
              fontSize: '0.8rem',
            },
          ]}
        >
          <span>{renderEventLocation(event)}</span>
        </div>
      </div>
    </div>
  );
};
