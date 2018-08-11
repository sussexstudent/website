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
import { WebsiteRootState } from '~types/website';
import routes from '../../routes';

// todo
// import { debounce } from 'lodash';
// import { toggleMobileMenu } from '../../ducks/page';
//
//
// function trackPageGA(path: string) {
//   console.log('ga', path);
//   ga('set', 'page', path);
//   ga('send', 'pageview');
// }
//
//  const onPageChange = debounce(trackPageGA, 350);

let hasAttemptedRender = false;

export const appMountMiddleware = (store: any) => (next: any) => (
  action: any,
) => {
  if (action.type === ROUTER_SET_SEARCH_QUERY) {
    const result = next(action);
    const { router } = store.getState() as WebsiteRootState;

    if (
      router.appMountState !== AppMountState.NotMounted &&
      router.location &&
      router.navigate
    ) {
      if (router.location.pathname === '/search') {
        router.navigate(`/search?q=${result.payload.query}`, { replace: true });
      } else {
        router.navigate(`/search?q=${result.payload.query}`);
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

    if (!router.navigate || !router.location) {
      return next(action);
    }

    const prerouterMatch = routes.matches(router.location.pathname);
    console.log('setrouter', prerouterMatch, router.location.pathname);
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

    if (!router.navigate || !router.location) {
      return next(action);
    }

    // todo: history listener!
    // router.history.listen((location, action) => {
    //   const initialDynamicPush =
    //     location.state && location.state.initialDynamicPush === true;
    //
    //   if (initialDynamicPush && action === 'POP') {
    //     store.dispatch(
    //       transitionRootTo(ContentRoot.Natural, RootTransitionSource.Addition),
    //     );
    //   }
    //
    //   onPageChange(location.pathname + location.search);
    //
    //   const {
    //     page: { isOpenMobileMenu },
    //   } = store.getState() as WebsiteRootState;
    //
    //   if (isOpenMobileMenu) {
    //     store.dispatch(toggleMobileMenu(false));
    //   }
    //
    //   // something here to turn qs query and set the router var
    // });

    if (action.payload.appMountState === AppMountState.Addition) {
      router.navigate(
        router.location.pathname +
          router.location.search +
          router.location.hash,
        { state: { initialDynamicPush: true }, replace: true },
      );
    }

    if (router.searchQuery && router.location && router.navigate) {
      if (router.location.pathname === '/search') {
        router.navigate(`/search?q=${router.searchQuery}`, { replace: true });
      } else {
        router.navigate(`/search?q=${router.searchQuery}`);
      }
    }

    if (router.searchQuery === '' && router.location && router.navigate) {
      const queryString = qs.parse(router.location.search).q;

      if (queryString !== undefined) {
        store.dispatch(setSearchValue(queryString));
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
