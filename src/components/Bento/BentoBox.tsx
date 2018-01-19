import React from 'react';

interface IProps {
  link: string;
}

const BentoBox: React.SFC<IProps> = (props) => (
  <a className="BentoBox BentoBox--anchor" href={props.link}>
    {props.children}
  </a>
);

export { BentoBox };
