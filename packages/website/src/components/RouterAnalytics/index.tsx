import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

const track = (path: string): void => {
  if (typeof ga === 'undefined') {
    return;
  }

  ga('set', 'page', path);
  ga('send', 'pageview');
};

const Tracker: React.FC<RouteComponentProps> = ({ location }) => {
  useEffect(() => {
    track(location.pathname);
  }, [location.pathname]);

  return null;
};

export const RouterAnalytics = withRouter(Tracker);
