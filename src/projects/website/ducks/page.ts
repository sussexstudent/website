import { AnyAction } from 'redux';

interface MenuItem {
  name: string;
  link: string;
}

export interface PageState {
  menu: {
    page: {
      actions: MenuItem[]
    };
    admin: {
      areas: MenuItem[],
      orgs: MenuItem[]
    };
  };
}

const PAGE_SET_MENU_ITEMS = 'PAGE_SET_MENU_ITEMS';

export const setMenuItems = (options: {
  page: MenuItem[];
  admin: MenuItem[];
}) => ({ type: PAGE_SET_MENU_ITEMS, payload: options });

export default function reducer(
  state: PageState = { menu: { page: {actions: []}, admin: {areas: [], orgs: []} } },
  action: AnyAction,
) {
  switch (action.type) {
    case PAGE_SET_MENU_ITEMS: {
      return { ...state, menu: action.payload };
    }
    case 'PAGE_HYDRATION': {
      return { ...state, menu: action.payload.auth.menu };
    }
  }

  return state;
}
