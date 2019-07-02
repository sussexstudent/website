import React, { useCallback } from 'react';
import ProfileIcon from '@ussu/common/src/icons/user.svg';
import UserChevronIcon from '@ussu/common/src/icons/user-chevron.svg';
import * as userActions from '../../ducks/user';
import { LoginModal } from '../LoginModal';
import { YourPage } from '../YourPage';
import { WebsiteRootState } from '../../types/website';
import { useDispatch, useMappedState } from 'redux-react-hook';

export const ProfileLabel: React.FC = () => {
  const mapState = useCallback(
    (state: WebsiteRootState) => ({
      user: state.user,
    }),
    [],
  );
  const { user } = useMappedState(mapState);
  const dispatch = useDispatch();
  if (!user.isLoaded) {
    return null;
  }

  if (user.isLoggedIn && user.profile) {
    const { firstName, lastName } = user.profile;

    return (
      <React.Fragment>
        <button
          className="ProfileLabel ProfileLabel--authenticated"
          onClick={() => dispatch(userActions.openYourModal())}
          type="button"
        >
          <ProfileIcon className="ProfileLabel__icon" />
          <span className="ProfileLabel__textual-button ProfileLabel__name">
            {firstName} {lastName}
          </span>
          <UserChevronIcon className="ProfileLabel__icon" />
        </button>

        <YourPage
          isOpen={user.yourModalOpen}
          onRequestClose={() => dispatch(userActions.closeYourModal())}
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
          onClick={() => dispatch(userActions.openLoginModal())}
        >
          Log in
        </button>
      </div>

      <LoginModal
        isOpen={user.loginModalOpen}
        onRequestClose={() => dispatch(userActions.closeLoginModal())}
      />
    </React.Fragment>
  );
};
