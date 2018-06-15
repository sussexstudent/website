import {
  AppMountState,
  ContentRoot,
  RootTransitionSource,
  ROUTER_INITIAL,
  ROUTER_TRANSITION_ROOT,
  transitionRootTo,
} from '../../ducks/router';
import { WebsiteRootState } from '../../../../types/website';
import routes from '../../routes';

function createAppRoot(source: RootTransitionSource) {
  const currentContent: HTMLMainElement = document.querySelector(
    '.Site__content',
  ) as HTMLMainElement;
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

  import(/* webpackChunkName: "WebsiteApplicationModule" */ '../../../../modules/WebsiteApplicationModule').then(
    (module) =>
      module.default(
        newContent,
        source === RootTransitionSource.Initial
          ? AppMountState.Initial
          : AppMountState.Addition,
      ),
  );
}

function transitionToNaturalRoot() {
  const nativeContent: HTMLMainElement = document.querySelector(
    '.oldContent',
  ) as HTMLMainElement;

  const dynamicContent: HTMLMainElement = document.querySelector(
    '.newContent',
  ) as HTMLMainElement;

  nativeContent.style.display = 'block';
  dynamicContent.style.display = 'none';
}

function transitionToAppRoot() {
  const nativeContent: HTMLMainElement = document.querySelector(
    '.oldContent',
  ) as HTMLMainElement;

  const dynamicContent: HTMLMainElement = document.querySelector(
    '.newContent',
  ) as HTMLMainElement;

  dynamicContent.style.display = 'block';
  nativeContent.style.display = 'none';
}

export const rootTransitionMiddleware = (store: any) => (next: any) => (
  action: any,
) => {
  const {
    router: { currentContentRoot, appMountState },
  } = store.getState() as WebsiteRootState;
  if (action.type === ROUTER_INITIAL) {
    if (typeof window === 'undefined') {
      return next(action);
    }

    const prerouterMatch = routes.matches(window.location.pathname);
    if (prerouterMatch) {
      if (currentContentRoot !== ContentRoot.App) {
        store.dispatch(
          transitionRootTo(ContentRoot.App, RootTransitionSource.Initial),
        );
      }
    }

    window.addEventListener('popstate', (event: PopStateEvent) => {
      const {
        router: { appMountState },
      } = store.getState() as WebsiteRootState;

      if (appMountState === AppMountState.NotMounted) {
        const prerouterMatch = routes.matches(window.location.pathname);

        if (prerouterMatch) {
          if (currentContentRoot !== ContentRoot.App) {
            store.dispatch(
              transitionRootTo(ContentRoot.App, RootTransitionSource.Initial),
            );
          }
        }
      } else {
        const initialDynamicPush = event.state && event.state.initialDynamicPush;
        if (initialDynamicPush) {
          store.dispatch(
            transitionRootTo(ContentRoot.Natural, RootTransitionSource.Addition),
          );
        }
      }
    });
  } else if (action.type === ROUTER_TRANSITION_ROOT) {
    // ignore if no change
    if (currentContentRoot === action.payload.root) {
      return next(action);
    }

    if (action.payload.root === ContentRoot.App) {
      if (appMountState === AppMountState.NotMounted) {
        createAppRoot(action.payload.source);
      } else if (appMountState === AppMountState.Addition) {
        transitionToAppRoot();
      }
    }

    if (action.payload.root === ContentRoot.Natural) {
      if (appMountState === AppMountState.Initial) {
        console.warn(
          'Trying to transition to non-existent Natural content root',
        );
        if (typeof window === 'undefined') {
          return next(action);
        }
        window.location.reload();
        return next(action);
      }
      transitionToNaturalRoot();
    }
  }

  return next(action);
};
