import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const AnodyneMenuItem = ({ name, link, active }) => (
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

AnodyneMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const AnodyneMenu = ({ activeItem }) => (
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
