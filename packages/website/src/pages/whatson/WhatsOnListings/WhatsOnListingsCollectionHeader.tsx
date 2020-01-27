import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import BrandingPeriodQuery from './BrandingPeriod.graphql';
import { ErrorState } from '../../../components/ErrorState';
import { useQuery } from '@apollo/react-hooks';
import { Loader } from '../../../components/Loader';
import {
  setBrandingPeriod,
  useWhatsOnThemingContext,
} from '../WhatsOnBrandingContext';
import { BrandingPeriodHeader, BundleBanner } from '../branding/components';
import { GetBrandingPeriodQuery } from '../../../generated/graphql';
import { useParams } from 'react-router-dom';

export const WhatsOnListingsCollectionHeader: React.FC = () => {
  const { brandSlug } = useParams();

  const {
    data: brandData,
    loading: brandLoading,
    error: brandError,
  } = useQuery<GetBrandingPeriodQuery>(BrandingPeriodQuery, {
    variables: {
      brandSlug,
    },
  });

  const dispatch = useWhatsOnThemingContext()[1];

  useEffect(() => {
    dispatch(setBrandingPeriod(brandSlug || ''));
  }, [brandSlug, dispatch]);

  if (brandLoading) {
    return <Loader dark />;
  }

  if (brandError || !brandData) {
    return <ErrorState />;
  }

  const { brandingPeriod } = brandData;

  return (
    <div css={{ padding: '0 1rem' }}>
      <Helmet>
        <title>{`${brandingPeriod.name} | What's on`}</title>
      </Helmet>

      <BrandingPeriodHeader brandingPeriod={brandingPeriod} />

      {brandingPeriod.bundleSet && brandingPeriod.bundleSet.length > 0 ? (
        <BundleBanner bundle={brandingPeriod.bundleSet[0]} onEvent={false} />
      ) : null}
    </div>
  );
};
