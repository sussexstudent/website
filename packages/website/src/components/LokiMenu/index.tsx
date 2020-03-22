import React from 'react';
import { InternalAppLink } from '../InternalAppLink';

interface PropsItem {
  name: string;
  link: string;
}

const LokiMenuItem: React.FC<PropsItem> = ({ name, link }) => (
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
        <LokiMenuItem name="Vote" link="/elections/" />
      </ul>
    </nav>
  );
};
