import React from 'react';
import { BentoBoxImpulse } from '~components/Bento/BentoBoxImpulse';
import {HighlightTextBox, HighlightTheme} from '~components/Bento/treatments/HighlightTextBox';
import {CountdownBox} from "~components/Bento/treatments/CountdownBox";

const Bento: React.SFC<{}> = () => (
  <div className="Bento Trail">
    <div className="Trail__row Trail__row--21 Bento__main-row">
      <HighlightTextBox
        link="/elections/candidates/118/"
        imageUrl="original_images/23748e8e475049fe8e49162ccd827b44"
        heading="Meet the candidates"
        theme={HighlightTheme.WhiteOnBlack}
      />
      <CountdownBox
        link="/elections/candidates/118/"
        imageUrl="original_images/4219b2966c1047dd8fe4bfa2aa922c72"
        targetDate={new Date(2018, 2, 19, 9, 0,0)}
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
