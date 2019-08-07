// page loads
// 1. is this page in our preroutes?
// mount app

// listen to all browser history changes

import {
  AppMountState,
  ContentRoot,
  RootTransitionSource,
} from './stores/router';
import routes from './routes';

function createAppRoot(source: RootTransitionSource) {
  const currentContent: HTMLDivElement = document.querySelector(
    '.Site__content',
  ) as HTMLDivElement;
  // Todo: check if main exists, recycle. Issue #390
  const newContent = document.createElement('main');
  newContent.classList.add('newContent', 'Site__content', 'u-keep-footer-down');

  if (!currentContent || !currentContent.parentNode) {
    return;
  }

  currentContent.parentNode.insertBefore(
    newContent,
    currentContent.nextSibling,
  );

  currentContent.classList.add('oldContent');
  currentContent.style.display = 'none';

  import(
    /* webpackChunkName: "WebsiteApplicationModule" */ './modules/WebsiteApplicationModule'
  ).then((module) =>
    module.default(
      newContent,
      source === RootTransitionSource.Initial
        ? AppMountState.Initial
        : AppMountState.Addition,
    ),
  );
}

function transitionToNaturalRoot() {
  const nativeContent: HTMLDivElement = document.querySelector(
    '.oldContent',
  ) as HTMLDivElement;

  const dynamicContent: HTMLDivElement = document.querySelector(
    '.newContent',
  ) as HTMLDivElement;

  nativeContent.style.display = 'block';
  dynamicContent.style.display = 'none';
}

function transitionToAppRoot() {
  const nativeContent: HTMLDivElement = document.querySelector(
    '.oldContent',
  ) as HTMLDivElement;

  const dynamicContent: HTMLDivElement = document.querySelector(
    '.newContent',
  ) as HTMLDivElement;

  dynamicContent.style.display = 'block';
  nativeContent.style.display = 'none';
}

interface RouterManager {
  state: State;
}

// function setUpListeners(state) {
//
//   window.addEventListener('popstate', (event: PopStateEvent) => {
//     const {
//       router: { appMountState },
//     } = store.getState() as WebsiteRootState;
//
//     if (appMountState === AppMountState.NotMounted) {
//       const prerouterMatch = routes.matches(window.location.pathname);
//
//       if (prerouterMatch) {
//         if (currentContentRoot !== ContentRoot.App) {
//           store.dispatch(
//             transitionRootTo(ContentRoot.App, RootTransitionSource.Initial),
//           );
//         }
//       }
//     } else {
//       const initialDynamicPush =
//         event.state && event.state.initialDynamicPush;
//       if (initialDynamicPush) {
//         store.dispatch(
//           transitionRootTo(
//             ContentRoot.Natural,
//             RootTransitionSource.Addition,
//           ),
//         );
//       }
//     }
//   });
// }

function transitionRootTo(
  state: State,
  root: ContentRoot,
  source: RootTransitionSource,
) {
  // ignore if no change
  if (state.currentContentRoot === root) {
    return state;
  }

  if (root === ContentRoot.App) {
    if (state.appMountState === AppMountState.NotMounted) {
      createAppRoot(source);
    } else if (state.appMountState === AppMountState.Addition) {
      transitionToAppRoot();
    }
  }

  if (root === ContentRoot.Natural) {
    if (state.appMountState === AppMountState.Initial) {
      console.warn('Trying to transition to non-existent Natural content root');
      if (typeof window === 'undefined') {
        return state;
      }
      window.location.reload();
      return state;
    }
    transitionToNaturalRoot();
  }

  return state;
}

interface State {
  appMountState: AppMountState;
  currentContentRoot: ContentRoot;
}

const createRouterManager = (): RouterManager => {
  let state: State = {
    appMountState:
      process.env.TARGET_ENV === 'SANGUINE'
        ? AppMountState.Sanguine
        : AppMountState.NotMounted,
    currentContentRoot:
      process.env.TARGET_ENV === 'SANGUINE'
        ? ContentRoot.App
        : ContentRoot.Natural,
  };

  const prerouterMatch = routes.matches(window.location.pathname);

  if (prerouterMatch) {
    if (state.currentContentRoot !== ContentRoot.App) {
      state = transitionRootTo(
        state,
        ContentRoot.App,
        RootTransitionSource.Initial,
      );
    }
  }

  return {
    state,
  };
};

export const routerManager = createRouterManager();
