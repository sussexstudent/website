import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'recompose';
import HydroLeaf from '~components/HydroLeaf';
import Loadable from 'react-loadable';
import { LoadableLoading } from '~components/LoadableLoading';

const EventsListLoader = () =>
  import(/* webpackChunkName: "events.listings" */ '~components/EventsCalender');

const LoadableListings = Loadable({
  loading: LoadableLoading,
  loader: EventsListLoader,
  render({ EventsList }: { EventsList: any }, props) {
    return <EventsList {...props} />;
  },
});

const LoadableListingsBranding = Loadable({
  loading: LoadableLoading,
  loader: EventsListLoader,
  render({ EventsBrandingPeriod }: { EventsBrandingPeriod: any }, props) {
    return <EventsBrandingPeriod {...props} />;
  },
});

const LoadableDetail = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "events.detail" */ '~components/EventDetailPage'),
});

const EventsApplication = () => (
  <div className="u-keep-footer-down">
    <Switch>
      <Route path="/whats-on/" exact component={LoadableListings} />
      <Route
        path="/whats-on/period/:brandSlug"
        exact
        component={LoadableListingsBranding}
      />
      <Route
        path="/whats-on/collection/:brandSlug"
        exact
        component={LoadableListingsBranding}
      />
      <Route path="/whats-on/**-:eventId" component={LoadableDetail} />
      <Route path="/whats-on/:eventId" component={LoadableDetail} />
    </Switch>
  </div>
);

export default compose(HydroLeaf({ disableSSR: true }))(EventsApplication);
