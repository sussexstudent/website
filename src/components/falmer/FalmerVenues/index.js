import React from 'react';
import FalmerSplash from '../FalmerSplash';

import venueImage from './venue.svg';

function FalmerVenues() {
  return (
    <FalmerSplash
      image={venueImage}
      text="Venue management within Falmer is coming soon."
    />
  );
}

export default FalmerVenues;
