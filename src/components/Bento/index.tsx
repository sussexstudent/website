import React from 'react';
import { BentoBoxImpulse } from '~components/Bento/BentoBoxImpulse';
import { HighlightTextBox } from '~components/Bento/treatments/HighlightTextBox';
import { F18Box } from '~components/Bento/treatments/F18Box';

const Bento: React.SFC<{}> = () => (
  <div className="Bento Trail">
    <div className="Trail__row Trail__row--21 Bento__main-row">
      <F18Box link={'/freshers'} />
      <HighlightTextBox
        link="/eastslope"
        imageUrl="original_images/1aa86c330010462297bac8ee679b5aa3"
        heading="East Slope Merchandise available now!"
      />
    </div>
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
