import React from 'react';
import { Helmet } from 'react-helmet-async';
import getVenueBySlug from './WhatsOnVenueHeader.graphql';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { GetVenueBySlugQuery } from '../../../generated/graphql';

export const WhatsOnListingsVenueHeader: React.FC = () => {
  const { venueSlug } = useParams();

  const { data, loading, error } = useQuery<GetVenueBySlugQuery>(
    getVenueBySlug,
    {
      variables: {
        slug: venueSlug,
      },
    },
  );

  if (loading || error || !data || !data.venue) {
    return null;
  }

  return (
    <div css={{ padding: '0 1rem' }}>
      <Helmet>
        <title>{`${data.venue.name} | What's on`}</title>
      </Helmet>

      <div>
        <h2>{data.venue.name}</h2>
      </div>
    </div>
  );
};
