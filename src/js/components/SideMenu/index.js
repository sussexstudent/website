import React from 'react';
import cx from 'classnames';
import AnodyneMenu from '../AnodyneMenu';
import SocialMenu from '../SocialMenu';

class SideMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isThisPageOpen: false,
      isAdminOpen: false,
    };

    this.handleAdminToggle = () =>
      this.setState(state => ({ isAdminOpen: !state.isAdminOpen }));

    this.handleThisPageToggle = () =>
      this.setState(state => ({ isThisPageOpen: !state.isThisPageOpen }));
  }

  render() {
    const { isOpen, userData } = this.props;
    const { isAdminOpen, isThisPageOpen } = this.state;

    return (
      <div
        className={cx('Header__side-menu', {
          'Header__side-menu--is-open': isOpen,
        })}
      >
        <AnodyneMenu />
        {userData !== null
          ? <div className="Header__side-container Header__side-menu-user">
              <div>
                Hi {userData.name}!
              </div>
              <ul>
                <li>
                  <button onClick={this.handleAdminToggle}>Admin</button>
                  {isAdminOpen
                    ? <ul>
                        <li>Admin link</li>
                      </ul>
                    : null}
                </li>
                <li>
                  <button onClick={this.handleThisPageToggle}>This Page</button>
                  {isThisPageOpen
                    ? <ul>
                        <li>this page link</li>
                      </ul>
                    : null}
                </li>
                <li>Basket</li>
                <li>Log out</li>
              </ul>
            </div>
          : null}
        <div className="Header__side-container Header__side-menu-social">
          <SocialMenu asList />
        </div>
      </div>
    );
  }
}

export default SideMenu;
