import React from 'react';
import PropTypes from 'prop-types';

const AnodyneMenuItem = ({ name, link }) =>
  <li className="AnodyneMenu__item">
    <a className="AnodyneMenu__link" href={link}>
      {name}
    </a>
  </li>;

AnodyneMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const AnodyneMenu = () =>
  <nav className="AnodyneMenu">
    <ul className="AnodyneMenu__list">
      <AnodyneMenuItem name="Get involved" link="/get-involved" />
      <AnodyneMenuItem name="What's on" link="/whats-on" />
      <AnodyneMenuItem name="About us" link="/about-us" />
      <AnodyneMenuItem name="Support" link="/support" />
    </ul>
  </nav>;

export default AnodyneMenu;
