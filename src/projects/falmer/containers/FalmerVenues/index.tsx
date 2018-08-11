import React from 'react';
import { Router } from '@reach/router';
import FalmerVenueList from './FalmerVenuesList';
import { SimpleLoadableRoute } from '~types/routes';

function FalmerVenues() {
  return (
    <div>
      <Router>
        <FalmerVenueList path="/" exact />
      </Router>
    </div>
  );
}

export default FalmerVenues as SimpleLoadableRoute;
