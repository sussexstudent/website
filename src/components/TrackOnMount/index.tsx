import React from 'react';

interface TrackingProps {
  onMount(): void;
}

export class Tracking extends React.Component<TrackingProps> {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return null;
  }
}
