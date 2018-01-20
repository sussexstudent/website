import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'recompose';
import EventDetailPage from '~components/EventDetailPage';
import HydroLeaf from '~components/HydroLeaf';
import { EventsList, EventsBrandingPeriod } from '~components/EventsCalender';

const EventsApplication = () => (
  <div className="u-keep-footer-down">
    <Switch>
      <Route path="/whats-on/" exact component={EventsList} />
      <Route
        path="/whats-on/period/:brandSlug"
        exact
        component={EventsBrandingPeriod}
      />
      <Route
        path="/whats-on/collection/:brandSlug"
        exact
        component={EventsBrandingPeriod}
      />
      <Route path="/whats-on/**-:eventId" component={EventDetailPage} />
      <Route path="/whats-on/:eventId" component={EventDetailPage} />
    </Switch>
  </div>
);

export default compose(HydroLeaf({ disableSSR: true }))(EventsApplication);
