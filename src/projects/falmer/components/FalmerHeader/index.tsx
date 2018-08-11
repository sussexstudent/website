import React from 'react';
import { connect } from 'react-redux';
import { Link, LinkGetProps } from '@reach/router';
import { FalmerUser, RootState } from '~types/falmer';
import { compose } from 'recompose';
import StudentsUnionLogoNoLogotype from '~icons/students-union-logo-no-logotype.svg';

interface IProps {
  user: FalmerUser;
}

function navProps({ isPartiallyCurrent }: LinkGetProps) {
  return isPartiallyCurrent
    ? {
        className: 'FalmerHeader__nav-link--active',
      }
    : {};
}

const FalmerHeader: React.SFC<IProps> = ({ user }) => {
  return (
    <header className="FalmerHeader">
      <div
        className="FalmerHeader__logo-link"
        style={{ color: '#333' }}
        title="Sussex Students' Union"
      >
        <StudentsUnionLogoNoLogotype />
        <span className="u-h">Sussex Students' Union</span>
      </div>
      <h1 className="FalmerHeader__logotype">Falmer</h1>
      <nav className="FalmerHeader__nav">
        <ul className="FalmerHeader__nav-list">
          <li className="FalmerHeader__nav-item">
            <Link to="/" getProps={navProps}>
              Dashboard
            </Link>
          </li>
          <li className="FalmerHeader__nav-item">
            <Link to="/events" getProps={navProps}>
              Events
            </Link>
          </li>
          <li className="FalmerHeader__nav-item">
            <Link to="/groups" getProps={navProps}>
              Groups
            </Link>
          </li>
          <li className="FalmerHeader__nav-item">
            <Link to="/media" getProps={navProps}>
              Images
            </Link>
          </li>
          <li className="FalmerHeader__nav-item">
            <Link to="/book-market" getProps={navProps}>
              Book Market
            </Link>
          </li>
          {user.hasCmsAccess ? (
            <li className="FalmerHeader__nav-item">
              <a href="/cms">
                Content <small>(Wagtail)</small>
              </a>
            </li>
          ) : null}
          {user.isStaff ? (
            <li className="FalmerHeader__nav-item FalmerHeader__nav-item--secondary">
              <a href="/admin">dj-admin</a>
            </li>
          ) : null}
        </ul>
      </nav>

      <div className="FalmerHeader__user">{user.name || user.identifier}</div>
    </header>
  );
};

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

export default compose<IProps, {}>(
  connect((state: RootState) => ({
    user: state.auth.user,
  })),
)(FalmerHeader);
