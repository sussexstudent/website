import React, {useCallback} from 'react';
import { WebsiteRootState } from '../../types/website';
import {useMappedState} from 'redux-react-hook';

export const UserWelcome: React.FC = () => {
  const mapState = useCallback((state: WebsiteRootState) => ({
    user: state.user,
  }), []);
  const { user } = useMappedState(mapState);

  return user.isLoggedIn && user.profile ? (
    <h2 className="type-canon">Hello, {user.profile.firstName}!</h2>
  ) : (
    <h2 className="type-canon">Hello there!</h2>
  )
};
