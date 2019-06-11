import React from 'react';
import { HandledQuery } from '../../components/HandledQuery';
import EXAMPLE_QUERY from './ExampleQuery.graphql';
import './test.css';
import { RouteComponent } from '@ussu/common/src/types/routes';

class EventQuery extends HandledQuery<any, { brand: string }> {}

export default class EventDiscovery extends React.Component<RouteComponent> {
  render() {
    return (
      <EventQuery
        query={EXAMPLE_QUERY}
        variables={{ brand: 'freshers-week-2017' }}
      >
        {(_props) => {
          return (
            <div className="LokiContainer">
              {/*<h1>Event Discovery</h1>*/}
              {/*<div style={{ width: '500px', height: '500px' }}>*/}
              {/*<CardDeck className="master-root" onEnd={() => null}>*/}
              {/*{props.data.allEvents.edges.map((eventNode: any) => {*/}
              {/*const event = eventNode.node;*/}
              {/*return (*/}
              {/*<Card*/}
              {/*key={event.eventId}*/}
              {/*onSwipeLeft={() => console.log('remove')}*/}
              {/*onSwipeRight={() => console.log('add')}*/}
              {/*>*/}
              {/*<h1>{event.title}</h1>*/}
              {/*</Card>*/}
              {/*);*/}
              {/*})}*/}
              {/*</CardDeck>*/}
              {/*</div>*/}
            </div>
          );
        }}
      </EventQuery>
    );
  }
}
