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
import FalmerSubSections, { SubSection } from '../../FalmerSubSections';
import {Event} from "../../../../types/events";
import {ApolloHandlerChildProps} from "~components/apolloHandler";
import {Connection} from "~components/falmer/types";
import {compose} from 'recompose';
// import FauxRouterLink from '../../FauxRouterLink';
// const FalmerEventCard = ({ event }) =>
//   <div className="FalmerCard FalmerCard--standard">
//     <FauxRouterLink href={`/events/${event.eventId}`} />
//     <h2>
//       {event.title}
//     </h2>
//   </div>;
function plural(length: number, single: string, pluralWord: string | null = null) {
  if (Math.abs(length) === 1) {
    return single;
  }

  return pluralWord || `${single}s`;
}

interface OwnProps {

}

interface Result {
  allEvents: Connection<Event>
}

type IProps = ApolloHandlerChildProps<OwnProps, Result>

function FalmerEvents({ data: { loading, allEvents } }: IProps) {
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
              <SubSection to="/events/venues/">
                Venues
              </SubSection>
              <SubSection to="/events/periods/">
                Branding Periods
              </SubSection>
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

export default compose<IProps, OwnProps>(
  graphql(AllEventsQuery, {
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
  })
)(FalmerEvents);
