import React, { useCallback, useState, useEffect } from 'react';
import StudentsUnionLogoNoLogotype from '~icons/students-union-logo-no-logotype.svg';
import { LokiHeaderSearch } from '~components/LokiHeader/LokiHeaderSearch';
import { LokiMenu } from '~components/LokiMenu';
import { ProfileLabel } from '~components/LokiHeader/ProfileLabel';
import { LokiSideMenu } from '~components/LokiSideMenu';
import MenuIcon from '~components/MenuIcon';
import CrossIcon from '~components/CrossIcon';
import SearchIcon from '~components/SearchIcon';
import * as pageActions from '../../projects/website/ducks/page';
import { WebsiteRootState } from '~types/website';
import { connect } from 'react-redux';
import { InternalAppLink } from '~components/InternalAppLink';
import { LokiMenuDropover } from '~components/LokiHeader/LokiMenuDropover';
import { useHover } from './useHover';
import { MenuItem } from '~types/skeleton';

interface LokiHeaderProps {
  isOpenMobileMenu: boolean;
  toggleMobileMenu: typeof pageActions.toggleMobileMenu;
}

const LokiHeaderComponent: React.FC<LokiHeaderProps> = ({
  isOpenMobileMenu,
  toggleMobileMenu,
}) => {
  const [dropoverRef, isDropoverHovering] = useHover<HTMLDivElement>();
  const [currentHover, setHover] = useState<MenuItem | null>(null);
  const [latestItem, setLatestItem] = useState<MenuItem>(MenuItem.GetInvolved);
  const [hasMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setMenuHover = useCallback((v: MenuItem | null) => {
    setHover(v);
    if (v !== null) {
      setLatestItem(v);
    }
  }, []);

  const showDropover = currentHover !== null || isDropoverHovering;

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
            <LokiMenu setCurrentHover={setMenuHover} />
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
      {hasMounted &&
      (typeof localStorage !== 'undefined' &&
        localStorage.getItem('navBeta') !== null) ? (
        <LokiMenuDropover
          ref={dropoverRef}
          isOpen={showDropover}
          currentItem={latestItem}
        />
      ) : null}
    </React.Fragment>
  );
};

export const LokiHeaderInner = connect(
  (state: WebsiteRootState) => ({
    isOpenMobileMenu: state.page.isOpenMobileMenu,
  }),
  {
    toggleMobileMenu: pageActions.toggleMobileMenu,
  },
)(LokiHeaderComponent as any);

export const LokiHeader = () => (
  <header className="LokiHeader">
    <LokiHeaderInner />
  </header>
);
