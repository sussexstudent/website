import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FalmerEventsList from './FalmerEventsList';
import FalmerEventsDetail from './FalmerEventsDetail';
import FalmerVenues from '../FalmerVenues';
import FalmerEventPeriods from '../FalmerEventPeriods';

export const FalmerEvents: React.FC = () => (
  <div>
    <Switch>
      <Route path="/events" exact component={FalmerEventsList} />
      <Route path="/events/venues" exact component={FalmerVenues} />
      <Route path="/events/periods" exact component={FalmerEventPeriods} />
      <Route path="/events/:eventId" component={FalmerEventsDetail} />
    </Switch>
  </div>
);
