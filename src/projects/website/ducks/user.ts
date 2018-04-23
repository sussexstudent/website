import { AnyAction } from 'redux';

export interface UserState {
  isLoggedIn: boolean;
  profile: null | {
    cardNumber: number;
    firstName: string;
    lastName: string;
    uuid: string;
  };
  jwt: string | null;
  loginModalOpen: boolean;
}

const USER_CLOSE_LOGIN_MODAL = 'USER_CLOSE_LOGIN_MODAL';
const USER_OPEN_LOGIN_MODAL = 'USER_OPEN_LOGIN_MODAL';

export const closeLoginModal = () => ({ type: USER_CLOSE_LOGIN_MODAL });
export const openLoginModal = () => ({ type: USER_CLOSE_LOGIN_MODAL });

export default function reducer(
  state: UserState = {
    loginModalOpen: false,
    isLoggedIn: false,
    profile: null,
    jwt: null,
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
  }

  return state;
}
