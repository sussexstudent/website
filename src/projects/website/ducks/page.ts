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
}

const PAGE_REPLACE_PAGE_ACTIONS = 'PAGE_REPLACE_PAGE_ACTIONS';

export const replacePageActions = (options: { actions: MenuItem[] }) => ({
  type: PAGE_REPLACE_PAGE_ACTIONS,
  payload: options,
});

export default function reducer(
  state: PageState = {
    menu: { page: { actions: [] }, admin: { areas: [], orgs: [] } },
  },
  action: AnyAction,
) {
  switch (action.type) {
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
