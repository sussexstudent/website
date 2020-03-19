import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import startOfDay from 'date-fns/startOfDay';
import addMonths from 'date-fns/addMonths';
import EventListingsQuery from './EventListings.graphql';
import {
  WhatsOnEventsList,
  WhatsOnEventsListSkeleton,
} from './WhatsOnEventsList';
import { useQuery } from '@apollo/react-hooks';
import {
  setBrandingPeriod,
  useWhatsOnThemingContext,
} from '../WhatsOnBrandingContext';
import { GetAllEventsWithFilterQuery } from '../../../generated/graphql';
import { useEventFilterCapture } from './filtering';
import { whatsOnListingViews } from './views';
import { Switch, Route } from 'react-router';
import {BannerOutlet} from "../../../components/BannerOutlet";

interface OwnProps {
  disableHeader: boolean;
  filter: any; // todo
  brandSlug?: string;
  bundleSlug?: string;
}

export type EventsListProps = OwnProps;

export const WhatsOnListings: React.FC<EventsListProps> = () => {
  const dispatch = useWhatsOnThemingContext()[1];
  useEffect(() => {
    dispatch(setBrandingPeriod(null));
  }, [dispatch]);
  const [now] = useState(new Date());
  const filter = useEventFilterCapture();

  const { data, loading } = useQuery<GetAllEventsWithFilterQuery>(
    EventListingsQuery,
    {
      variables: {
        skipEmbargo:
          typeof window !== 'undefined' &&
          window.location.hash === '#skip-embargo',
        filter: {
          ...filter,
          fromTime: startOfDay(now).toISOString(),
          toTime: addMonths(startOfDay(now), 6).toISOString(),
        },
      },
    },
  );

  return (
    <React.Fragment>
      <Helmet>
        <title>{`What's on | Sussex Students' Union`}</title>
      </Helmet>
      <BannerOutlet outlet="events.listings.top" container={({ children }) => <div css={{ maxWidth: 900, marginTop: '1rem', padding: '0 1rem', marginLeft: 'auto', marginRight: 'auto' }}>{children}</div>} />
      <Switch>
        {whatsOnListingViews.map((view) => (
          <Route path={view.path} component={view.header} exact={view.exact} />
        ))}
      </Switch>

      {/*<h1>{filter ? JSON.stringify(filter) : 'All events'}</h1>*/}
      {/*<h2>Showing {data.allEvents.edges.length} events</h2>*/}

      {loading ? (
        <WhatsOnEventsListSkeleton />
      ) : (
        <WhatsOnEventsList
          loading={loading}
          events={data?.allEvents.edges ?? []}
          removePast={true}
        />
      )}
    </React.Fragment>
  );
};
