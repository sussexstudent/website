import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

const ScrollToTopComponent: React.FC<
  RouteComponentProps & { children: any }
> = ({ history, children }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return children;
};

export const ScrollToTop = withRouter(ScrollToTopComponent);
