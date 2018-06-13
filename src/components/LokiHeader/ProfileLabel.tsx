import React from 'react';
import ProfileIcon from '../../icons/user.svg';
import UserChevronIcon from '../../icons/user-chevron.svg';
import { WebsiteRootState } from '../../types/website';
import { connect } from 'react-redux';
import * as userActions from '../../projects/website/ducks/user';
import { UserState } from '../../projects/website/ducks/user';
import { LoginModal } from '~components/LoginModal';

interface ProfileLabelProps {
  user: UserState;
  openLoginModal: typeof userActions.openLoginModal;
  closeLoginModal: typeof userActions.closeLoginModal;
}

const ProfileLabelComponent = (props: ProfileLabelProps) => {
  if (!props.user.isLoaded) {
    return null;
  }

  if (props.user.isLoggedIn && props.user.profile) {
    const { firstName, lastName } = props.user.profile;

    return (
      <React.Fragment>
        <div className="ProfileLabel ProfileLabel--authenticated">
          <ProfileIcon />
          <span className="ProfileLabel__textual-button ProfileLabel__name">
            {firstName} {lastName}
          </span>
          <UserChevronIcon />
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="ProfileLabel ProfileLabel--anonymous">
        <button
          className="ProfileLabel__textual-button"
          onClick={props.openLoginModal}
        >
          Log in
        </button>
      </div>

      <LoginModal
        isOpen={props.user.loginModalOpen}
        onRequestClose={props.closeLoginModal}
      />
    </React.Fragment>
  );
};

export const ProfileLabel = connect(
  (state: WebsiteRootState) => ({
    user: state.user,
  }),
  {
    openLoginModal: userActions.openLoginModal,
    closeLoginModal: userActions.closeLoginModal,
  },
)(ProfileLabelComponent);
