import React from 'react';
import ProfileIcon from '~icons/user.svg';
import UserChevronIcon from '~icons/user-chevron.svg';
import { WebsiteRootState } from '../../types/website';
import { connect } from 'react-redux';
import * as userActions from '../../projects/website/ducks/user';
import { UserState } from '../../projects/website/ducks/user';
import { LoginModal } from '~components/LoginModal';
import { YourPage } from '~components/YourPage';

interface ProfileLabelProps {
  user: UserState;
  openLoginModal: typeof userActions.openLoginModal;
  closeLoginModal: typeof userActions.closeLoginModal;

  openYourModal: typeof userActions.openYourModal;
  closeYourModal: typeof userActions.closeYourModal;
}

const ProfileLabelComponent = (props: ProfileLabelProps) => {
  if (!props.user.isLoaded) {
    return null;
  }

  if (props.user.isLoggedIn && props.user.profile) {
    const { firstName, lastName } = props.user.profile;

    return (
      <React.Fragment>
        <button
          className="ProfileLabel ProfileLabel--authenticated"
          onClick={props.openYourModal}
          type="button"
        >
          <ProfileIcon className="ProfileLabel__icon" />
          <span className="ProfileLabel__textual-button ProfileLabel__name">
            {firstName} {lastName}
          </span>
          <UserChevronIcon className="ProfileLabel__icon" />
        </button>

        <YourPage
          isOpen={props.user.yourModalOpen}
          onRequestClose={props.closeYourModal}
        />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="ProfileLabel ProfileLabel--anonymous">
        <button
          className="ProfileLabel__textual-button"
          type="button"
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
    openYourModal: userActions.openYourModal,
    closeYourModal: userActions.closeYourModal,
  },
)(ProfileLabelComponent);
