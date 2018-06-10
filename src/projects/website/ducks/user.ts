import { AnyAction } from 'redux';

interface Profile {
  cardNumber: number;
  firstName: string;
  lastName: string;
  uuid: string;
}

type LogoutFn = () => void;

export interface UserState {
  isLoggedIn: boolean;
  isLoaded: boolean;
  profile: null | Profile;
  jwt: string | null;
  loginModalOpen: boolean;
  actionBound: null | LogoutFn;
}

const USER_CLOSE_LOGIN_MODAL = 'USER_CLOSE_LOGIN_MODAL';
const USER_OPEN_LOGIN_MODAL = 'USER_OPEN_LOGIN_MODAL';
const USER_SET_USER = 'USER_SET_USER';

export const closeLoginModal = () => ({ type: USER_CLOSE_LOGIN_MODAL });
export const openLoginModal = () => ({ type: USER_OPEN_LOGIN_MODAL });
export const setUser = (user: Profile) => ({
  type: USER_SET_USER,
  payload: user,
});

export default function reducer(
  state: UserState = {
    isLoaded: false,
    loginModalOpen: false,
    isLoggedIn: false,
    profile: null,
    jwt: null,
    actionBound: null,
  },
  action: AnyAction,
) {
  switch (action.type) {
    case USER_CLOSE_LOGIN_MODAL: {
      return { ...state, loginModalOpen: false };
    }
    case USER_OPEN_LOGIN_MODAL: {
      return { ...state, loginModalOpen: true };
    }
    case USER_SET_USER: {
      return { ...state, profile: action.payload, isLoggedIn: true };
    }
    case 'PAGE_HYDRATION': {
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
}
