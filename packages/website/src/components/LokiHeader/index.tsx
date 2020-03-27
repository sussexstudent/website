import React, { useCallback } from 'react';
import StudentsUnionLogoNoLogotype from '@ussu/common/src/icons/students-union-logo-no-logotype.svg';
import { LokiHeaderSearch } from './LokiHeaderSearch';
import { LokiMenu } from '../LokiMenu';
import { ProfileLabel } from './ProfileLabel';
import { LokiSideMenu } from '../LokiSideMenu';
import { MenuIcon } from '../MenuIcon';
import { CrossIcon } from '../CrossIcon';
import { SearchIcon } from '../SearchIcon';
import * as pageActions from '../../ducks/page';
import { InternalAppLink } from '../InternalAppLink';
import { WebsiteRootState } from '../../types/website';
import { useDispatch, useMappedState } from 'redux-react-hook';

export const LokiHeaderInner: React.FC = () => {
  const mapState = useCallback(
    (state: WebsiteRootState) => ({
      isOpenMobileMenu: state.page.isOpenMobileMenu,
    }),
    [],
  );
  const { isOpenMobileMenu } = useMappedState(mapState);
  const dispatch = useDispatch();

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
            title="Sussex Students' Union"
          >
            <StudentsUnionLogoNoLogotype />
            <span className="u-h">{`Sussex Students' Union`}</span>
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
          onClick={() =>
            dispatch(pageActions.toggleMobileMenu(!isOpenMobileMenu))
          }
          type="button"
        >
          {isOpenMobileMenu ? <CrossIcon /> : <MenuIcon />}
          <span className="LokiHeader__button-mobile-label">
            {isOpenMobileMenu ? 'Exit' : 'Menu'}
          </span>
        </button>
        <LokiSideMenu
          isOpen={isOpenMobileMenu}
          onBackdropClick={() =>
            dispatch(pageActions.toggleMobileMenu(!isOpenMobileMenu))
          }
        />
      </div>
    </React.Fragment>
  );
};

export const LokiHeader: React.FC = () => (
  <header className="LokiHeader">
    <LokiHeaderInner />
  </header>
);
