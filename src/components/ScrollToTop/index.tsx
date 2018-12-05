import React from 'react';
import { withRouter } from 'react-router';

class ScrollToTopComponent extends React.Component<any> {
  componentDidUpdate(prevProps: any) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export const ScrollToTop = withRouter(ScrollToTopComponent);
