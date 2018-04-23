import React from 'react';
import isBefore from 'date-fns/isBefore';
import startOfDay from 'date-fns/startOfDay';
import subDays from 'date-fns/subDays';
import HydroLeaf from '~components/HydroLeaf';
import EventsCalenderItem from '../EventsCalender/EventsCalenderItem';
import Loader from '../Loader/index';
import EventListQuery from './EventList.graphql';
import { GranuleChildProps } from '@brudil/granule';
import { GranuleQuery } from '~components/Query';

interface Result {
  allEvents: {
    edges: {
      node: any;
    }[];
  };
}

function EventList() {
  return (
    <ul className="List List--reset">
      <GranuleQuery
        query={EventListQuery}
        variables={{
          fromTime: new Date(),
        }}
      >
        {({ data, loading }: GranuleChildProps<Result>) => {
          if (!data || loading) {
            return <Loader dark />;
          }

          const { allEvents } = data;

          return (
            allEvents &&
            allEvents.edges
              .filter(
                (edge) =>
                  !isBefore(
                    new Date(edge.node.startTime),
                    startOfDay(subDays(new Date(), 1)),
                  ),
              )
              .map((edge) => (
                <li key={edge.node.eventId}>
                  <EventsCalenderItem
                    part={{ event: edge.node }}
                    inline
                    useAnchors
                    showDay
                    relative
                    small
                  />
                </li>
              ))
          );
        }}
      </GranuleQuery>
    </ul>
  );
}

export default HydroLeaf({
  disableSSR: true,
  name: 'EventList',
})(EventList);
