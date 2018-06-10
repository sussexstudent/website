import ReactDOM from "react-dom";
import React from 'react';
import HydroRoot from "~components/HydroRootApollo";
import TrophyCabinet from "~components/TrophyCabinet";

export default function ready() {
  const sidebar = document.querySelector('.col-md-4');

  if (sidebar) {
    const sidebarBottom = document.createElement('div');
    sidebar.appendChild(sidebarBottom);
    ReactDOM.render(<HydroRoot><TrophyCabinet /></HydroRoot>, sidebarBottom);
  }
}
