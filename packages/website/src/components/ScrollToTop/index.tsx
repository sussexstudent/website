import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

function scrollToTopWithExpanded(current: string, next: string) {
  const header = document.querySelector('.LokiHeader');
  if (
    header &&
    window.getComputedStyle(header).position !== 'fixed' &&
    current.startsWith('/whats-on') &&
    next.startsWith('/whats-on')
  ) {
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
        scrollToTopWithExpanded(currentKey, key);
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
