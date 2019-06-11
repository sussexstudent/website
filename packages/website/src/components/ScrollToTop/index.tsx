import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

const ScrollToTopComponent: React.FC<
  RouteComponentProps & { children: any }
> = ({ history, children }) => {
  const [currentKey, setKey] = useState(
    `${history.location.pathname}${history.location.search}`,
  );

  useEffect(() => {
    const unlisten = history.listen((location) => {
      const key = `${location.pathname}${location.search}`;
      if (currentKey !== key) {
        window.scrollTo(0, 0);
        setKey(key);
      }
    });
    return () => {
      unlisten();
    };
  }, []);

  return children;
};

export const ScrollToTop = withRouter(ScrollToTopComponent);
