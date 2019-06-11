import React from 'react';
import { FalmerSplash } from '../../components/FalmerSplash';

import CalenderImage from '@ussu/common/src/icons/calender.svg';

const FalmerEventPeriods: React.FC = () => (
  <FalmerSplash
    image={<CalenderImage />}
    text="Managing Event Branding Periods within Falmer is coming soon."
  />
);

export default FalmerEventPeriods;
