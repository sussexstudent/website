import React from 'react';
import StudentsUnionLogoNoLogotype from '~icons/students-union-logo-no-logotype.svg';
import { LokiHeaderSearch } from '~components/LokiHeader/LokiHeaderSearch';
import { LokiMenu } from '~components/LokiMenu';
import { ProfileLabel } from '~components/LokiHeader/ProfileLabel';
import HydroLeaf from '~components/HydroLeaf';
import { LokiSideMenu } from '~components/LokiSideMenu';
import MenuIcon from '~components/MenuIcon';
import CrossIcon from '~components/CrossIcon';
import SearchIcon from '~components/SearchIcon';
import * as pageActions from '../../projects/website/ducks/page';
import { WebsiteRootState } from '~types/website';
import { connect } from 'react-redux';
import { InternalAppLink } from '~components/InternalAppLink';
// import {LokiMenuDropover} from "~components/LokiHeader/LokiMenuDropover";

interface LokiHeaderProps {
  isOpenMobileMenu: boolean;
  toggleMobileMenu: typeof pageActions.toggleMobileMenu;
}

interface LokiHeaderState {
  logoColor: string;
}

class LokiHeaderComponent extends React.Component<
  LokiHeaderProps,
  LokiHeaderState
> {
  state = {
    logoColor: '#eee',
  };

  render() {
    const { isOpenMobileMenu, toggleMobileMenu } = this.props;

    return (
      <React.Fragment>
        <div className="LokiContainer LokiHeader__container">
          <InternalAppLink
            className="LokiHeader__button-mobile LokiHeader__button-mobile--search"
            to="/search"
          >
            <SearchIcon />
            <span className="LokiHeader__button-mobile-label">Search</span>
          </InternalAppLink>
          <div className="LokiHeader__logo">
            <InternalAppLink
              className="LokiHeader__logo-link"
              to="/"
              style={{ color: '#ee534f' }}
              title="Sussex Students' Union"
            >
              <StudentsUnionLogoNoLogotype />
              <span className="u-h">Sussex Students' Union</span>
            </InternalAppLink>
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
            className="LokiHeader__button-mobile LokiHeader__button-mobile--menu"
            onClick={() => toggleMobileMenu(!isOpenMobileMenu)}
            type="button"
          >
            {isOpenMobileMenu ? <CrossIcon /> : <MenuIcon />}
            <span className="LokiHeader__button-mobile-label">
              {isOpenMobileMenu ? 'Exit' : 'Menu'}
            </span>
          </button>
          <LokiSideMenu
            isOpen={isOpenMobileMenu}
            onBackdropClick={() => toggleMobileMenu(!isOpenMobileMenu)}
          />
        </div>
        {/*<LokiMenuDropover />*/}
      </React.Fragment>
    );
  }
}

export const LokiHeader = HydroLeaf({
  name: 'LokiHeader',
  className: 'LokiHeader',
  container: (props) => <header {...props} />,
})(
  connect(
    (state: WebsiteRootState) => ({
      isOpenMobileMenu: state.page.isOpenMobileMenu,
    }),
    {
      toggleMobileMenu: pageActions.toggleMobileMenu,
    },
  )(LokiHeaderComponent as any),
);

export const LokiHeaderServer = () => (
  <header className="LokiHeader">
    <LokiHeader />
  </header>
);
