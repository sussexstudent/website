import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import getUserLikedEvents from './MyProgramme.graphql';
import { startOfDay, addMonths } from 'date-fns';
import { Loader } from '../../../components/Loader';
import { EventListings } from '../WhatsOnListings/EventListings';

export const WhatsOnMyProgramme: React.FC = () => {
  const [now] = useState(new Date());
  const { data, loading } = useQuery(getUserLikedEvents, {
    variables: {
      filter: {
        fromTime: startOfDay(now).toISOString(),
        toTime: addMonths(startOfDay(now), 6).toISOString(),
      },
    },
  });

  return (
    <div className="LokiContainer">
      <h1>Build your own events programme</h1>
      {loading || !data ? (
        <Loader />
      ) : (
        <EventListings events={data.allEvents} removePast />
      )}
    </div>
  );
};
