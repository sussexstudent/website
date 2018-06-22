import ReactDOM from 'react-dom';
import React from 'react';
import HydroRootApollo from '~components/HydroRootApollo';
import { Provider as ReduxProvider } from 'react-redux';
import TrophyCabinet from '~components/TrophyCabinet';
import { StudentGroupsSectionbar } from '~components/StudentGroupsSectionbar';
import { store } from 'src/projects/website/redux/store';

export default function ready() {
  const match = window.location.pathname.match(
    /\/organisation\/([a-zA-Z0-9_-]+)/,
  );

  const sidebar = document.querySelector('.col-md-4');

  if (sidebar && match) {
    const sidebarBottom = document.createElement('div');
    sidebar.appendChild(sidebarBottom);
    ReactDOM.render(
      <HydroRootApollo>
        <ReduxProvider store={store}>
          <TrophyCabinet slug={match[1]} />
        </ReduxProvider>
      </HydroRootApollo>,
      sidebarBottom,
    );
  }

  const siteContent = document.querySelector('.Site__content');
  const sectionBar = document.querySelector('.Sectionbar');

  if (siteContent && !sectionBar) {
    const topOfContent = document.createElement('div');
    siteContent.insertBefore(topOfContent, siteContent.firstChild);

    ReactDOM.render(
      <ReduxProvider store={store}>
        <StudentGroupsSectionbar />
      </ReduxProvider>,
      topOfContent,
    );
  }
}
