import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { isFunction } from 'lodash';
import { Provider } from '../types/hydro';
import { store } from '../projects/website/redux/store';
// import { VoteNowBox } from '~components/Bento/treatments/VoteNowBox';
// import { CountdownBox } from '~components/Bento/treatments/CountdownBox';
import { LokiHeader } from '~components/LokiHeader';

interface ComponentMap {
  [componentName: string]: () => Promise<any> | React.SFC;
}

const rootCache: any[] = [];

function wrapProviders(providers: any[], child: any) {
  let tree = child;

  providers
    .reverse()
    .forEach((ProviderEl) => (tree = <ProviderEl>{tree}</ProviderEl>));

  return tree;
}

export default function() {
  const componentMap: ComponentMap = {
    /* Core Template Components */
    LokiHeader: () => LokiHeader,

    TweetList: () =>
      import(/* webpackChunkName: "TweetList" */ '~components/TweetList'),
    EventList: () =>
      import(/* webpackChunkName: "EventList" */ '~components/EventList'),
    // VoteNowBox: () => VoteNowBox,
    // CountdownBox: () => CountdownBox,
    AnnualPlan: () =>
      import(/* webpackChunkName: "AnnualPlan" */ '~components/AnnualPlan'),
    DemocracyAirHorn: () =>
      import(/* webpackChunkName: "DemocracyAirHorn" */ '~components/DemocracyAirHorn'),
    PolicyGenerator: () =>
      import(/* webpackChunkName: "PolicyGenerator" */ '~components/PolicyGenerator'),
    ContentPage: () =>
      import(/* webpackChunkName: "ContentPage" */ '../projects/website/layouts/ContentPage'),
    BentoBox: () => import(/* webpackChunkName: "Bento" */ '~components/Bento'),

    Offers: () => import(/* webpackChunkName: "Offers" */ '~components/Offers'),
  };

  const providerLoaders: any[] = [];

  providerLoaders[Provider.Apollo] = () =>
    import(/* webpackChunkName: "root.apollo" */ '~components/HydroRootApollo').then(
      (m) => m.default,
    );

  providerLoaders[Provider.Router] = () =>
    import(/* webpackChunkName: "root.router" */ '~components/HydroRootRouter').then(
      (m) => m.default,
    );

  const getRoot = (provider: Provider) => {
    if (rootCache[provider]) {
      return rootCache[provider];
    }
    const data = providerLoaders[provider]();

    rootCache[provider] = data;

    return data;
  };

  Array.from(document.querySelectorAll('.Hydro')).forEach((el) => {
    let props = {};
    if (el.hasAttribute('data-id')) {
      const hydroKey = el.getAttribute('data-id');
      props = (window as any)[`HYDROSTATE_${hydroKey}`];
      const scriptElement = document.querySelector(`#hydroscript-${hydroKey}`);
      if (scriptElement) {
        scriptElement.remove();
      }
    }

    const componentName = el.getAttribute('data-component');
    const providerAttr = el.getAttribute('data-providers');
    const requiredProviders = providerAttr
      ? providerAttr.split(',').map((id) => parseInt(id, 10))
      : [];

    if (componentName === null) {
      return;
    }

    if (!Object.hasOwnProperty.call(componentMap, componentName)) {
      console.warn(
        `[hydro] ${componentName} should have been rendered, but isn't in the component map!`,
      );
      return;
    }

    function handleComponent(Component: React.SFC) {
      if (!Component) {
        console.warn(
          `[hydro] ${componentName} should have been rendered, but it is "${Component}"`,
        );
        return;
      }
      const shouldHydrate = el.children.length > 0;

      return Promise.all(
        requiredProviders.map((providerId) => getRoot(providerId)),
      ).then((ProvidersList) => {
        if (shouldHydrate) {
          ReactDOM.hydrate(
            wrapProviders(
              ProvidersList,
              <ReduxProvider store={store}>
                <Component {...props} />
              </ReduxProvider>,
            ),
            el,
          );
        } else {
          ReactDOM.render(
            wrapProviders(
              ProvidersList,
              <ReduxProvider store={store}>
                <Component {...props} />
              </ReduxProvider>,
            ),
            el,
          );
        }
      });
    }

    const getComponent = componentMap[componentName];

    Promise.resolve(getComponent())
      .then(
        (component: any) =>
          !isFunction(component) ? component.default : component,
      )
      .then(handleComponent);
  });
}
