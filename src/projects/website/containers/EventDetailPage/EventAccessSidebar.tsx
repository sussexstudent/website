import React from 'react';
import { Event } from '~types/events';

interface EventAccessSidebarProps {
  event: Event;
}

export const EventAccessSidebar: React.SFC<EventAccessSidebarProps> = ({ event }) => (
  <div className="EventSidebar">
    {event.type && (
      <div className="EventSidebar__part">
        <h4 className="EventSidebar__heading">Type</h4>
        <div className="EventSidebar__value">{event.type.name}</div>
      </div>
    )}
    {event.categories.length > 0 && (
      <div className="EventSidebar__part">
        <h4 className="EventSidebar__heading">Categories</h4>
        <ul className="EventSidebar__value">
          {event.categories.map(cat => (
            <li>{cat.name}</li>
          ))}
        </ul>
      </div>
    )}
    <div className="EventSidebar__part">
      <h4 className="EventSidebar__heading">Audience</h4>
      <ul className="EventSidebar__value">
        {event.audienceGoodToMeetPeople && <li>Good to meet people</li>}
        {event.audienceJustForPgs && <li>Great for PGs</li>}
        {event.audienceSuitableKidsFamilies && <li>Great for Kids and Families</li>}
        {event.isOver18Only && <li>Over 18s only, ID Required</li>}
      </ul>
    </div>

    <div className="EventSidebar__part">
      <h4 className="EventSidebar__heading">Accessibility</h4>


      For access requirements please contact{' '}
      <a href="mailto:access@sussexstudent.com">access@sussexstudent.com</a>
    </div>
  </div>
);
