import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { RootState } from '@ussu/common/src/types/falmer';
import StudentsUnionLogoNoLogotype from '@ussu/common/src/icons/students-union-logo-no-logotype.svg';
import { useMappedState } from 'redux-react-hook';
import { type, Typeface, TypeSize } from '@ussu/basil/src/style/type';
import { css } from '@emotion/core';

const logotypeStyle = css({
  margin: 0,
  ...type(TypeSize.Pica, Typeface.Secondary, true),
});

const FalmerHeader: React.FC = () => {
  const mapState = useCallback(
    (state: RootState) => ({
      user: state.auth.user,
    }),
    [],
  );

  const { user } = useMappedState(mapState);

  return (
    <header className="FalmerHeader">
      <div
        className="FalmerHeader__logo-link"
        style={{ color: '#333' }}
        title="Sussex Students' Union"
      >
        <StudentsUnionLogoNoLogotype />
        <span className="u-h">{`Sussex Students' Union`}</span>
      </div>
      <h1 css={logotypeStyle}>Falmer</h1>
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
          <li className="FalmerHeader__nav-item">
            <NavLink
              to="/media"
              activeClassName="FalmerHeader__nav-link--active"
            >
              Images
            </NavLink>
          </li>
          {user.isStaff ? (
            <li className="FalmerHeader__nav-item">
              <NavLink
                to="/featured-areas"
                activeClassName="FalmerHeader__nav-link--active"
              >
                Featured Areas
              </NavLink>
            </li>
          ) : null}
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

export default FalmerHeader;
