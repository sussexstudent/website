import React from 'react';
import { FalmerSplash } from '~falmer/components/FalmerSplash';

import CalenderImage from '~icons/calender.svg';
import { SimpleLoadableRoute } from '~types/routes';

function FalmerEventPeriods() {
  return (
    <FalmerSplash
      image={<CalenderImage />}
      text="Managing Event Branding Periods within Falmer is coming soon."
    />
  );
}

export default FalmerEventPeriods as SimpleLoadableRoute;
