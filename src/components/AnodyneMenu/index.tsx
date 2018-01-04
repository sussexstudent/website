import React from 'react';
import cx from 'classnames';

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
  activeItem: string; // todo: should use enums now in TypeScript
}

const AnodyneMenu = ({ activeItem }: IProps) => (
  <nav className="AnodyneMenu">
    <ul className="AnodyneMenu__list">
      <AnodyneMenuItem
        name="Get involved"
        link="/get-involved"
        active={activeItem === 'GET_INVOLVED'}
      />
      <AnodyneMenuItem
        name="What's on"
        link="/whats-on"
        active={activeItem === 'WHATS_ON'}
      />
      <AnodyneMenuItem
        name="About us"
        link="/about-us"
        active={activeItem === 'ABOUT_US'}
      />
      <AnodyneMenuItem
        name="Support"
        link="/support"
        active={activeItem === 'SUPPORT'}
      />
    </ul>
  </nav>
);

export default AnodyneMenu;
