import React from 'react';
import cx from 'classnames';
import HydroLeaf from '~components/HydroLeaf';
import HeaderSearch from '~components/HeaderSearch';
import MobileSearch from '~components/MobileSearch';
import AnodyneMenu from '../AnodyneMenu';
import SideMenu from '../SideMenu';
import StudentsUnionLogo from '../../icons/students-union-logo.svg';
import MenuIcon from '../MenuIcon';
import SearchIcon from '../SearchIcon';
import CrossIcon from '../CrossIcon';
import SocialMenu from '../SocialMenu';
import { MenuItem } from '../../types/skeleton';

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
    localStorage.setItem('su_cc', (index + 1).toString());
  } catch (e) {
    index = 0;
  }

  const pallet = ['ee534f', '1db8a4', '27428c'];
  return `#${pallet[[2, 1, 2, 0, 1, 0, 2, 1, 0][index]]}`;
}

function getActiveItem() {
  const pathList = window.location.pathname.slice(1).split('/');
  const firstPath = pathList[0] || '';

  const pathToMenuPosition: {
    [path: string]: MenuItem;
  } = {
    'get-involved': MenuItem.GetInvolved,
    'whats-on': MenuItem.WhatsOn,
    'about-us': MenuItem.AboutUs,
    support: MenuItem.Support,
  };

  if (Object.hasOwnProperty.call(pathToMenuPosition, firstPath)) {
    return pathToMenuPosition[firstPath];
  }

  return null;
}

interface IProps {}

interface IState {
  isSideMenuOpen: boolean;
  isAdminOpen: boolean;
  isSearchOpen: boolean;
  userData: null;
  logoColor: string;
  activeItem: MenuItem | null;
}

class Header extends React.Component<IProps, IState> {
  private handleOpenSideMenu: () => void;
  private handleCloseSideMenu: () => void;
  private handleToggleSideMenu: () => void;
  private handleBackdropClick: () => void;
  private handleOpenSearch: () => void;
  private handleCloseSearch: () => void;
  constructor(props: IProps) {
    super(props);

    this.state = {
      isSideMenuOpen: false,
      isAdminOpen: false,
      isSearchOpen: false,
      userData: null,
      logoColor: '#eee',
      activeItem: null,
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

    this.handleBackdropClick = () => {
      console.log('backdrop clicked');
      if (this.state.isSideMenuOpen) {
        this.handleCloseSideMenu();
      }

      if (this.state.isSearchOpen) {
        this.handleCloseSearch();
      }
    };

    this.handleOpenSearch = () => this.setState({ isSearchOpen: true });
    this.handleCloseSearch = () => this.setState({ isSearchOpen: false });
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      // stops the ssr markup mis-match
      this.setState({
        ...this.state,
        logoColor: getColor(),
        userData: null,
        activeItem: getActiveItem(),
      });
    }
  }

  render() {
    const { isSideMenuOpen, isSearchOpen, logoColor } = this.state;

    return (
      <div className="Container">
        <div className="Header__top">
          <button
            className="Header__search-mobile"
            onClick={this.handleOpenSearch}
            type="button"
          >
            <SearchIcon />
            <span className="Header__button-label">Search</span>
          </button>
          <div className="Header__logo HeaderLogo">
            <a
              className="HeaderLogo__link"
              href="/"
              style={{ color: logoColor }}
            >
              <StudentsUnionLogo />
            </a>
          </div>
          <button
            className="Header__menu-button-mobile"
            onClick={this.handleToggleSideMenu}
            type="button"
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
        <AnodyneMenu activeItem={this.state.activeItem} />
        <SideMenu isOpen={isSideMenuOpen} />
        <div className="Header__side-search">
          <MobileSearch
            isOpen={isSearchOpen}
            onClose={this.handleCloseSearch}
          />
        </div>
        <div
          onClick={this.handleBackdropClick}
          onTouchMove={(e) => e.preventDefault()}
          className={cx('Header__backdrop', {
            'Header__backdrop--is-visible': isSideMenuOpen,
          })}
        />
      </div>
    );
  }
}

export default HydroLeaf({
  className: 'Header',
  name: 'Header',
  container: (props) => <header {...props} />,
})(Header);
