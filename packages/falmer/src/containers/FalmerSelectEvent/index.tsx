import React from 'react';
import { Helmet } from 'react-helmet';
import formatDate from 'date-fns/format';
import ALL_EVENTS_QUERY from './AllEvents.graphql';
import FalmerDataList, {
  Cell,
  Row,
  HeaderCell,
} from '../../components/FalmerDataList';
import { Connection } from '@ussu/common/src/types/falmer';
import { Event } from '@ussu/common/src/types/events';
import { useQuery } from '@apollo/react-hooks';

interface IProps {
  onSelect(eventId: number): void;
}

interface Result {
  allEvents: Connection<Event>;
}

const FalmerEvents: React.FC<IProps> = ({ onSelect }) => {
  const { data, loading } = useQuery<Result>(ALL_EVENTS_QUERY);

  if (loading || !data) {
    return null;
  }

  const allEvents = data.allEvents;

  return (
    <div>
      <Helmet>
        <title>Events</title>
      </Helmet>
      <FalmerDataList
        items={allEvents.edges.map((edge) => edge.node)}
        header={(rowState) => (
          <Row {...rowState}>
            <HeaderCell>Title</HeaderCell>
            <HeaderCell>Start time</HeaderCell>
            <HeaderCell>End time</HeaderCell>
            <HeaderCell />
          </Row>
        )}
        selectable
      >
        {(item: Event, rowState) => (
          <Row {...rowState} id={item.eventId}>
            <Cell>
              {item.title}
              {item.children.length > 0 ? (
                <span>{`(${item.children.length} children)`}</span>
              ) : null}
            </Cell>
            <Cell>
              {formatDate(new Date(item.startTime), 'EEE do MMM, HH:mm')}
            </Cell>
            <Cell>
              {formatDate(new Date(item.endTime), 'EEE do MMM, HH:mm')}
            </Cell>
            <Cell>
              <button className="Button" onClick={() => onSelect(item.eventId)}>
                Move
              </button>
            </Cell>
          </Row>
        )}
      </FalmerDataList>
    </div>
  );
};

export default FalmerEvents;
