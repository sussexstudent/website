import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FalmerVenueList from './FalmerVenuesList';

function FalmerVenues() {
  return (
    <div>
      <Switch>
        <Route path="" exact component={FalmerVenueList} />
      </Switch>
    </div>
  );
}

export default FalmerVenues;
