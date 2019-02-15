import React from 'react';
import { FalmerSplash } from '~falmer/components/FalmerSplash';

import CalenderImage from '~icons/calender.svg';

const FalmerEventPeriods: React.FC = () => (
  <FalmerSplash
    image={<CalenderImage />}
    text="Managing Event Branding Periods within Falmer is coming soon."
  />
);

export default FalmerEventPeriods;
