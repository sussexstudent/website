import React from 'react';
import { EventListings } from './EventListings';
import Helmet from 'react-helmet';
import EventListingsBrandingPeriodQuery from './EventListingsBundle.graphql';
import { useQuery } from '@apollo/react-hooks';
import Loader from '../../components/Loader';
import { ErrorState } from '../../components/ErrorState';
import { RouteComponentProps } from 'react-router';

export type EventBundleProps = RouteComponentProps<{ bundleSlug: string }>;

export const EventBundle: React.FC<EventBundleProps> = ({
  match: { params: bundleSlug },
}) => {
  const { data, loading, error } = useQuery(EventListingsBrandingPeriodQuery, {
    variables: {
      bundleSlug,
      filter: {
        bundle: bundleSlug,
      },
    },
  });

  if (loading) {
    return <Loader dark />;
  }

  if (error || !data) {
    return <ErrorState />;
  }

  const { allEvents, bundle } = data;

  return (
    <div className="LokiContainer">
      <Helmet>
        <title>{`${bundle.name} | What's on | Sussex Students' Union`}</title>
      </Helmet>
      <h2 className="type-brevier">Event Bundle</h2>
      <h1>{bundle.name}</h1>

      <EventListings events={allEvents} removePast={false} />
    </div>
  );
};
