import React from 'react';
import { FalmerSplash } from '../../components/FalmerSplash';

import AwardImage from '~icons/award.svg';

function FalmerGroupAwards() {
  return (
    <FalmerSplash
      image={<AwardImage />}
      text="Group Awards within Falmer is coming soon."
    />
  );
}

export default FalmerGroupAwards as any;
