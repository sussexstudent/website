import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from './logo.svg';

import sections from '../../pages';

import './SidebarMenu.css';
import './Menu.css';

function SidebarMenu() {
  return (
    <div className="SidebarMenu">
      <Link to="/">
        <img src={logo} className="SidebarMenu__logo" alt="Students' Union" />
      </Link>
      <span className="SidebarMenu__tag">Style Guidelines & Pattern Library</span>

      <ol className="Menu">
        {sections.map(section => (
          <li className="Menu__item" key={section.name}>
            <span className="Menu__header">{section.name}</span>
            <ol className="Menu__sub-menu">
              {section.pages.map(page => (
                <li className="Menu__sub-item" key={page.slug}>
                  <NavLink
                    className="Menu__sub-link"
                    activeClassName="Menu__sub-link--active"
                    to={`/${section.slug}/${page.slug}`}
                  >
                    {page.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
      <div className="SidebarMenu__fix-bottom">
        <Link className="Button" to="/editor">Create a page</Link>
      </div>
    </div>
  );
}

export default SidebarMenu;
