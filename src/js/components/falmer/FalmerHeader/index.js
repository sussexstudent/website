import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function FalmerHeader({ user }) {
  return (
    <header className="FalmerHeader">
      <h1 className="FalmerHeader__logotype">Falmer</h1>
      <nav className="FalmerHeader__nav">
        <ul className="FalmerHeader__nav-list">
          <li className="FalmerHeader__nav-item">
            <Link to="/content">Content</Link>
          </li>
          <li className="FalmerHeader__nav-item">
            <Link to="/events">Images</Link>
          </li>
          <li className="FalmerHeader__nav-item">
            <Link to="/events">Events</Link>
          </li>
        </ul>
      </nav>

      <div>
        {user.name || user.identifier}
      </div>
    </header>
  );
}

export default connect(state => ({
  user: state.auth.user,
}))(FalmerHeader);
