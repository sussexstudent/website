import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import SocialMenu from '../SocialMenu';
import {UserBar} from '../UserBar';
import { LokiMenu } from '../LokiMenu';

interface LokiSideMenuProps {
  isOpen: boolean;
  onBackdropClick(): void;
}

export const LokiSideMenu: React.FC<LokiSideMenuProps> = ({ isOpen, onBackdropClick }) => {
  // const [isThisPageOpen, setThisPageOpen] = useState(false);
  // const [isAdminOpen, setThisAdminOpen] = useState(false);

  if (typeof window === 'undefined') {
    return null;
  }

  return ReactDOM.createPortal(
    <React.Fragment>
      <div
        className={cx('LokiHeader__side-menu', {
          'LokiHeader__side-menu--is-open': isOpen,
        })}
      >
        <LokiMenu setCurrentHover={() => null} />
        <div className="LokiHeader__side-container UserBar">
          <UserBar />
        </div>
        <div className="LokiHeader__side-container LokiHeader__side-menu-social">
          <SocialMenu asList />
        </div>
      </div>
      <div
        onClick={onBackdropClick}
        onTouchMove={(e) => e.preventDefault()}
        className={cx('LokiHeader__backdrop', {
          'LokiHeader__backdrop--is-visible': isOpen,
        })}
      />
    </React.Fragment>,
    document.querySelector('.js-side-menu') as HTMLDivElement,
  );
};
