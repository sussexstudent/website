import React from 'react';
import { Link } from 'react-router';
import logo from './logo.svg';

import sections from '../../pages';

import './SidebarMenu.css';
import './Menu.css';

function SidebarMenu() {
  console.log(sections);
  return (
    <div className="SidebarMenu">
      <Link to="/">
        <img src={logo} className="SidebarMenu__logo" alt="Students' Union" />
      </Link>
      <span className="SidebarMenu__tag">a style guide</span>

      <ol className="Menu">
        {sections.map(section => (
          <li className="Menu__item" key={section.name}>
            <span className="Menu__header">{section.name}</span>
            <ol className="Menu__sub-menu">
              {section.pages.map(page => (
                <li className="Menu__sub-item" key={page.slug}>
                  <Link className="Menu__sub-link" to={`/${section.slug}/${page.slug}`}>{page.title}</Link>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default SidebarMenu;
