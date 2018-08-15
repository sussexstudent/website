import React from 'react';

export class ScrollToTop extends React.Component {
  componentDidMount() {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }

  render() {
    return this.props.children;
  }
}
