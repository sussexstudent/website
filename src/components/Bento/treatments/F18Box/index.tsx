import React from 'react';
import titleUrl from './f18-logo.file.svg';
import FauxLink from '~components/FauxLink';

interface IProps {
  link: string;
}

const F18Box: React.SFC<IProps> = () => (
  <div
    className="BentoBox"
    style={{
      backgroundColor: '#1e1c50',
    }}
  >
    <FauxLink href="/freshers" />
    <img
      src={titleUrl}
      alt="Freshers Week 2018"
      style={{
        width: '80%',
        maxWidth: '400px',
        display: 'block',
        margin: '0 auto',
      }}
    />
  </div>
);

export { F18Box };
