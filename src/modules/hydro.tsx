import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider as APHook } from 'react-apollo-hooks';
import getApolloClientForFalmer from '~libs/getApolloClientForFalmer';
import { isFunction } from 'lodash';
import { store } from '~website/redux/store';
import { LokiHeader } from '~components/LokiHeader';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from '~components/BrowserRouter';
import { StoreContext as ReduxHooks } from 'redux-react-hook';

interface ComponentMap {
  [componentName: string]: () => Promise<any> | React.FC;
}

export default function() {
  const componentMap: ComponentMap = {
    /* Core Template Components */
    LokiHeader: () => LokiHeader,
    ContentPage: () =>
      import(
        /* webpackChunkName: "ContentPage" */ '../projects/website/layouts/ContentPage'
      ),
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

    function handleComponent(Component: React.FC) {
      if (!Component) {
        console.warn(
          `[hydro] ${componentName} should have been rendered, but it is "${Component}"`,
        );
        return;
      }

      const shouldHydrate = el.children.length > 0;

      if (shouldHydrate) {
        ReactDOM.hydrate(
          <BrowserRouter>
            <ApolloProvider client={getApolloClientForFalmer}>
              <APHook client={getApolloClientForFalmer}>
                <ReduxHooks.Provider value={store}>
                  <ReduxProvider store={store}>
                    <Component {...props} />
                  </ReduxProvider>
                </ReduxHooks.Provider>
              </APHook>
            </ApolloProvider>
          </BrowserRouter>,
          el,
        );
      } else {
        ReactDOM.render(
          <BrowserRouter>
            <ApolloProvider client={getApolloClientForFalmer}>
              <APHook client={getApolloClientForFalmer}>
                <ReduxHooks.Provider value={store}>
                  <ReduxProvider store={store}>
                    <Component {...props} />
                  </ReduxProvider>
                </ReduxHooks.Provider>
              </APHook>
            </ApolloProvider>
          </BrowserRouter>,
          el,
        );
      }
    }

    const getComponent = componentMap[componentName];

    Promise.resolve(getComponent())
      .then((component: any) =>
        !isFunction(component) ? component.default : component,
      )
      .then(handleComponent);
  });
}
