import React from 'react';
import isBefore from 'date-fns/isBefore';
import startOfDay from 'date-fns/startOfDay';
import subDays from 'date-fns/subDays';
import { ApolloProvider, graphql, QueryProps, MutationFunc } from 'react-apollo';
import HydroLeaf from '~components/HydroLeaf';
import apolloClient from '../../libs/getApolloClientForFalmer';
import EventsCalenderItem from '../EventsCalender/EventsCalenderItem';
import Loader from '../Loader/index';
import EventListQuery from './EventList.graphql';

interface Result {
  allEvents: {
    edges: Array<{
      node: any;
    }>;
  }
}

interface IProps {
  data?: QueryProps<any> & Result;
  mutate: MutationFunc<Result>;
}

function EventList({ data: { loading, allEvents } }: IProps) {
  if (loading) {
    return <Loader />;
  }

  return (
    <ul className="List List--reset">
      <li>
        {allEvents.edges
          .filter(
            edge =>
              !isBefore(
                new Date(edge.node.startTime),
                startOfDay(subDays(new Date(), 1))
              )
          )
          .map(edge => (
            <EventsCalenderItem
              part={{ event: edge.node }}
              inline
              useAnchors
              showDay
              relative
            />
          ))}
      </li>
    </ul>
  );
}

const EventListContainer = graphql(EventListQuery, {
  options: {
    variables: {
      fromTime: new Date(),
    },
  },
})(EventList);

function EventsListWrapper() {
  return (
    <ApolloProvider client={apolloClient}>
      <EventListContainer />
    </ApolloProvider>
  );
}
export default HydroLeaf({ disableSSR: true, name: 'EventList' })(
  EventsListWrapper
);
