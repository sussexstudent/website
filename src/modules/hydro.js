import React from 'react';
import ReactDOM from 'react-dom';
import isFunction from 'lodash/isFunction';

export default function() {
  const componentMap = {
    ContentAPIComposer: () => import('~components/ContentAPIComposer'),
    TweetList: () =>
      import(/* webpackChunkName: "TweetList" */ '~components/TweetList'),
    EventsContainer: () =>
      import(/* webpackChunkName: "EventsPage" */ '~components/EventsCalender'),
    HeaderSearch: () =>
      import(/* webpackChunkName: "HeaderSearch" */ '~components/HeaderSearch'),
    HeadingHero: () =>
      import(/* webpackChunkName: "HeadingHero" */ '~components/HeadingHero'),
    FigureCollection: () =>
      import(/* webpackChunkName: "FigureCollection" */ '~components/FigureCollection'),
    StudentGroupsDiscoveryContainer: () =>
      import(/* webpackChunkName: "StudentGroupsDiscovery" */ '~components/StudentGroupsDiscovery'),
    Header: () => import(/* webpackChunkName: "Header" */ '~components/Header'),
    FreshersWeek2017Banner: () =>
      import(/* webpackChunkName: "FreshersWeek2017Banner" */ '~components/banners/Freshers2017Banner'),
    UserBar: () =>
      import(/* webpackChunkName: "UserBar" */ '~components/UserBar').then(
        module => module.DesktopUserBar
      ),
  };

  [...document.querySelectorAll('.Hydro')].forEach(el => {
    let props = {};
    if (el.hasAttribute('data-id')) {
      props = window[`HYDROSTATE_${el.getAttribute('data-id')}`];
    }

    const componentName = el.getAttribute('data-component');
    const getComponent = componentMap[componentName];

    if (!Object.hasOwnProperty.call(componentMap, componentName)) {
      console.warn(
        `[hydro] ${componentName} should have been rendered, but isn't in the component map!`
      );
      return;
    }

    getComponent()
      .then(
        component => (!isFunction(component) ? component.default : component)
      )
      .then(Component => {
        ReactDOM.render(<Component {...props} />, el);
      });
  });
}
