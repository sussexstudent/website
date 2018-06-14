import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import SocialMenu from '../SocialMenu';
import UserBar from '../UserBar';
import { LokiMenu } from '~components/LokiMenu';

interface IProps {
  isOpen: boolean;
  onBackdropClick(): void;
}

interface IState {
  isAdminOpen: boolean;
  isThisPageOpen: boolean;
}

export class LokiSideMenu extends React.Component<IProps, IState> {
  state = {
    isThisPageOpen: false,
    isAdminOpen: false,
  };

  render() {
    const { isOpen } = this.props;

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
            <LokiMenu />
            <div className="LokiHeader__side-container UserBar">
              <UserBar />
            </div>
            <div className="LokiHeader__side-container LokiHeader__side-menu-social">
              <SocialMenu asList />
            </div>
          </div>
          <div
            onClick={this.props.onBackdropClick}
            onTouchMove={(e) => e.preventDefault()}
            className={cx('LokiHeader__backdrop', {
              'LokiHeader__backdrop--is-visible': isOpen,
            })}
          />
        </React.Fragment>,
        document.querySelector('.js-side-menu') as HTMLDivElement
      );
    }
}
