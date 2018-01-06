import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'recompose';
import EventDetailPage from "~components/EventDetailPage";
import HydroLeaf from "~components/HydroLeaf";
import {EventsContainer} from "~components/EventsCalender";

const EventsApplication = () => (
  <Switch>
    <Route path="/whats-on/" exact component={EventsContainer} />
    <Route
      path="/whats-on/period/:brandSlug"
      exact
      component={EventsContainer}
    />
    <Route
      path="/whats-on/collection/:brandSlug"
      exact
      component={EventsContainer}
    />
    <Route path="/whats-on/**-:eventId" component={EventDetailPage} />
    <Route path="/whats-on/:eventId" component={EventDetailPage} />
  </Switch>
);

export default compose(HydroLeaf({ disableSSR: true }))(EventsApplication);
