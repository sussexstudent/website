import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FalmerEventsList from './FalmerEventsList';
import FalmerEventsDetail from './FalmerEventsDetail';
import FalmerVenues from '../FalmerVenues';
import FalmerEventPeriods from '../FalmerEventPeriods';
import CreateEvent from "~falmer/containers/FalmerEvents/CreateEvent";

function FalmerEvents() {
  return (
    <div>
      <Switch>
        <Route path="/events" exact component={FalmerEventsList} />
        <Route path="/events/new" exact component={CreateEvent} />
        <Route path="/events/venues" exact component={FalmerVenues} />
        <Route path="/events/periods" exact component={FalmerEventPeriods} />
        <Route path="/events/:eventId" component={FalmerEventsDetail} />
      </Switch>
    </div>
  );
}

export default FalmerEvents;
