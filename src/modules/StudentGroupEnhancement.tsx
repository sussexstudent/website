import ReactDOM from "react-dom";
import React from 'react';
import HydroRootApollo from "~components/HydroRootApollo";
import { Provider as ReduxProvider } from 'react-redux';
import TrophyCabinet from "~components/TrophyCabinet";
import {StudentGroupsSectionbar} from "~components/StudentGroupsSectionbar";
import {store} from "src/projects/website/redux/store";

export default function ready() {
  const sidebar = document.querySelector('.col-md-4');

  if (sidebar) {
    const sidebarBottom = document.createElement('div');
    sidebar.appendChild(sidebarBottom);
    ReactDOM.render(<HydroRootApollo><ReduxProvider store={store}><TrophyCabinet /></ReduxProvider></HydroRootApollo>, sidebarBottom);
  }

  const siteContent = document.querySelector('.Site__content');

  if (siteContent) {
    const topOfContent = document.createElement('div');
    siteContent.insertBefore(topOfContent, siteContent.firstChild);

    ReactDOM.render(<ReduxProvider store={store}><StudentGroupsSectionbar /></ReduxProvider>, topOfContent);
  }
}
