import ReactDOM from 'react-dom';
import React from 'react';
import { TrophyCabinet } from '../components/TrophyCabinet';
import { StudentGroupsSectionbar } from '../components/StudentGroupsSectionbar';
import { StoreContext } from 'redux-react-hook';
import getApolloClientForFalmer from '@ussu/common/src/libs/getApolloClientForFalmer';
import { store } from '../redux/store';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter } from '../components/BrowserRouter';

export default function ready() {
  const match = window.location.pathname.match(
    /\/organisation\/([a-zA-Z0-9_-]+)/,
  );

  const sidebar = document.querySelector('.col-md-4');

  if (sidebar && match) {
    const sidebarBottom = document.createElement('div');
    sidebar.appendChild(sidebarBottom);
    ReactDOM.render(
      <ApolloProvider client={getApolloClientForFalmer}>
        <StoreContext.Provider value={store}>
          <TrophyCabinet slug={match[1]} />
        </StoreContext.Provider>
      </ApolloProvider>,
      sidebarBottom,
    );
  }

  const siteContent = document.querySelector('.Site__content');
  const sectionBar = document.querySelector('.Sectionbar');

  if (siteContent && !sectionBar) {
    const topOfContent = document.createElement('div');
    siteContent.insertBefore(topOfContent, siteContent.firstChild);

    ReactDOM.render(
      <StoreContext.Provider value={store}>
        <BrowserRouter>
          <StudentGroupsSectionbar />
        </BrowserRouter>
      </StoreContext.Provider>,
      topOfContent,
    );
  }
}
