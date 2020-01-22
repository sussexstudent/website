import {
  AppMountState,
  ContentRoot,
  RootTransitionSource,
  ROUTER_ANNOUNCE_MOUNT,
  ROUTER_NAVIGATE_TO,
  ROUTER_SET_ROUTER,
  ROUTER_SET_SEARCH_QUERY,
  setSearchValue,
  transitionRootTo,
} from '../../ducks/router';
import qs from 'query-string';
import routes from '../../routes';
import { debounce } from 'lodash';
import { toggleMobileMenu } from '../../ducks/page';
import { WebsiteRootState } from '../../types/website';

let hasAttemptedRender = false;

function trackPageGA(path: string): void {
  if (process.env.NODE_ENV === 'production') {
    ga('set', 'page', path);
    ga('send', 'pageview');
  } else {
    console.log('[ga dev] page view', path);
  }
}

const onPageChange = debounce(trackPageGA, 350);

export const appMountMiddleware = (store: any) => (next: any) => (
  action: any,
) => {
  if (action.type === ROUTER_SET_SEARCH_QUERY) {
    const result = next(action);
    const { router } = store.getState() as WebsiteRootState;

    if (
      router.appMountState !== AppMountState.NotMounted &&
      router.location &&
      router.history
    ) {
      if (router.location.pathname === '/search') {
        router.history.replace(`/search?q=${result.payload.query}`);
      } else {
        router.history.push(`/search?q=${result.payload.query}`);
      }
    } else {
      if (!hasAttemptedRender) {
        store.dispatch(
          transitionRootTo(ContentRoot.App, RootTransitionSource.Addition),
        );
        hasAttemptedRender = true;
      }
    }

    return result;
  }

  if (action.type === ROUTER_SET_ROUTER) {
    const result = next(action);
    const { router } = store.getState() as WebsiteRootState;

    if (!router.history || !router.location) {
      return next(action);
    }

    const prerouterMatch = routes.matches(router.location.pathname);
    if (prerouterMatch) {
      if (router.currentContentRoot !== ContentRoot.App) {
        store.dispatch(
          transitionRootTo(ContentRoot.App, RootTransitionSource.Addition),
        );
      }
    }

    return result;
  }

  if (action.type === ROUTER_ANNOUNCE_MOUNT) {
    const { router } = store.getState() as WebsiteRootState;

    if (!router.history || !router.location) {
      return next(action);
    }

    router.history.listen((location, action) => {
      const initialDynamicPush =
        location.state && (location.state as any).initialDynamicPush === true;

      if (initialDynamicPush && action === 'POP') {
        store.dispatch(
          transitionRootTo(ContentRoot.Natural, RootTransitionSource.Addition),
        );
      }

      onPageChange(location.pathname + location.search);

      const {
        page: { isOpenMobileMenu },
      } = store.getState() as WebsiteRootState;

      if (isOpenMobileMenu) {
        store.dispatch(toggleMobileMenu(false));
      }

      // something here to turn qs query and set the router var
    });

    if (action.payload.appMountState === AppMountState.Addition) {
      router.history.replace(
        router.location.pathname +
          router.location.search +
          router.location.hash,
        { initialDynamicPush: true },
      );
    }

    if (router.searchQuery && router.location && router.history) {
      if (router.location.pathname === '/search') {
        router.history.replace(`/search?q=${router.searchQuery}`);
      } else {
        router.history.push(`/search?q=${router.searchQuery}`);
      }
    }

    if (router.searchQuery === '' && router.location && router.history) {
      const queryString = qs.parse(router.location.search).q;

      if (queryString !== undefined && queryString !== null) {
        store.dispatch(
          setSearchValue(
            Array.isArray(queryString) ? queryString[0] : queryString,
          ),
        );
      }
    }
  }

  if (action.type === ROUTER_NAVIGATE_TO) {
    window.history.replaceState(
      { initialDynamicPush: true },
      '',
      window.location.pathname + window.location.search,
    );
    window.history.pushState(null, '', action.payload.to);

    store.dispatch(
      transitionRootTo(ContentRoot.App, RootTransitionSource.Addition),
    );
  }

  return next(action);
};
