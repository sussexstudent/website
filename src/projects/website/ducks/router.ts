import { History, Location } from 'history';
import { AnyAction } from 'redux';

export enum AppMountState {
  Sanguine = 'Sanguine',
  NotMounted = 'NotMounted',
  Initial = 'Initial',
  Addition = 'Addition',
}

export enum ContentRoot {
  Natural = 'Natural',
  App = 'App',
}

export enum RootTransitionSource {
  Initial = 'Initial',
  Addition = 'Addition',
}

export enum SearchChangeSource {
  HeaderInput,
  Elsewhere,
}

export interface RouterState {
  history: null | History;
  location: null | Location;
  searchQuery: string;
  appMountState: AppMountState;
  currentContentRoot: ContentRoot;
}

export const ROUTER_INITIAL = 'ROUTER_INITIAL';
export const ROUTER_SET_ROUTER = 'ROUTER_SET_ROUTER';
export const ROUTER_TRANSITION_ROOT = 'ROUTER_TRANSITION_ROOT';
export const ROUTER_SET_SEARCH_QUERY = 'ROUTER_SET_SEARCH_QUERY';
export const ROUTER_ANNOUNCE_MOUNT = 'ROUTER_ANNOUNCE_MOUNT';
export const ROUTER_NAVIGATE_TO = 'ROUTER_NAVIGATE_TO';

export const setRouter = (history: History, location: Location) => ({
  type: ROUTER_SET_ROUTER,
  payload: { history, location },
});

export const setSearchValue = (
  query: string,
  source: SearchChangeSource = SearchChangeSource.HeaderInput,
) => {
  if (source !== SearchChangeSource.HeaderInput) {
    if (typeof window !== 'undefined') {
      // this is naughty
      const element = document.querySelector<HTMLInputElement>(
        '#HP_QUERY_ELEMENT_SIDE_EFFECT',
      );
      if (element) {
        element.focus();
      }
    }
  }

  return {
    type: ROUTER_SET_SEARCH_QUERY,
    payload: { query },
  };
};

export const announceMount = (appMountState: AppMountState) => ({
  type: ROUTER_ANNOUNCE_MOUNT,
  payload: {
    appMountState,
  },
});

export const transitionRootTo = (
  root: ContentRoot,
  source: RootTransitionSource,
) => ({
  type: ROUTER_TRANSITION_ROOT,
  payload: {
    root,
    source,
  },
});

export const navigateTo = (to: string) => ({
  type: ROUTER_NAVIGATE_TO,
  payload: {
    to,
  },
});

export default function reducer(
  state: RouterState = {
    history: null,
    location: null,
    searchQuery: '',
    appMountState:
      process.env.TARGET_ENV === 'SANGUINE'
        ? AppMountState.Sanguine
        : AppMountState.NotMounted,
    currentContentRoot:
      process.env.TARGET_ENV === 'SANGUINE'
        ? ContentRoot.App
        : ContentRoot.Natural,
  },
  action: AnyAction,
) {
  switch (action.type) {
    case ROUTER_SET_ROUTER: {
      return {
        ...state,
        history: action.payload.history,
        location: action.payload.location,
      };
    }
    case ROUTER_SET_SEARCH_QUERY: {
      return {
        ...state,
        searchQuery: action.payload.query,
      };
    }
    case ROUTER_ANNOUNCE_MOUNT: {
      return {
        ...state,
        appMountState: action.payload.appMountState,
      };
    }
    case ROUTER_TRANSITION_ROOT: {
      return {
        ...state,
        currentContentRoot: action.payload.root,
      };
    }
  }

  return state;
}
