import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import getUserLikedEvents from './MyProgramme.graphql';
import { startOfDay, addMonths } from 'date-fns';
import { Loader } from '../../../components/Loader';
import { EventListings } from '../WhatsOnListings/EventListings';
import { GetUserLikedEventsQuery } from '../../../generated/graphql';
import { LikedEmptyState } from './LikedEmptyState';
import { useViewer } from '../../bookmarket/currentUserData';

export const WhatsOnMyProgramme: React.FC = () => {
  const [now] = useState(new Date());
  const { loading: userLoading, isAuthenticated } = useViewer();
  const { data, loading } = useQuery<GetUserLikedEventsQuery>(
    getUserLikedEvents,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        filter: {
          fromTime: startOfDay(now).toISOString(),
          toTime: addMonths(startOfDay(now), 6).toISOString(),
        },
      },
    },
  );

  if (userLoading || loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return (
      <LikedEmptyState
        title="Log in to build your events programme"
        description="Like events you're interested in to save them here"
      />
    );
  }

  return (
    <div className="LokiContainer">
      {!data || data.allEvents.edges.length <= 0 ? (
        <LikedEmptyState
          title="You haven't got any upcoming events"
          description="Explore What's On to find events you're interested in"
        />
      ) : (
        <React.Fragment>
          <h1>Liked events</h1>
          <EventListings events={data.allEvents} removePast />
        </React.Fragment>
      )}
    </div>
  );
};
