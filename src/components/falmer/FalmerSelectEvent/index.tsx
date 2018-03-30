import React from 'react';
import { Helmet } from 'react-helmet';
import formatDate from 'date-fns/format';
import ALL_EVENTS_QUERY from './AllEvents.graphql';
import FalmerDataList, { Cell, Row, HeaderCell } from '../FalmerDataList/index';
import { Connection } from '~components/falmer/types';
import { Event } from '../../../types/events';
import { HandledQuery } from '~components/HandledQuery';
// import FauxRouterLink from '../../FauxRouterLink';
// const FalmerEventCard = ({ event }) =>
//   <div className="FalmerCard FalmerCard--standard">
//     <FauxRouterLink href={`/events/${event.eventId}`} />
//     <h2>
//       {event.title}
//     </h2>
//   </div>;

interface IProps {
  onSelect(eventId: number): void;
}

interface Result {
  allEvents: Connection<Event>;
}

class AllEventsQuery extends HandledQuery<Result, {}> {}

function FalmerEvents({ onSelect }: IProps) {
  return (
    <AllEventsQuery query={ALL_EVENTS_QUERY}>
      {({ data }) => {
        if (!data) {
          return;
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
                    {formatDate(new Date(item.startTime), 'ddd Do MMM, HH:mm')}
                  </Cell>
                  <Cell>
                    {formatDate(new Date(item.endTime), 'ddd Do MMM, HH:mm')}
                  </Cell>
                  <Cell>
                    <button
                      className="Button"
                      onClick={() => onSelect(item.eventId)}
                    >
                      Move
                    </button>
                  </Cell>
                </Row>
              )}
            </FalmerDataList>
          </div>
        );
      }}
    </AllEventsQuery>
  );
}

export default FalmerEvents;
