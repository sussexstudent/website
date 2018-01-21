import React from 'react';
import ReactDOM from 'react-dom';
import { isFunction } from 'lodash';
import { HydroRoot } from '~components/HydroRoot';
import BookMarketApp from '~components/bookmarket/BookMarketApp';
import KnowledgeBaseApp from '~components/kb/KnowledgeBaseApplication';
import EventsApplicationX from '~components/EventsApplication'
import {DesktopUserBar} from "~components/UserBar";
import Header from "~components/Header";

interface ComponentMap {
  [componentName: string]: () => Promise<any> | React.SFC;
}

export default function() {
  const componentMap: ComponentMap = {
    TweetList: () =>
      import(/* webpackChunkName: "TweetList" */ '~components/TweetList'),
    EventList: () =>
      import(/* webpackChunkName: "EventList" */ '~components/EventList'),
    EventsApplication: () => EventsApplicationX as any,
    HeaderSearch: () =>
      import(/* webpackChunkName: "HeaderSearch" */ '~components/HeaderSearch'),
    HeadingHero: () =>
      import(/* webpackChunkName: "HeadingHero" */ '~components/HeadingHero'),
    FigureCollection: () =>
      import(/* webpackChunkName: "FigureCollection" */ '~components/FigureCollection'),
    StudentGroupsDiscoveryContainer: () =>
      import(/* webpackChunkName: "StudentGroupsDiscovery" */ '~components/StudentGroupsDiscovery'),
    Header: () => Header,
    UserBar: () => DesktopUserBar,
    AnnualPlan: () =>
      import(/* webpackChunkName: "AnnualPlan" */ '~components/AnnualPlan'),
    PolicyGenerator: () =>
      import(/* webpackChunkName: "PolicyGenerator" */ '~components/PolicyGenerator'),
    FreshersApp: () =>
      import(/* webpackChunkName: "Freshers" */ '~components/Freshers/FreshersApp'),
    ContentExplorer: () =>
      import(/* webpackChunkName: "ContentExplorer" */ '../projects/website/layouts/ContentExplorer'),
    ContentPage: () =>
      import(/* webpackChunkName: "ContentPage" */ '../projects/website/layouts/ContentPage'),
    BookMarket: () => BookMarketApp,
    KnowledgeBase: () => KnowledgeBaseApp,
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
          <HydroRoot>
            <Component {...props} />
          </HydroRoot>,
          el,
        );
      } else {
        ReactDOM.render(
          <HydroRoot>
            <Component {...props} />
          </HydroRoot>,
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
