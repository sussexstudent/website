import React from 'react';
import { Query } from 'react-apollo';
import CURRENT_USER_QUERY from './CurrentUser.graphql';
import { FalmerUser } from '~types/falmer';

interface Result {
  viewer: FalmerUser;
}

export interface CurrentUserProps {
  isAuthenticated: boolean;
  currentUser: FalmerUser;
}

class CurrentUserQueryComponent extends Query<Result> {}

export const CurrentUserQuery = (props: { render: any }) => (
  <CurrentUserQueryComponent query={CURRENT_USER_QUERY}>
    {({ data }) =>
      props.render({
        isAuthenticated: data && data.viewer !== null,
        currentUser: data && data.viewer,
      })
    }
  </CurrentUserQueryComponent>
);
