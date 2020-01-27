import React from 'react';
import { Helmet } from 'react-helmet-async';
import WhatsOnGroupHeaderQuery from './WhatsOnGroupHeader.graphql';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { GetStudentGroupBySlugQuery } from '../../../generated/graphql';

export const WhatsOnListingsGroupHeader: React.FC = () => {
  const { groupSlug } = useParams();

  const { data, loading, error } = useQuery<GetStudentGroupBySlugQuery>(
    WhatsOnGroupHeaderQuery,
    {
      variables: {
        slug: groupSlug,
      },
    },
  );

  if (loading || error || !data || !data.group) {
    return null;
  }

  return (
    <div css={{ padding: '0 1rem' }}>
      <Helmet>
        <title>{`${data.group.name} | What's on`}</title>
      </Helmet>

      <div>
        <h2>{data.group.name}</h2>
      </div>
    </div>
  );
};
