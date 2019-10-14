import React from 'react';
import { EventListings } from './EventListings';
import { Helmet } from 'react-helmet';
import EventListingsBrandingPeriodQuery from './EventListingsBundle.graphql';
import { useQuery } from '@apollo/react-hooks';
import { Loader } from '../../../components/Loader';
import { ErrorState } from '../../../components/ErrorState';
import { RouteComponentProps } from 'react-router';
import { BuyButton } from '../EventDetailPage/BuyButton';
import { type, TypeSize } from '@ussu/common/src/libs/style/type';

export type EventBundleProps = RouteComponentProps<{ bundleSlug: string }>;

export const EventBundle: React.FC<EventBundleProps> = ({
  match: {
    params: { bundleSlug },
  },
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
      <div css={{ textAlign: 'center' }}>
        <h2 css={[{ marginBottom: 0 }, type(TypeSize.Brevier)]}>
          Event Bundle
        </h2>
        <h1 css={[{ marginTop: 0 }, type(TypeSize.Trafalgar)]}>
          {bundle.name}
        </h1>
      </div>

      {bundle.ticketData ? (
        <BuyButton title="Buy Bundle" href={bundle.ticketData} />
      ) : null}

      <EventListings events={allEvents} removePast={false} />
    </div>
  );
};
