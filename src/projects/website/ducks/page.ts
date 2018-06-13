import { AnyAction } from 'redux';

interface MenuItem {
  name: string;
  link: string;
}

export interface PageState {
  menu: {
    page: {
      actions: MenuItem[];
    };
    admin: {
      areas: MenuItem[];
      orgs: MenuItem[];
    };
  };
  isOpenMobileMenu: boolean;
}

const PAGE_REPLACE_PAGE_ACTIONS = 'PAGE_REPLACE_PAGE_ACTIONS';
const PAGE_TOGGLE_MOBILE_MENU = 'PAGE_TOGGLE_MOBILE_MENU';

export const replacePageActions = (options: { actions: MenuItem[] }) => ({
  type: PAGE_REPLACE_PAGE_ACTIONS,
  payload: options,
});

export const toggleMobileMenu = (isOpen: boolean) => ({
  type: PAGE_TOGGLE_MOBILE_MENU,
  payload: isOpen,
});

export default function reducer(
  state: PageState = {
    menu: { page: { actions: [] }, admin: { areas: [], orgs: [] } },
    isOpenMobileMenu: false,
  },
  action: AnyAction,
) {
  switch (action.type) {
    case PAGE_TOGGLE_MOBILE_MENU: {
      return { ...state, isOpenMobileMenu: action.payload.isOpen };
    }
    case PAGE_REPLACE_PAGE_ACTIONS: {
      console.log(action);
      return { ...state, menu: { ...state.menu, page: action.payload } };
    }
    case 'PAGE_HYDRATION': {
      return { ...state, menu: action.payload.auth.menu };
    }
  }

  return state;
}
