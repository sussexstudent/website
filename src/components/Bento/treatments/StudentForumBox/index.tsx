import React from 'react';
import FauxLink from '~components/FauxLink';
import { OneImage, OneImageBackground } from '~components/OneImage';

interface IProps {}

const StudentForumBox: React.SFC<IProps> = () => (
  <div className="BentoBox">
    <OneImageBackground
      src="original_images/6b1d022261d648a199e3a3607705e559"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '300px',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
      }}
    >
      <FauxLink href="/whats-on/sussex-student-forums-2018-2133" />
      <div
        style={{
          width: '100%',
          maxWidth: '340px',
          display: 'block',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        <OneImage
          src="original_images/b2f0101a0cce4daba48e4c0503b60066"
          alt="Student Forum, October 17th"
          aspectRatio={{ width: 542, height: 346 }}
        />
      </div>
    </OneImageBackground>
  </div>
);

export { StudentForumBox };
