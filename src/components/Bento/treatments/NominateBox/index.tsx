import React from 'react';
import titleUrl from './front.file.svg';
import FauxLink from '~components/FauxLink';
import { OneImageBackground } from '~components/OneImage';

interface IProps {}

const NominateBox: React.FC<IProps> = () => (
  <div className="BentoBox">
    <OneImageBackground
      className="BentoBox__background-image"
      src={'original_images/20712b59dc714277875f473164cfbb8b'}
    >
      <FauxLink href="/itcouldbeme" />
      <img
        src={titleUrl}
        alt="You could lead the students' union"
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

export { NominateBox };
