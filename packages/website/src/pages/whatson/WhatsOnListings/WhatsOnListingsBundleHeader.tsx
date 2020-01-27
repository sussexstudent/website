import React from 'react';
import { WhatsOnEventsList } from './WhatsOnEventsList';
import { Helmet } from 'react-helmet-async';
import EventListingsBrandingPeriodQuery from './EventListingsBundle.graphql';
import { useQuery } from '@apollo/react-hooks';
import { Loader } from '../../../components/Loader';
import { ErrorState } from '../../../components/ErrorState';
import { useParams } from 'react-router';
import { BuyButton } from '../EventDetailPage/BuyButton';
import { type, TypeSize } from '@ussu/basil/src/style/type';
import { GetEventsByBundleSlugQuery } from '../../../generated/graphql';

export const WhatsOnListingsBundleHeader: React.FC = () => {
  const { bundleSlug } = useParams();

  const { data, loading, error } = useQuery<GetEventsByBundleSlugQuery>(
    EventListingsBrandingPeriodQuery,
    {
      variables: {
        bundleSlug,
        filter: {
          bundle: bundleSlug,
        },
      },
    },
  );

  if (loading) {
    return <Loader dark />;
  }

  if (error || !data) {
    return <ErrorState />;
  }

  const { allEvents, bundle } = data;

  return (
    <div css={{ padding: '0 1rem' }}>
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
      <WhatsOnEventsList events={allEvents.edges} removePast={false} />
    </div>
  );
};
