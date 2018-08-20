import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import getApolloClientForFalmer from '~libs/getApolloClientForFalmer';
import { isFunction } from 'lodash';
import { store } from '~website/redux/store';
// import { VoteNowBox } from '~components/Bento/treatments/VoteNowBox';
// import { CountdownBox } from '~components/Bento/treatments/CountdownBox';
import { LokiHeader } from '~components/LokiHeader';
import { ApolloProvider } from 'react-apollo';

interface ComponentMap {
  [componentName: string]: () => Promise<any> | React.SFC;
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

      if (shouldHydrate) {
        ReactDOM.hydrate(
          <ApolloProvider client={getApolloClientForFalmer}>
            <ReduxProvider store={store}>
              <Component {...props} />
            </ReduxProvider>
          </ApolloProvider>,
          el,
        );
      } else {
        ReactDOM.render(
          <ApolloProvider client={getApolloClientForFalmer}>
            <ReduxProvider store={store}>
              <Component {...props} />
            </ReduxProvider>
          </ApolloProvider>,
          el,
        );
      }
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
