import React from 'react';
import { Router } from '@reach/router';
import FalmerEventsList from './FalmerEventsList';
import FalmerEventsDetail from './FalmerEventsDetail';
import FalmerVenues from '../FalmerVenues';
import FalmerEventPeriods from '../FalmerEventPeriods';

function FalmerEvents() {
  return (
    <div>
      <Router>
        <FalmerEventsList path="/" exact />
        <FalmerVenues path="venues" exact />
        <FalmerEventPeriods path="periods" exact />
        <FalmerEventsDetail path=":eventId" />
      </Router>
    </div>
  );
}

export default FalmerEvents;
