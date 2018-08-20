import React from 'react';
import { Location, WindowLocation } from '@reach/router';

class Tracker extends React.Component<{ location: WindowLocation }> {
  track(path: string) {
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


export const RouterAnalytics = () => (
  <Location>
    {({ location }) => (
      <Tracker
        location={location}
      />
    )}
  </Location>
);
