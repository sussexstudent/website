import { graphql } from 'react-apollo';
import CURRENT_USER_QUERY from './CurrentUser.graphql';
import { FalmerUser } from '~components/falmer/types';

interface Result {
  viewer: FalmerUser;
}

export interface CurrentUserProps {
  isAuthenticated: boolean;
  currentUser: FalmerUser;
}

export const currentUserData = () =>
  graphql<Result>(CURRENT_USER_QUERY, {
    props({ data, ownProps }) {
      return {
        ...ownProps,
        isAuthenticated: data && data.viewer !== null,
        currentUser: data && data.viewer,
      };
    },
  }) as any;
