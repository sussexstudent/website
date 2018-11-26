import React from 'react';
import { BentoBoxImpulse } from '~components/Bento/BentoBoxImpulse';
import {VoteNowBox} from "~components/Bento/treatments/VoteNowBox";

const Bento: React.SFC<{}> = () => (
  <div className="Bento Trail">
    <div className="Trail__row">
      <VoteNowBox
        link="/vote"
        imageUrl="original_images/23748e8e475049fe8e49162ccd827b44"
        votingStartsDate={new Date(2018, 10, 27, 9, 0,0)}
        votingEndsDate={new Date(2018, 10, 30, 17, 0,0)}
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
