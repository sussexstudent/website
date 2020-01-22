import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import startOfDay from 'date-fns/startOfDay';
import addMonths from 'date-fns/addMonths';
import EventListingsQuery from './EventListings.graphql';
import { EventListings } from './EventListings';
import { useQuery } from '@apollo/react-hooks';
import { Loader } from '../../../components/Loader';
import {
  setBrandingPeriod,
  useWhatsOnThemingContext,
} from '../WhatsOnBrandingContext';
import { GetAllEventsWithFilterQuery } from '../../../generated/graphql';

interface OwnProps {
  disableHeader: boolean;
  filter: any; // todo
}

export type EventsListProps = OwnProps;

const EventsList: React.FC<EventsListProps> = ({ filter }) => {
  const dispatch = useWhatsOnThemingContext()[1];
  useEffect(() => {
    dispatch(setBrandingPeriod(null));
  }, [dispatch]);
  const [now] = useState(new Date());
  const { data, loading } = useQuery<GetAllEventsWithFilterQuery>(
    EventListingsQuery,
    {
      variables: {
        skipEmbargo:
          typeof window !== 'undefined' &&
          window.location.hash === '#skip-embargo',
        filter: filter || {
          fromTime: startOfDay(now).toISOString(),
          toTime: addMonths(startOfDay(now), 6).toISOString(),
        },
      },
    },
  );

  if (loading) {
    return <Loader dark />;
  }

  if (!data) {
    return <h1>404</h1>;
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{`What's on | Sussex Students' Union`}</title>
      </Helmet>

      <EventListings events={data.allEvents} removePast={true} />
    </React.Fragment>
  );
};

export { EventsList };
