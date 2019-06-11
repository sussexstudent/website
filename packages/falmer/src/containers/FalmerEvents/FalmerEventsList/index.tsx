import React from 'react';
import { Helmet } from 'react-helmet';
import formatDate from 'date-fns/format';
import { Link } from 'react-router-dom';
import ALL_EVENTS_QUERY from './AllEvents.graphql';
import FalmerDataList, {
  Cell,
  Row,
  HeaderCell,
} from '../../../components/FalmerDataList';
import FalmerSidebar from '../../../components/FalmerSidebar';
import FalmerListView from '../../../components/FalmerListView';
import FalmerSubSections, {
  SubSection,
} from '../../../components/FalmerSubSections';
import { Event } from '@ussu/common/src/types/events';
import { Connection } from '@ussu/common/src/types/falmer';
import { useQuery } from 'react-apollo-hooks';

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
const today = new Date();

const FalmerEvents: React.FC = () => {
  const { data, loading } = useQuery<Result>(ALL_EVENTS_QUERY, {
    variables: {
      filter: {
        fromTime: today,
      },
    },
  });

  if (loading || !data) {
    return null;
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
            <SubSection to="/events/periods/">Branding Periods</SubSection>
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
                        ({item.children.length} sub-
                        {plural(item.children.length, 'event')})
                      </small>
                    ) : null}
                  </Link>
                </Cell>
                <Cell>
                  {formatDate(new Date(item.startTime), 'EEE do MMM HH:mm')}
                </Cell>
                <Cell>
                  {formatDate(new Date(item.endTime), 'EEE do MMM HH:mm')}
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
          <Link className="Button" to="/events/new">
            New Event
          </Link>
        </FalmerSidebar>
      </FalmerListView>
    </div>
  );
};

export default FalmerEvents;
