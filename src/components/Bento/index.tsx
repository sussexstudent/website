import React from 'react';
import { BentoBoxImpulse } from '~components/Bento/BentoBoxImpulse';
import { HighlightTextBox } from '~components/Bento/treatments/HighlightTextBox';
import {VoteNowBox} from "~components/Bento/treatments/VoteNowBox";

const Bento: React.SFC<{}> = () => (
  <div className="Bento Trail">
    <div className="Trail__row Trail__row--21 Bento__main-row">
      <VoteNowBox link="/vote"         imageUrl="original_images/23748e8e475049fe8e49162ccd827b44"
                  targetDate={new Date(2018, 9, 8, 12, 0,0)}
      />
      <HighlightTextBox
        link="/services/outlets"
        imageUrl="original_images/4d4bc630d3594762a9e9ec4ac7208fd0"
        heading="See our outlets"
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
