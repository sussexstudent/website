import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import getUserLikedEvents from '../EventsCalender/MyProgramme.graphql';
import { startOfDay, addMonths } from 'date-fns';
import Loader from '../../components/Loader';
import { EventListings } from '../EventsCalender/EventListings';

export interface MyProgrammeProps {}

export const MyProgramme: React.FC<MyProgrammeProps> = ({}) => {
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
