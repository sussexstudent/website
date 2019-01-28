import React from 'react';
import { InternalAppLink } from '~components/InternalAppLink';

interface IProps {
  link: string;
  color: 'blue' | 'red' | 'green' | 'yellow';
}

const BentoBoxImpulse: React.FC<IProps> = (props) => (
  <InternalAppLink
    className={`type-great-primer BentoBox BentoBox--anchor BentoBox--impulse BentoBox--color-${
      props.color
    }`}
    to={props.link}
  >
    {props.children}
  </InternalAppLink>
);

export { BentoBoxImpulse };
