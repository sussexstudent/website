import React from 'react';
import { FalmerSplash } from '../../components/FalmerSplash';

import awardImage from './award.svg';

function FalmerGroupAwards() {
  return (
    <FalmerSplash
      image={awardImage}
      text="Group Awards within Falmer is coming soon."
    />
  );
}

export default FalmerGroupAwards;
