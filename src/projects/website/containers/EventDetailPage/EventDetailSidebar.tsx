import React from 'react';
import { Event, TicketType } from '~types/events';
import ContentCard from '~components/ContentCard';
import Button from '~components/Button';
// import { MSLTickets } from '~components/EventDetailPage/MSLTickets';
import { SocialArray } from '~components/SocialArray';
import { EventAccessSidebar } from '~website/containers/EventDetailPage/EventAccessSidebar';

interface IProps {
  event: Event;
  msl: any;
}

export const EventDetailSidebar = (props: IProps) => {
  const { event } = props;

  return (
    <aside>
      {event.ticketType === TicketType.Native ? (
        <ContentCard>
          <Button href={event.ticketData}>Buy tickets on Native</Button>
        </ContentCard>
      ) : null}
      {event.ticketType === TicketType.MSL ? (
        <React.Fragment>
          {/*<MSLTickets msl={props.msl} />*/}
          <ContentCard>
            <Button href={`${event.ticketData}#tickets`}>Tickets</Button>
          </ContentCard>
        </React.Fragment>
      ) : null}
      <EventAccessSidebar event={event} />
      {event.socialFacebook ? (
        <div>
          <h3>Social</h3>
          <SocialArray
            networks={{ facebook: { link: event.socialFacebook } }}
          />
        </div>
      ) : null}
    </aside>
  );
};
