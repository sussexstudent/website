import React from 'react';
import { Event, TicketCost, TicketType } from '@ussu/common/src/types/events';
import { SocialArray } from '../../../components/SocialArray';
import { EventAccessSidebar } from './EventAccessSidebar';
import { BuyButton } from './BuyButton';
import { formatPrice } from '@ussu/common/src/libs/money';
import { every } from 'lodash';
import { EventSidebarSection } from './EventSidebarSection';

interface EventDetailSidebarProps {
  event: Event;
  msl: any;
  onTicketButton(): void;
}

function mslSubtitle(msl: any) {
  if (!msl) {
    return 'loading';
  }

  if (msl.tickets.length <= 0) {
    return 'Not currently on sale';
  }

  const withoutUndefined = every(msl.tickets, (ticket) => ticket !== undefined);

  if (!withoutUndefined) {
    return '';
  }

  const costs = msl.tickets.map((ticket: any) => ticket.value);

  const min = Math.min(...costs);
  const max = Math.min(...costs);

  if (min <= 0 && max <= 0) {
    return 'Free!';
  }

  return min === max ? `£${formatPrice(min)}` : `from £${formatPrice(min)}`;
}

export const EventDetailSidebar: React.FC<EventDetailSidebarProps> = (
  props,
) => {
  const { event, msl } = props;

  const ticketCta =
    event.cost === TicketCost.Free ? 'Reserve your space' : 'Get Tickets';

  return (
    <aside css={{ paddingBottom: '1rem' }}>
      {event.ticketType === TicketType.Native ? (
        <BuyButton
          href={event.ticketData}
          title={ticketCta}
          subtitle="via native.fm"
        />
      ) : null}
      {event.ticketType === TicketType.Eventbrite ? (
        <BuyButton
          href={event.ticketData}
          title={ticketCta}
          subtitle="via Eventbrite"
        />
      ) : null}
      {event.ticketType === TicketType.Generic ? (
        <BuyButton href={event.ticketData} title={ticketCta} subtitle="" />
      ) : null}
      {event.ticketType === TicketType.ACCA ? (
        <BuyButton
          href={event.ticketData}
          title={ticketCta}
          subtitle="via attenboroughcentre.com"
        />
      ) : null}
      {event.ticketType === TicketType.MSL ? (
        <React.Fragment>
          {/*<BuyButton*/}
          {/*onClick={onTicketButton}*/}
          {/*title={ticketCta}*/}
          {/*subtitle={mslSubtitle(msl)}*/}
          {/*disabled={msl && msl.tickets <= 0}*/}
          {/*/>*/}
          <BuyButton
            href={`${event.ticketData}/tickets`}
            title={ticketCta}
            subtitle={mslSubtitle(msl)}
            disabled={msl && msl.tickets <= 0}
          />
        </React.Fragment>
      ) : null}
      <EventAccessSidebar event={event} />
      {event.socialFacebook ? (
        <EventSidebarSection heading="Social">
          <SocialArray
            networks={{ facebook: { link: event.socialFacebook } }}
          />
        </EventSidebarSection>
      ) : null}
    </aside>
  );
};
