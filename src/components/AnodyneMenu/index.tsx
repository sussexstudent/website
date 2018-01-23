import React from 'react';
import cx from 'classnames';
import { MenuItem } from '../../types/skeleton';

interface IPropsItem {
  name: string;
  link: string;
  active: boolean;
}

const AnodyneMenuItem = ({ name, link, active }: IPropsItem) => (
  <li className="AnodyneMenu__item">
    <a
      className={cx('AnodyneMenu__link', {
        'AnodyneMenu__link--active': active,
      })}
      href={link}
    >
      {name}
    </a>
  </li>
);

interface IProps {
  activeItem?: MenuItem | null;
}

const AnodyneMenu = ({ activeItem }: IProps) => (
  <nav className="AnodyneMenu">
    <ul className="AnodyneMenu__list">
      <AnodyneMenuItem
        name="Get involved"
        link="/get-involved/"
        active={activeItem === MenuItem.GetInvolved}
      />
      <AnodyneMenuItem
        name="What's on"
        link="/whats-on/"
        active={activeItem === MenuItem.WhatsOn}
      />
      <AnodyneMenuItem
        name="About us"
        link="/about-us/"
        active={activeItem === MenuItem.AboutUs}
      />
      <AnodyneMenuItem
        name="Support"
        link="/support/"
        active={activeItem === MenuItem.Support}
      />
    </ul>
  </nav>
);

export default AnodyneMenu;
