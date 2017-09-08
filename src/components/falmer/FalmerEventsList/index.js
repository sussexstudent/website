import React from 'react';
import { graphql } from 'react-apollo';
import AllEventsQuery from './AllEvents.graphql';
import Loader from '../../Loader';
import FauxRouterLink from '../../FauxRouterLink';

const FalmerEventCard = ({ event }) =>
  <div className="FalmerCard FalmerCard--standard">
    <FauxRouterLink href={`/events/${event.eventId}`} />
    <h2>
      {event.title}
    </h2>
  </div>;

function FalmerEvents({ data: { loading, allEvents } }) {
  return (
    <div>
      <h1>Events</h1>
      {loading
        ? <Loader />
        : <div className="FalmerCardGrid FalmerCardGrid--fill">
            {allEvents.edges.map(edge => <FalmerEventCard event={edge.node} />)}
          </div>}
    </div>
  );
}

export default graphql(AllEventsQuery)(FalmerEvents);
