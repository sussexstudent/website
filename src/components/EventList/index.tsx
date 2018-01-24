import React from 'react';
import isBefore from 'date-fns/isBefore';
import startOfDay from 'date-fns/startOfDay';
import subDays from 'date-fns/subDays';
import { ApolloProvider, graphql, ChildProps } from 'react-apollo';
import HydroLeaf from '~components/HydroLeaf';
import apolloClient from '../../libs/getApolloClientForFalmer';
import EventsCalenderItem from '../EventsCalender/EventsCalenderItem';
import Loader from '../Loader/index';
import EventListQuery from './EventList.graphql';

interface Result {
  allEvents: {
    edges: {
      node: any;
    }[];
  };
}

interface OwnProps {}

type IProps = ChildProps<OwnProps, Result>;

function EventList(props: IProps) {
  const { data } = props;
  if (!data || data.loading) {
    return <Loader />;
  }

  const { allEvents } = data;

  return (
    <ul className="List List--reset">
      <li>
        {allEvents &&
          allEvents.edges
            .filter(
              (edge) =>
                !isBefore(
                  new Date(edge.node.startTime),
                  startOfDay(subDays(new Date(), 1)),
                ),
            )
            .map((edge) => (
              <EventsCalenderItem
                part={{ event: edge.node }}
                inline
                useAnchors
                showDay
                relative
                small
              />
            ))}
      </li>
    </ul>
  );
}

const EventListContainer = graphql<Result, OwnProps>(EventListQuery, {
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
  EventsListWrapper,
);
