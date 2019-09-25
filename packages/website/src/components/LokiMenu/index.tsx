import React from 'react';
import { InternalAppLink } from '../InternalAppLink';

interface IPropsItem {
  name: string;
  link: string;
}

const LokiMenuItem = ({ name, link }: IPropsItem) => (
  <li className="LokiMenu__item">
    <InternalAppLink className="LokiMenu__link" to={link}>
      {name}
    </InternalAppLink>
  </li>
);

export const LokiMenu: React.FC = () => {
  return (
    <nav className="LokiMenu">
      <ul className="LokiMenu__list">
        <LokiMenuItem name="Get involved" link="/get-involved/" />
        <LokiMenuItem name="What's on" link="/whats-on/" />
        <LokiMenuItem name="Support" link="/support/" />
        <LokiMenuItem name="About us" link="/about-us/" />
        <LokiMenuItem name="Freshers" link="/freshers/" />
      </ul>
    </nav>
  );
};
