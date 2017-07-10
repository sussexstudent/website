import React from 'react';
import cx from 'classnames';
import HydroLeaf from '@ussu/components/HydroLeaf';
import HeaderSearch from '@ussu/components/HeaderSearch';
import AnodyneMenu from '../AnodyneMenu';
import SideMenu from '../SideMenu';
import Logo from '../StudentsUnionLogo';
import MenuIcon from '../MenuIcon';
import SearchIcon from '../SearchIcon';
import CrossIcon from '../CrossIcon';
import SocialMenu from '../SocialMenu';

function getColor() {
  let index;
  try {
    const lsResult = localStorage.getItem('su_cc');
    if (lsResult === null) {
      index = 0;
    } else {
      index = parseInt(lsResult, 10);

      if (index > 8 || index < 0) {
        index = 0;
      }
    }
    localStorage.setItem('su_cc', index + 1);
  } catch (e) {
    index = 0;
  }

  const pallet = ['ee534f', '1db8a4', '27428c'];
  return `#${pallet[[2, 1, 2, 0, 1, 0, 2, 1, 0][index]]}`;
}

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSideMenuOpen: false,
      isAdminOpen: false,
      userData: null,
      logoColor: null,
    };

    this.handleOpenSideMenu = () => {
      document.documentElement.classList.add('html--modal');
      this.setState({ isSideMenuOpen: true });
    };
    this.handleCloseSideMenu = () => {
      document.documentElement.classList.remove('html--modal');
      this.setState({ isSideMenuOpen: false });
    };
    this.handleToggleSideMenu = () => {
      if (this.state.isSideMenuOpen) {
        this.handleCloseSideMenu();
      } else {
        this.handleOpenSideMenu();
      }
    };

    this.handleOpenSearch = () => this.setState({ isSearchOpen: true });
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      this.setState({
        ...this.state,
        logoColor: getColor(),
        userData: {
          name: 'Katie',
          admin: {
            orgs: [],
            things: [],
          },
          page: [],
        },
      });
    }
  }

  render() {
    const { isSideMenuOpen, isSearchOpen, userData, logoColor } = this.state;

    return (
      <header className="Header">
        <div className="Container">
          <div className="Header__top">
            <button
              className="Header__search-mobile"
              onClick={this.handleOpenSearch}
            >
              <SearchIcon />
              <span className="Header__button-label">Search</span>
            </button>
            <div className="Header__logo HeaderLogo">
              <a className="HeaderLogo__link" href="/">
                <Logo color={logoColor} />
              </a>
            </div>
            <button
              className="Header__menu-button-mobile"
              onClick={this.handleToggleSideMenu}
            >
              {isSideMenuOpen ? <CrossIcon /> : <MenuIcon />}
              <span className="Header__button-label">
                {isSideMenuOpen ? 'Exit' : 'Menu'}
              </span>
            </button>
            <div className="Header__search">
              <HeaderSearch />
            </div>
            <div className="Header__social">
              <SocialMenu />
            </div>
          </div>
          <AnodyneMenu />
          <SideMenu isOpen={isSideMenuOpen} userData={userData} />
          {isSearchOpen
            ? <div className="Header__side-search">
                <HeaderSearch />
              </div>
            : null}
          <div
            onClick={this.handleCloseSideMenu}
            className={cx('Header__backdrop', {
              'Header__backdrop--is-visible': isSideMenuOpen,
            })}
          />
        </div>
      </header>
    );
  }
}

export default HydroLeaf()(Header);
