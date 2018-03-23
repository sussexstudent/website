import React from 'react';
import FauxLink from '~components/FauxLink';
import {AspectRatio, OneImage} from "~components/OneImage";

interface IProps {
}

const StudentAwardsBox: React.SFC<IProps> = () => (
  <div
    className="BentoBox"
  >
    <FauxLink href="/studentawards" />
    <div
      style={{
        width: '100%',
        maxWidth: '240px',
        display: 'block',
        margin: '0 auto',
      }}
    >
      <OneImage
        src="original_images/c2779f6253be4e929212b91947e8f721"
        alt="Student Awards"
        aspectRatio={AspectRatio.r1by1}
      />
    </div>
  </div>
);

export { StudentAwardsBox };
