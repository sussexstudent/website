import { useReducer } from 'react';
import { createContainer } from 'unstated-next';
import { LogoutFn, Profile } from '@ussu/common/src/types/user';

export enum ModalVisibility {
  Open,
  Closed,
}

export interface UserState {
  isLoggedIn: boolean;
  isLoaded: boolean;
  profile: null | Profile;
  jwt: string | null;
  loginModalVisibility: ModalVisibility;
  userModalVisibility: ModalVisibility;
  actionBound: null | LogoutFn;
}

interface LoginModalVisibilityAction {
  type: 'LOGIN_MODAL_VISIBILITY';
  payload: {
    visibility: ModalVisibility;
  };
}

interface UserModalVisibilityAction {
  type: 'USER_MODAL_VISIBILITY';
  payload: {
    visibility: ModalVisibility;
  };
}

interface AuthenticatedProfileHydrationAction {
  type: 'AUTHENTICATED_PROFILE_HYDRATION';
  payload: {
    profile: Profile;
  };
}

interface UserDataHydrationAction {
  type: 'USER_DATA_HYDRATION';
  payload: {
    auth: {
      profile: Profile;
      isLoggedIn: boolean;
      actionBound: null | LogoutFn;
    };
  };
}

type Actions =
  | LoginModalVisibilityAction
  | UserModalVisibilityAction
  | UserDataHydrationAction
  | AuthenticatedProfileHydrationAction;

const reducer: React.Reducer<UserState, Actions> = (
  state,
  action,
): UserState => {
  switch (action.type) {
    case 'LOGIN_MODAL_VISIBILITY': {
      return { ...state, loginModalVisibility: action.payload.visibility };
    }
    case 'USER_MODAL_VISIBILITY': {
      return { ...state, userModalVisibility: action.payload.visibility };
    }
    case 'AUTHENTICATED_PROFILE_HYDRATION': {
      return { ...state, profile: action.payload.profile, isLoggedIn: true };
    }
    case 'USER_DATA_HYDRATION': {
      return {
        ...state,
        isLoaded: true,
        profile: action.payload.auth.profile,
        isLoggedIn: action.payload.auth.isLoggedIn,
        actionBound: action.payload.auth.actionBound,
      };
    }
  }

  return state;
};

const useUser = (): [UserState, React.Dispatch<Actions>] => {
  const [store, dispatch] = useReducer(reducer, {
    isLoaded: false,
    loginModalVisibility: ModalVisibility.Closed,
    userModalVisibility: ModalVisibility.Closed,
    isLoggedIn: false,
    profile: null,
    jwt: null,
    actionBound: null,
  });

  return [store, dispatch];
};

export const UserStore = createContainer(useUser);
