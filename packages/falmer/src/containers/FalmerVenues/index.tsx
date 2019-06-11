import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FalmerVenueList from './FalmerVenuesList';

const FalmerVenues: React.FC = () => (
  <div>
    <Switch>
      <Route path="" exact component={FalmerVenueList} />
    </Switch>
  </div>
);

export default FalmerVenues;
