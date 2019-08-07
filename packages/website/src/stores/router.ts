import { useReducer } from 'react';
import { createContainer } from 'unstated-next';
import { History, Location } from 'history';

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

interface SetRouterAction {
  type: 'ROUTER_SET_ROUTER';
  payload: {
    history: History;
    location: Location;
  };
}

interface SetSearchQueryAction {
  type: 'ROUTER_SET_SEARCH_QUERY';
  payload: {
    query: string;
  };
}

interface RouterAnnounceMountAction {
  type: 'ROUTER_ANNOUNCE_MOUNT';
  payload: {
    appMountState: AppMountState;
  };
}

interface RouterTransitionRootAction {
  type: 'ROUTER_TRANSITION_ROOT';
  payload: {
    root: ContentRoot;
  };
}

export const setRouter = (
  history: History,
  location: Location,
): SetRouterAction => ({
  type: 'ROUTER_SET_ROUTER',
  payload: { history, location },
});

export const setSearchValue = (
  query: string,
  source: SearchChangeSource = SearchChangeSource.HeaderInput,
): SetSearchQueryAction => {
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
    type: 'ROUTER_SET_SEARCH_QUERY',
    payload: { query },
  };
};

export const announceMount = (
  appMountState: AppMountState,
): RouterAnnounceMountAction => ({
  type: 'ROUTER_ANNOUNCE_MOUNT',
  payload: {
    appMountState,
  },
});

export const transitionRootTo = (
  root: ContentRoot,
  source: RootTransitionSource,
) => ({
  type: 'ROUTER_TRANSITION_ROOT',
  payload: {
    root,
    source,
  },
});

export const navigateTo = (to: string) => ({
  type: 'ROUTER_NAVIGATE_TO',
  payload: {
    to,
  },
});

type Actions =
  | SetRouterAction
  | SetSearchQueryAction
  | RouterAnnounceMountAction
  | RouterTransitionRootAction;

const reducer: React.Reducer<RouterState, Actions> = (
  state,
  action,
): RouterState => {
  switch (action.type) {
    case 'ROUTER_SET_ROUTER': {
      return {
        ...state,
        history: action.payload.history,
        location: action.payload.location,
      };
    }
    case 'ROUTER_SET_SEARCH_QUERY': {
      return {
        ...state,
        searchQuery: action.payload.query,
      };
    }
    case 'ROUTER_ANNOUNCE_MOUNT': {
      return {
        ...state,
        appMountState: action.payload.appMountState,
      };
    }
    case 'ROUTER_TRANSITION_ROOT': {
      return {
        ...state,
        currentContentRoot: action.payload.root,
      };
    }
  }

  return state;
};

const useRouter = (): [RouterState, React.Dispatch<Actions>] => {
  const [store, dispatch] = useReducer(reducer, {
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
  });

  return [store, dispatch];
};

export let RouterStore = createContainer(useRouter);
