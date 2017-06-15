import React from 'react';
import PropTypes from 'prop-types';
import MSLTag from './MSLTag';

const mslLogout = MSLTag('LoginButton', {
  LoginText: 'Log in',
  LogoutText: 'Log out',
  GoHomeOnLogout: 'True',
});

const loggedInList = (
  <ul className="UserBar__list">
    <li className="UserBar__item UserBar__item--welcome" />
    <li
      className="UserBar__item UserBar__item--action"
      dangerouslySetInnerHTML={{ __html: mslLogout }}
    />

    <li className="UserBar__item UserBar__item-admin UserBar__item--empty UserBar__admin-menu">
      <span>Admin</span>
      <div
        className="UserBar__item-dropdown"
        dangerouslySetInnerHTML={{ __html: MSLTag('Admin') }}
      />
    </li>
    <li className="UserBar__item UserBar__item-admin UserBar__item--empty UserBar__admin-control-panel">
      <span>Page</span>
      <div
        className="UserBar__item-dropdown"
        dangerouslySetInnerHTML={{ __html: MSLTag('ControlPanel') }}
      />
    </li>

    <li className="UserBar__item UserBar__item--action UserBar__item--action-highlight">
      <a href="/shop/basket">Basket</a>
    </li>
  </ul>
);

const anonymousList = (
  <ul className="UserBar__list">
    <li className="UserBar__item">Hi there!</li>
    <li className="UserBar__item UserBar__item--action">
      <a href="/login" data-action="login">Log in</a>
    </li>
    <li className="UserBar__item UserBar__item--action UserBar__item--action-highlight">
      <a href="/shop/basket">Basket</a>
    </li>
  </ul>
);

const UserBar = ({ loggedIn }) => (
  <div className="UserBar">
    <div className="Container UserBar__container">
      {loggedIn ? loggedInList : anonymousList}
    </div>
  </div>
);

UserBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default UserBar;
