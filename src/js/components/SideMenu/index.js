import React from 'react';
import cx from 'classnames';
import AnodyneMenu from '../AnodyneMenu';
import SocialMenu from '../SocialMenu';
import UserBar from '../UserBar/index';

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
    const { isOpen } = this.props;

    return (
      <div
        className={cx('Header__side-menu', {
          'Header__side-menu--is-open': isOpen,
        })}
      >
        <AnodyneMenu />
        <div className="Header__side-container UserBar">
          <UserBar />
        </div>
        <div className="Header__side-container Header__side-menu-social">
          <SocialMenu asList />
        </div>
      </div>
    );
  }
}

export default SideMenu;
