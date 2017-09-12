import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

function FalmerHeader({ user }) {
  return (
    <header className="FalmerHeader">
      <h1 className="FalmerHeader__logotype">Falmer</h1>
      <nav className="FalmerHeader__nav">
        <ul className="FalmerHeader__nav-list">
          <li className="FalmerHeader__nav-item">
            <NavLink
              to="/"
              exact
              activeClassName="FalmerHeader__nav-link--active"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="FalmerHeader__nav-item">
            <NavLink
              to="/events"
              activeClassName="FalmerHeader__nav-link--active"
            >
              Events
            </NavLink>
          </li>
          <li className="FalmerHeader__nav-item">
            <NavLink
              to="/groups"
              activeClassName="FalmerHeader__nav-link--active"
            >
              Groups
            </NavLink>
          </li>
        </ul>
      </nav>

      <div>
        {user.name || user.identifier}
      </div>
    </header>
  );
}

/*
 <li className="FalmerHeader__nav-item">
 <Link to="/content">Content</Link>
 </li>
 <li className="FalmerHeader__nav-item">
 <Link to="/events">Images</Link>
 </li>
 <li className="FalmerHeader__nav-item">
 <Link to="/events">Events</Link>
 </li>
*/

export default withRouter(
  connect(state => ({
    user: state.auth.user,
  }))(FalmerHeader)
);
