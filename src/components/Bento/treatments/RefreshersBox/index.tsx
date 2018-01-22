import React from 'react';
import backgroundUrl from './background.file.svg';
import titleUrl from './title.file.svg';
import FauxLink from '~components/FauxLink';

interface IProps {
  link: string;
}

const RefreshersBox: React.SFC<IProps> = () => (
  <div
    className="BentoBox"
    style={{
      backgroundImage: `url(${backgroundUrl})`,
      backgroundRepeat: 'repeat',
      backgroundSize: 'cover',
    }}
  >
    <FauxLink href="/refreshers" />
    <img
      src={titleUrl}
      alt="Refreshers 2018"
      style={{
        width: '80%',
        maxWidth: '400px',
        display: 'block',
        margin: '0 auto',
      }}
    />
  </div>
);

export { RefreshersBox };
