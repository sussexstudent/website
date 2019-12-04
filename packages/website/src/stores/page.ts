import { useReducer } from 'react';
import { createContainer } from 'unstated-next';

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

interface PageToggleMobileMenuAction {
  type: 'PAGE_TOGGLE_MOBILE_MENU';
  payload: {
    isOpen: boolean;
  };
}

interface PageReplacePageAction {
  type: 'PAGE_REPLACE_PAGE_ACTIONS';
  payload: {
    actions: MenuItem[];
  };
}

interface PageHydrationAction {
  type: 'PAGE_HYDRATION';
  payload: {
    auth: { menu: PageState['menu'] };
  };
}

export const replacePageActions = (options: {
  actions: MenuItem[];
}): PageReplacePageAction => ({
  type: 'PAGE_REPLACE_PAGE_ACTIONS',
  payload: options,
});

export const toggleMobileMenu = (
  isOpen: boolean,
): PageToggleMobileMenuAction => ({
  type: 'PAGE_TOGGLE_MOBILE_MENU',
  payload: {
    isOpen,
  },
});

type Actions =
  | PageToggleMobileMenuAction
  | PageReplacePageAction
  | PageHydrationAction;

const reducer: React.Reducer<PageState, Actions> = (
  state,
  action,
): PageState => {
  switch (action.type) {
    case 'PAGE_TOGGLE_MOBILE_MENU': {
      return { ...state, isOpenMobileMenu: action.payload.isOpen };
    }
    case 'PAGE_REPLACE_PAGE_ACTIONS': {
      return { ...state, menu: { ...state.menu, page: action.payload } };
    }
    case 'PAGE_HYDRATION': {
      return { ...state, menu: action.payload.auth.menu };
    }
  }

  return state;
};

const usePage = (): [PageState, React.Dispatch<Actions>] => {
  const [store, dispatch] = useReducer(reducer, {
    menu: { page: { actions: [] }, admin: { areas: [], orgs: [] } },
    isOpenMobileMenu: false,
  });

  return [store, dispatch];
};

export const PageStore = createContainer(usePage);
