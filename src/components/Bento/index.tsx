import React from 'react';
import { BentoBoxImpulse } from '~components/Bento/BentoBoxImpulse';
import {HighlightTextBox} from "~components/Bento/treatments/HighlightTextBox";
import {StudentAwardsBox} from "~components/Bento/treatments/StudentAwardsBox";

const Bento: React.SFC<{}> = () => (
  <div className="Bento Trail">
    <div className="Trail__row Trail__row--21 Bento__main-row">
      <StudentAwardsBox />
      <HighlightTextBox link="https://www.surveymonkey.co.uk/r/MW22Y5Y" imageUrl="original_images/e8236f9aa8194f56a17b90764bd6aadd" heading="Rate the union in our survey"/>
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
