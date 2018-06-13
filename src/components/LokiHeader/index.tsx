import React from 'react';
import cx from 'classnames';
import StudentsUnionLogoNoLogotype from '../../icons/students-union-logo-no-logotype.svg';
import { LokiHeaderSearch } from '~components/LokiHeader/LokiHeaderSearch';
import { LokiMenu } from '~components/LokiMenu';
import { ProfileLabel } from '~components/LokiHeader/ProfileLabel';
import HydroLeaf from '~components/HydroLeaf';
import { LokiSideMenu } from '~components/LokiSideMenu';
import MenuIcon from '~components/MenuIcon';
import CrossIcon from '~components/CrossIcon';
import SearchIcon from '~components/SearchIcon';

interface LokiHeaderProps {}

interface LokiHeaderState {
  logoColor: string;
  isSideMenuOpen: boolean;
}

class LokiHeaderComponent extends React.Component<
  LokiHeaderProps,
  LokiHeaderState
> {
  state = {
    logoColor: '#eee',
    isSideMenuOpen: false,
  };

  handleOpenSideMenu = () => {
    document.documentElement.classList.add('html--modal');
    this.setState({ isSideMenuOpen: true });
  };

  handleCloseSideMenu = () => {
    document.documentElement.classList.remove('html--modal');
    this.setState({ isSideMenuOpen: false });
  };

  handleToggleSideMenu = () => {
    if (this.state.isSideMenuOpen) {
      this.handleCloseSideMenu();
    } else {
      this.handleOpenSideMenu();
    }
  };

  handleBackdropClick = () => {
    if (this.state.isSideMenuOpen) {
      this.handleCloseSideMenu();
    }
  };

  handleOpenSearch = () => {
    // dark shit
  };

  render() {
    const { isSideMenuOpen } = this.state;

    return (
      <React.Fragment>
        <div className="LokiContainer LokiHeader__container">
          <button
            className="Header__search-mobile"
            onClick={this.handleOpenSearch}
            type="button"
          >
            <SearchIcon />
            <span className="Header__button-label">Search</span>
          </button>
          <div className="LokiHeader__logo">
            <a
              className="LokiHeader__logo-link"
              href="/"
              style={{ color: '#ee534f' }}
            >
              <StudentsUnionLogoNoLogotype />
            </a>
          </div>
          <div className="LokiHeader__parts">
            <div className="LokiHeader__top-row">
              <LokiHeaderSearch />
              <div className="LokiHeader__profile-label-container">
                <ProfileLabel />
              </div>
            </div>
            <div className="LokiHeader__bottom-row">
              <LokiMenu />
            </div>
          </div>
          <button
            className="LokiHeader__menu-button-mobile"
            onClick={this.handleToggleSideMenu}
            type="button"
          >
            {isSideMenuOpen ? <CrossIcon /> : <MenuIcon />}
            <span className="LokiHeader__button-label">
              {isSideMenuOpen ? 'Exit' : 'Menu'}
            </span>
          </button>
          <LokiSideMenu isOpen={isSideMenuOpen} />
        </div>
        <div className="LokiHeader__dropover" style={{ display: 'none' }}>
          <div className="LokiContainer">hello this is a drop over</div>
        </div>

        <div
          onClick={this.handleBackdropClick}
          onTouchMove={(e) => e.preventDefault()}
          className={cx('LokiHeader__backdrop', {
            'LokiHeader__backdrop--is-visible': isSideMenuOpen,
          })}
        />
      </React.Fragment>
    );
  }
}

export const LokiHeader = HydroLeaf({
  name: 'LokiHeader',
  className: 'LokiHeader',
  container: (props) => <header {...props} />,
})(LokiHeaderComponent);
