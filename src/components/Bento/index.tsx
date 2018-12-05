import React from 'react';
import { BentoBoxImpulse } from '~components/Bento/BentoBoxImpulse';
// import {F18Box} from "~components/Bento/treatments/F18Box";

const Bento: React.SFC<{}> = () => (
  <div className="Bento Trail">
    {/*<div className="Trail__row">*/}
      {/*<F18Box link={"/freshers"} />*/}
    {/*</div>*/}
    <div className="Trail__row Trail__row--111">
      <BentoBoxImpulse link="/sport-societies-media/discover" color="blue">
        Discover student groups
      </BentoBoxImpulse>
      <BentoBoxImpulse link="/whats-on" color="green">
        See what's on
      </BentoBoxImpulse>
      <BentoBoxImpulse link="/book-market" color="yellow">
        Buy and sell books in the Book Market
      </BentoBoxImpulse>
    </div>
  </div>
);

export { Bento };
