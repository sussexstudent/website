import React from 'react';
import { graphql } from 'react-apollo';
import { Helmet } from 'react-helmet';
import formatDate from 'date-fns/format';
import { Link } from 'react-router-dom';
import AllEventsQuery from './AllEvents.graphql';
import Loader from '../../Loader';
import FalmerDataList, { Cell, Row, HeaderCell } from '../FalmerDataList/index';
// import FauxRouterLink from '../../FauxRouterLink';
// const FalmerEventCard = ({ event }) =>
//   <div className="FalmerCard FalmerCard--standard">
//     <FauxRouterLink href={`/events/${event.eventId}`} />
//     <h2>
//       {event.title}
//     </h2>
//   </div>;

function FalmerEvents({ data: { loading, allEvents } }) {
  return (
    <div>
      <Helmet>
        <title>Events</title>
      </Helmet>
      <h1 className="Heading">Events</h1>
      {loading
        ? <Loader />
        : <FalmerDataList
            items={allEvents.edges.map(edge => edge.node)}
            header={rowState =>
              <Row {...rowState}>
                <HeaderCell>Title</HeaderCell>
                <HeaderCell>Start time</HeaderCell>
                <HeaderCell>End time</HeaderCell>
              </Row>}
            selectable
          >
            {(item, rowState) =>
              <Row {...rowState} id={item.id}>
                <Cell>
                  <Link to={`/events/${item.eventId}`}>
                    {item.title}
                  </Link>
                </Cell>
                <Cell>
                  {formatDate(new Date(item.startTime), 'ddd Do MMM, HH:mm')}
                </Cell>
                <Cell>
                  {formatDate(new Date(item.endTime), 'ddd Do MMM, HH:mm')}
                </Cell>
              </Row>}
          </FalmerDataList>}
    </div>
  );
}

export default graphql(AllEventsQuery)(FalmerEvents);
