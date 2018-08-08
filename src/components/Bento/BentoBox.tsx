import React from 'react';
import { InternalAppLink } from '~components/InternalAppLink';

interface IProps {
  link: string;
}

const BentoBox: React.SFC<IProps> = (props) => (
  <InternalAppLink className="BentoBox BentoBox--anchor" to={props.link}>
    {props.children}
  </InternalAppLink>
);

export { BentoBox };
