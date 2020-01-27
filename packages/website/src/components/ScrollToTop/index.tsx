import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

function scrollToTopWithExpanded() {
  const header = document.querySelector('.LokiHeader');
  const app = document.querySelector('.useAppScroll');
  if (app && header) {
    window.scrollTo(0, header.getBoundingClientRect().height);
  } else {
    window.scrollTo(0, 0);
  }
}

const ScrollToTopComponent: React.FC<RouteComponentProps & {
  children: any;
}> = ({ history, children }) => {
  const [currentKey, setKey] = useState(
    `${history.location.pathname}${history.location.search}`,
  );

  useEffect(() => {
    const unlisten = history.listen((location) => {
      const key = `${location.pathname}${location.search}`;
      if (currentKey !== key) {
        scrollToTopWithExpanded();
        setKey(key);
      }
    });
    return () => {
      unlisten();
    };
  }, [currentKey, history]);

  return children;
};

export const ScrollToTop = withRouter(ScrollToTopComponent);
