import React from 'react';
import { EventListings } from '~website/containers/EventsCalender/EventListings';
import Helmet from 'react-helmet';
import EventListingsBrandingPeriodQuery from './EventListingsBrandingPeriod.graphql';
import { ErrorState } from '~components/ErrorState';
import { RouteComponentProps } from 'react-router';
import { useQuery } from 'react-apollo-hooks';
import Loader from '~components/Loader';

interface Props extends RouteComponentProps<{ brandSlug: string }> {
  filter: any;
}

export const EventBrandingPeriod: React.FC<Props> = ({
  match: {
    params: { brandSlug },
  },
}) => {
  const { data, loading, error } = useQuery(EventListingsBrandingPeriodQuery, {
    variables: {
      brandSlug,
      filter: {
        brand: brandSlug,
      },
    },
  });

  if (loading) {
    return <Loader dark />;
  }

  if (error || !data) {
    return <ErrorState />;
  }

  const { allEvents, brandingPeriod } = data;

  return (
    <div className="LokiContainer">
      <Helmet>
        <title>{`${
          brandingPeriod.name
        } | What's on | Sussex Students' Union`}</title>
      </Helmet>
      <h2 className="type-brevier">Event Period</h2>
      <div>
        {brandingPeriod.logoVector ? (
          <img src={brandingPeriod.logoVector.resource} height="160" />
        ) : (
          <h1>{brandingPeriod.name}</h1>
        )}
        <div
          className="type-body-copy"
          dangerouslySetInnerHTML={{ __html: brandingPeriod.description }}
        />
      </div>

      <EventListings events={allEvents} removePast={!brandSlug} />
    </div>
  );
};
