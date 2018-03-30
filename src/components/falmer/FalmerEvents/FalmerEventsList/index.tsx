import React from 'react';
import { Helmet } from 'react-helmet';
import formatDate from 'date-fns/format';
import { Link } from 'react-router-dom';
import ALL_EVENTS_QUERY from './AllEvents.graphql';
import FalmerDataList, {
  Cell,
  Row,
  HeaderCell,
} from '../../FalmerDataList/index';
import FalmerSidebar from '../../FalmerSidebar';
import FalmerListView from '../../FalmerListView';
import FalmerSubSections, { SubSection } from '../../FalmerSubSections';
import { Event } from '../../../../types/events';
import { Connection } from '~components/falmer/types';
import { HandledQuery } from '~components/HandledQuery';
// import FauxRouterLink from '../../FauxRouterLink';
// const FalmerEventCard = ({ event }) =>
//   <div className="FalmerCard FalmerCard--standard">
//     <FauxRouterLink href={`/events/${event.eventId}`} />
//     <h2>
//       {event.title}
//     </h2>
//   </div>;
function plural(
  length: number,
  single: string,
  pluralWord: string | null = null,
) {
  if (Math.abs(length) === 1) {
    return single;
  }

  return pluralWord || `${single}s`;
}

interface Result {
  allEvents: Connection<Event>;
}

class AllEventsQuery extends HandledQuery<Result, {}> {}

function FalmerEvents() {
  const today = new Date();
  return (
    <AllEventsQuery
      query={ALL_EVENTS_QUERY}
      variables={{
        filter: {
          fromTime: today,
        },
      }}
    >
      {({ data }) => {
        if (!data) {
          return;
        }

        const { allEvents } = data;

        return (
          <div>
            <Helmet>
              <title>Events</title>
            </Helmet>
            <FalmerListView>
              <div className="FalmerListView__main">
                <FalmerSubSections>
                  <SubSection to="/events/venues/">Venues</SubSection>
                  <SubSection to="/events/periods/">
                    Branding Periods
                  </SubSection>
                </FalmerSubSections>
                <FalmerDataList
                  items={allEvents.edges.map((edge) => edge.node)}
                  header={(rowState) => (
                    <Row {...rowState}>
                      <HeaderCell>Title</HeaderCell>
                      <HeaderCell>Start time</HeaderCell>
                      <HeaderCell>End time</HeaderCell>
                      <HeaderCell>Student Group</HeaderCell>
                    </Row>
                  )}
                  selectable
                >
                  {(item: Event, rowState) => (
                    <Row {...rowState} id={item.id}>
                      <Cell>
                        <Link to={`/events/${item.eventId}`}>
                          {item.title}
                          {item.children.length > 0 ? (
                            <small>
                              {' '}
                              ({item.children.length} sub-{plural(
                                item.children.length,
                                'event',
                              )})
                            </small>
                          ) : null}
                        </Link>
                      </Cell>
                      <Cell>
                        {formatDate(
                          new Date(item.startTime),
                          'ddd Do MMM, HH:mm',
                        )}
                      </Cell>
                      <Cell>
                        {formatDate(
                          new Date(item.endTime),
                          'ddd Do MMM, HH:mm',
                        )}
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
          </div>
        );
      }}
    </AllEventsQuery>
  );
}

export default FalmerEvents;
