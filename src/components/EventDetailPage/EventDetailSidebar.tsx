import React from 'react';
import { Event, TicketType } from '../../types/events';
import ContentCard from '~components/ContentCard';
import Button from '~components/Button';
// import { MSLTickets } from '~components/EventDetailPage/MSLTickets';
import { SocialArray } from '~components/SocialArray';
import { MSLTickets } from '~components/EventDetailPage/MSLTickets';

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
          <h3>Tickets</h3>
          <Button href={event.ticketData}>Buy tickets on Native</Button>
        </ContentCard>
      ) : null}
      {event.ticketType === TicketType.MSL ? (
        <React.Fragment>
          <MSLTickets msl={props.msl} />
          <ContentCard>
            <h3>Tickets</h3>
            <Button href={`${event.ticketData}#tickets`}>Get tickets</Button>
          </ContentCard>
        </React.Fragment>
      ) : null}
      <ContentCard>
        For access requirements please contact{' '}
        <a href="mailto:access@sussexstudent.com">access@sussexstudent.com</a>
      </ContentCard>
      {event.socialFacebook ? (
        <ContentCard>
          <h3>Social</h3>
          <SocialArray
            networks={{ facebook: { link: event.socialFacebook } }}
          />
        </ContentCard>
      ) : null}
      {event.venue ? (
        <ContentCard>
          <h3>{event.venue.name}</h3>
          {event.venue.websiteLink ? (
            <Button href={event.venue.websiteLink}>More information</Button>
          ) : null}
        </ContentCard>
      ) : null}
    </aside>
  );
};
