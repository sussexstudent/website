import React from 'react';
import { withRouter } from 'react-router';
import { Location } from 'history';

class Tracker extends React.Component<{ location: Location }> {
  track(path: string) {
    if (typeof ga === 'undefined') {
      return;
    }

    ga('set', 'page', path);
    ga('send', 'pageview');
  }

  componentDidMount() {
    this.track(this.props.location.pathname);
  }

  componentDidUpdate() {
    this.track(this.props.location.pathname);
  }

  render() {
    return null;
  }
}

export const RouterAnalytics = withRouter(({ location }) => (
  <Tracker location={location} />
));
