import React from 'react';
import cx from 'classnames';
import SocialMenu from '../SocialMenu';
import UserBar from '../UserBar';
import { LokiMenu } from '~components/LokiMenu';

interface IProps {
  isOpen: boolean;
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

    return (
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
    );
  }
}
