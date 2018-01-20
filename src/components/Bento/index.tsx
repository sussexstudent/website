import React from 'react';
import { BentoBox } from '~components/Bento/BentoBox';
import { BentoBoxImpulse } from '~components/Bento/BentoBoxImpulse';

const Bento: React.SFC<{}> = () => (
  <div className="Bento Trail">
    <div className="Trail__row Trail__row--21">
      <BentoBox link="/refreshers">hero 2/3</BentoBox>
      <BentoBox link="/submit-referenda">side 1/3</BentoBox>
    </div>
    <div className="Trail__row Trail__row--111">
      <BentoBoxImpulse link="/whats-on" color="blue">
        See what's on
      </BentoBoxImpulse>
      <BentoBoxImpulse link="/sport-societies-media/discover" color="green">
        Discover student groups
      </BentoBoxImpulse>
      <BentoBoxImpulse link="/outlets" color="yellow">
        Explore our shops and bars
      </BentoBoxImpulse>
    </div>
  </div>
);

export { Bento };
