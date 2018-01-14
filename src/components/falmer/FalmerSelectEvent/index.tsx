import React from 'react';
import { graphql } from 'react-apollo';
import { Helmet } from 'react-helmet';
import formatDate from 'date-fns/format';
import AllEventsQuery from './AllEvents.graphql';
import Loader from '../../Loader';
import FalmerDataList, { Cell, Row, HeaderCell } from '../FalmerDataList/index';
import {ApolloHandlerChildProps} from "~components/apolloHandler";
import {Connection} from "~components/falmer/types";
import {Event} from "../../../types/events";
import {compose} from 'recompose';
// import FauxRouterLink from '../../FauxRouterLink';
// const FalmerEventCard = ({ event }) =>
//   <div className="FalmerCard FalmerCard--standard">
//     <FauxRouterLink href={`/events/${event.eventId}`} />
//     <h2>
//       {event.title}
//     </h2>
//   </div>;

interface OwnProps {
  onSelect(eventId: number): void;
}

interface Result {
  allEvents: Connection<Event>
}

type IProps = ApolloHandlerChildProps<OwnProps, Result>

function FalmerEvents({ data: { loading, allEvents }, onSelect }: IProps) {
  return (
    <div>
      <Helmet>
        <title>Events</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <FalmerDataList
          items={allEvents.edges.map(edge => edge.node)}
          header={rowState => (
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
      )}
    </div>
  );
}

export default compose<IProps, OwnProps>(
  graphql(AllEventsQuery)
)(FalmerEvents);
