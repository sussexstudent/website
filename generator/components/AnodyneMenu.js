import React from 'react';

const AnodyneMenuItem = ({ name, link }) => (
  <li className="AnodyneMenu__item">
    <a className="AnodyneMenu__link" href={link}>{name}</a>
  </li>
);

AnodyneMenuItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
};

const AnodyneMenu = () => (
  <nav className="AnodyneMenu">
    <ul className="AnodyneMenu__list">
      <AnodyneMenuItem name="Get involved" link="/get-involved" />
      <AnodyneMenuItem name="What's on" link="/events" />
      <AnodyneMenuItem name="About us" link="/about-us" />
      <AnodyneMenuItem name="Support" link="/support" />
    </ul>
  </nav>
);

export default AnodyneMenu;
