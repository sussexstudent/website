import React from 'react';
import cx from 'classnames';
import { MenuItem } from '../../types/skeleton';
import { InternalAppLink } from '~components/InternalAppLink';

interface IPropsItem {
  name: string;
  link: string;
  active: boolean;
}

const LokiMenuItem = ({ name, link, active }: IPropsItem) => (
  <li className="LokiMenu__item">
    <InternalAppLink
      className={cx('LokiMenu__link', {
        'LokiMenu__link--active': active,
      })}
      to={link}
    >
      {name}
    </InternalAppLink>
  </li>
);

interface IProps {
  activeItem?: MenuItem | null;
}

export const LokiMenu = ({ activeItem }: IProps) => (
  <nav className="LokiMenu">
    <ul className="LokiMenu__list">
      <LokiMenuItem
        name="Get involved"
        link="/get-involved/"
        active={activeItem === MenuItem.GetInvolved}
      />
      <LokiMenuItem
        name="What's on"
        link="/whats-on/"
        active={activeItem === MenuItem.WhatsOn}
      />
      <LokiMenuItem
        name="Support"
        link="/support/"
        active={activeItem === MenuItem.Support}
      />
      <LokiMenuItem
        name="About us"
        link="/about-us/"
        active={activeItem === MenuItem.AboutUs}
      />
    </ul>
  </nav>
);
