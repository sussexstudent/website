import React from 'react';
import { NavLink } from 'react-router-dom';

function FreshersNav() {
  return (
    <nav className="FreshersNav">
      <ul className="FreshersNav__list">
        <li className="FreshersNav__item">
          <NavLink
            className="FreshersNav__link"
            activeClassName="FreshersNav__link--active"
            exact
            to="/"
          >
            Overview
          </NavLink>
        </li>
        <li className="FreshersNav__item">
          <NavLink
            className="FreshersNav__link"
            activeClassName="FreshersNav__link--active"
            to="/whats-on"
          >
            {"What's on"}
          </NavLink>
        </li>
        <li className="FreshersNav__item">
          <NavLink
            className="FreshersNav__link"
            activeClassName="FreshersNav__link--active"
            to="/guides"
          >
            Guides
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default FreshersNav;
