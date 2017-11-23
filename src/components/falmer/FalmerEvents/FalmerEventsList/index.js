import React from 'react';
import { graphql } from 'react-apollo';
import { Helmet } from 'react-helmet';
import formatDate from 'date-fns/format';
import { Link } from 'react-router-dom';
import AllEventsQuery from './AllEvents.graphql';
import Loader from '../../../Loader';
import FalmerDataList, {
  Cell,
  Row,
  HeaderCell,
} from '../../FalmerDataList/index';
import FalmerSidebar from '../../FalmerSidebar';
import FalmerListView from '../../FalmerListView';
import FalmerSubSections from '../../FalmerSubSections';
// import FauxRouterLink from '../../FauxRouterLink';
// const FalmerEventCard = ({ event }) =>
//   <div className="FalmerCard FalmerCard--standard">
//     <FauxRouterLink href={`/events/${event.eventId}`} />
//     <h2>
//       {event.title}
//     </h2>
//   </div>;
function plural(length, single, pluralWord = null) {
  if (Math.abs(length) === 1) {
    return single;
  }

  return pluralWord || `${single}s`;
}

function FalmerEvents({ data: { loading, allEvents } }) {
  return (
    <div>
      <Helmet>
        <title>Events</title>
      </Helmet>
      {loading ? (
        <Loader dark />
      ) : (
        <FalmerListView>
          <div className="FalmerListView__main">
            <FalmerSubSections>
              <FalmerSubSections.Section to="/events/venues/">
                Venues
              </FalmerSubSections.Section>
              <FalmerSubSections.Section to="/events/periods/">
                Branding Periods
              </FalmerSubSections.Section>
            </FalmerSubSections>
            <FalmerDataList
              items={allEvents.edges.map(edge => edge.node)}
              header={rowState => (
                <Row {...rowState}>
                  <HeaderCell>Title</HeaderCell>
                  <HeaderCell>Start time</HeaderCell>
                  <HeaderCell>End time</HeaderCell>
                  <HeaderCell>Student Group</HeaderCell>
                </Row>
              )}
              selectable
            >
              {(item, rowState) => (
                <Row {...rowState} id={item.id}>
                  <Cell>
                    <Link to={`/events/${item.eventId}`}>
                      {item.title}
                      {item.children.length > 0 ? (
                        <small>
                          {' '}
                          ({item.children.length} sub-{plural(
                            item.children.length,
                            'event'
                          )})
                        </small>
                      ) : null}
                    </Link>
                  </Cell>
                  <Cell>
                    {formatDate(new Date(item.startTime), 'ddd Do MMM, HH:mm')}
                  </Cell>
                  <Cell>
                    {formatDate(new Date(item.endTime), 'ddd Do MMM, HH:mm')}
                  </Cell>
                  <Cell>
                    {item.studentGroup ? (
                      <Link to={`/groups/${item.studentGroup.groupId}`}>
                        {item.studentGroup.name}
                      </Link>
                    ) : null}
                  </Cell>
                </Row>
              )}
            </FalmerDataList>
          </div>
          <FalmerSidebar>
            <Link className="Button" to="create">
              New Event
            </Link>
          </FalmerSidebar>
        </FalmerListView>
      )}
    </div>
  );
}

export default graphql(AllEventsQuery, {
  options: () => {
    const today = new Date();
    return {
      variables: {
        filter: {
          fromTime: today,
        },
      },
    };
  },
})(FalmerEvents);
