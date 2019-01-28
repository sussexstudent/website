import React from 'react';
import { WebsiteRootState } from '~types/website';
import { connect } from 'react-redux';
import { UserState } from '~website/ducks/user';

interface UserWelcomeProps {
  user: UserState;
}

const UserWelcomeComponent: React.FC<UserWelcomeProps> = ({ user }) =>
  user.isLoggedIn && user.profile ? (
    <h2 className="type-canon">Hello, {user.profile.firstName}!</h2>
  ) : (
    <h2 className="type-canon">Hello there!</h2>
  );

export const UserWelcome = connect((state: WebsiteRootState) => ({
  user: state.user,
}))(UserWelcomeComponent);
