import React from 'react';
import FauxLink from '~components/FauxLink';
import { OneImage, OneImageBackground } from '~components/OneImage';

interface IProps {}

const ThisGirlCanBox: React.SFC<IProps> = () => (
  <div className="BentoBox">
    <OneImageBackground
      src="original_images/e0a9095d06d54f3d95a38fc8f030a079"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '300px',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
      }}
    >
      <FauxLink href="/organisation/activeus/" />
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
          src="original_images/74fdd5374ed74d6ab8376d6d054778f2"
          alt="This Girl Can Week"
          aspectRatio={{ width: 1801, height: 1280 }}
        />
      </div>
    </OneImageBackground>
  </div>
);

export { ThisGirlCanBox };
