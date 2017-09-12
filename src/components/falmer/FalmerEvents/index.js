import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FalmerEventsList from '../FalmerEventsList';
import FalmerEventsDetail from '../FalmerEventsDetail';

function FalmerEvents() {
  return (
    <div>
      <Switch>
        <Route path="/events" exact component={FalmerEventsList} />
        <Route path="/events/:eventId" component={FalmerEventsDetail} />
      </Switch>
    </div>
  );
}

export default FalmerEvents;
