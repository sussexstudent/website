import React, { useEffect } from 'react';
import { EventListings } from './EventListings';
import { Helmet } from 'react-helmet-async';
import BrandingPeriodQuery from './BrandingPeriod.graphql';
import EventListingsQuery from './EventListings.graphql';
import { ErrorState } from '../../../components/ErrorState';
import { RouteComponentProps } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { Loader } from '../../../components/Loader';
import {
  setBrandingPeriod,
  useWhatsOnThemingContext,
} from '../WhatsOnBrandingContext';
import { BrandingPeriodHeader, BundleBanner } from '../branding/components';
import { getFirstItemOrValue } from '@ussu/common/src/libs/qs';
import qs from 'query-string';
import { pickBy, mapValues } from 'lodash';
import { isAfter, max } from 'date-fns';

export interface EventBrandingPeriodProps
  extends RouteComponentProps<{ brandSlug: string }> {
  filter: any;
}
const filteringAcceptions = [
  'audienceJustForPgs',
  'audienceSuitableKidsFamilies',
  'audienceGoodToMeetPeople',
  'cost',
  'isOver18Only',
  'ticketLevel',
];

const filteringReplacements: { [k: string]: any } = {
  true: true,
  false: false,
  null: null,
};

export const EventBrandingPeriod: React.FC<EventBrandingPeriodProps> = ({
  match: {
    params: { brandSlug },
  },
}) => {
  const filtering = location
    ? pickBy(
        getFirstItemOrValue(qs.parse(location.search)),
        (_v, k) => filteringAcceptions.indexOf(k) >= 0,
      )
    : {};

  const {
    data: brandData,
    loading: brandLoading,
    error: brandError,
  } = useQuery(BrandingPeriodQuery, {
    variables: {
      brandSlug,
    },
  });
  const {
    data: listingsData,
    loading: listingsLoading,
    error: listingsError,
  } = useQuery(EventListingsQuery, {
    variables: {
      filter: {
        brand: brandSlug,
        ...mapValues(filtering, (v) =>
          filteringReplacements.hasOwnProperty(v)
            ? filteringReplacements[v]
            : v,
        ),
      },
    },
  });
  const dispatch = useWhatsOnThemingContext()[1];

  useEffect(() => {
    dispatch(setBrandingPeriod(brandSlug));
  }, [brandSlug]);

  if (brandLoading || listingsLoading) {
    return <Loader dark />;
  }

  if (brandError || !brandData || !listingsData) {
    return <ErrorState />;
  }

  const { brandingPeriod } = brandData;
  const { allEvents } = listingsData;

  const latestDate = max(
    allEvents.edges.map((e: any) => new Date(e.node.endTime)),
  );

  return (
    <div className="LokiContainer">
      <Helmet>
        <title>{`${brandingPeriod.name} | What's on | Sussex Students' Union`}</title>
      </Helmet>

      <BrandingPeriodHeader brandingPeriod={brandingPeriod} />

      {listingsLoading ? (
        <Loader dark />
      ) : listingsData && !listingsError ? (
        <EventListings
          events={allEvents}
          removePast={!isAfter(new Date(), latestDate)}
        />
      ) : (
        <ErrorState />
      )}

      {brandingPeriod.bundleSet && brandingPeriod.bundleSet.length > 0 ? (
        <BundleBanner bundle={brandingPeriod.bundleSet[0]} onEvent={false} />
      ) : null}
    </div>
  );
};
