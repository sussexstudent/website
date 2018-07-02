import React from 'react';
import { Helmet } from 'react-helmet';
import formatDate from 'date-fns/format';
import { Link } from 'react-router-dom';
import ALL_EVENTS_QUERY from './AllEvents.graphql';
import FalmerDataList, {
  Cell,
  Row,
  HeaderCell,
} from '~falmer/components/FalmerDataList';
import FalmerListView from '~falmer/components/FalmerListView';
import FalmerSubSections, {
  SubSection,
} from '~falmer/components/FalmerSubSections';
import { Event } from '~types/events';
import { Connection } from '~types/falmer';
import {
  EventFilter,
  EventsListSidebar,
} from '~falmer/containers/FalmerEvents/FalmerEventsList/EventsListSidebar';
import { pickBy, identity } from 'lodash';
import { Query } from '../../../../../../node_modules/react-apollo';
import Loader from '~components/Loader';

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

class AllEventsQuery extends Query<Result, {}> {}

class FalmerEventList extends React.Component<{}, { filter: EventFilter }> {
  state = {
    filter: {
      fromTime: new Date(),
      toTime: undefined,
      title: '',
    },
  };

  render() {
    const { filter } = this.state;

    return (
      <AllEventsQuery
        query={ALL_EVENTS_QUERY}
        variables={{
          filter: pickBy(filter, identity),
        }}
      >
        {({ data, loading }) => {
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
                  {loading ? (
                    <Loader />
                  ) : (
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
                              'EEE do MMM HH:mm',
                            )}
                          </Cell>
                          <Cell>
                            {formatDate(
                              new Date(item.endTime),
                              'EEE do MMM HH:mm',
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
                  )}
                </div>
                <EventsListSidebar
                  initialFilters={filter}
                  onFilterChange={(data) => this.setState({ filter: data })}
                />
              </FalmerListView>
            </div>
          );
        }}
      </AllEventsQuery>
    );
  }
}

export default FalmerEventList;
