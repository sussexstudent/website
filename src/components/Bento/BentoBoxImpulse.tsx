import React from 'react';

interface IProps {
  link: string;
  color: 'blue' | 'red' | 'green' | 'yellow';
}

const BentoBoxImpulse: React.SFC<IProps> = (props) => (
  <a className={`type-great-primer BentoBox BentoBox--anchor BentoBox--impulse BentoBox--color-${props.color}`} href={props.link}>
    {props.children}
  </a>
);

export { BentoBoxImpulse };
