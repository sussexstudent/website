import { AnyAction } from 'redux';

interface MenuItem {
  name: string;
  link: string;
}

interface UserbarState {
  page: MenuItem[];
  admin: MenuItem[];
}

export default function reducer(
  state: UserbarState = { page: [], admin: [] },
  _action: AnyAction,
) {
  return state;
}
