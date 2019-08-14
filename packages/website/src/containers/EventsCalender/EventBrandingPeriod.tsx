import React, { useEffect } from 'react';
import { EventListings } from './EventListings';
import Helmet from 'react-helmet';
import EventListingsBrandingPeriodQuery from './EventListingsBrandingPeriod.graphql';
import { ErrorState } from '../../components/ErrorState';
import { RouteComponentProps } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import Loader from '../../components/Loader';
import {
  setBrandingPeriod,
  useWhatsOnThemingContext,
} from '../EventsApplication/WhatsOnBrandingContext';
import { BrandingPeriodHeader } from '../EventsApplication/branding/components';

export interface EventBrandingPeriodProps
  extends RouteComponentProps<{ brandSlug: string }> {
  filter: any;
}

export const EventBrandingPeriod: React.FC<EventBrandingPeriodProps> = ({
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
  const dispatch = useWhatsOnThemingContext()[1];
  console.log(brandSlug);
  useEffect(() => {
    dispatch(setBrandingPeriod(brandSlug));
    console.log(setBrandingPeriod(brandSlug));
  }, [brandSlug]);

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
        <title>{`${brandingPeriod.name} | What's on | Sussex Students' Union`}</title>
      </Helmet>

      <BrandingPeriodHeader brandingPeriod={brandingPeriod} />

      <EventListings events={allEvents} removePast={!brandSlug} />
    </div>
  );
};
