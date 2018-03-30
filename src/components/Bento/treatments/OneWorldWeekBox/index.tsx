import React from 'react';
import titleUrl from './front.file.svg';
import FauxLink from '~components/FauxLink';
import { OneImageBackground } from '~components/OneImage';

interface IProps {}

const OneWorldWeekBox: React.SFC<IProps> = () => (
  <div className="BentoBox">
    <OneImageBackground
      className="BentoBox__background-image"
      src={'original_images/09a425e7ef7745d4aa148caab5f9aaec'}
    >
      <FauxLink href="/oww" />
      <img
        src={titleUrl}
        alt="One World Week 2018"
        style={{
          width: '100%',
          maxWidth: '400px',
          display: 'block',
          margin: '0 auto',
        }}
      />
    </OneImageBackground>
  </div>
);

export { OneWorldWeekBox };
