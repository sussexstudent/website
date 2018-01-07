import React from 'react';
import EventList from '~components/EventList';

const HomepageEventsList = () => (
  <div className="EventsList u-container-bleed-1">
    <EventList />
    <a className="EventsList__view-more" href="/whats-on">
      See all events
    </a>
  </div>
);

export default HomepageEventsList;
