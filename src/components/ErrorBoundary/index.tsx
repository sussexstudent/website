import React from 'react';
import { ErrorState } from '~components/ErrorState';
import { WindowLocation } from '@reach/router';

interface ErrorBoundaryProps {
  children?: any;
  FallbackComponent?: any;
  onError?: (error: Error, componentStack: string) => void;
  location: WindowLocation;
}

interface ErrorInfo {
  componentStack: string;
}

interface ErrorBoundaryState {
  error: Error | null;
  info: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static defaultProps = {
    FallbackComponent: ErrorState,
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      error: null,
      info: null,
    };

    this.handleRouteUpdate = this.handleRouteUpdate.bind(this);
  }

  handleRouteUpdate() {
    this.setState({ error: null, info: null });
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const { onError } = this.props;

    if (typeof onError === 'function') {
      try {
        onError.call(this, error, info ? info.componentStack : '');
      } catch (ignoredError) {}
    }

    this.setState({ error, info });
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.props.location !== prevProps.location) {
      this.handleRouteUpdate();
    }
  }

  render() {
    const { children, FallbackComponent } = this.props;
    const { error, info } = this.state;

    if (error !== null) {
      return (
        <FallbackComponent
          componentStack={info !== null ? info.componentStack : ''}
          error={error}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
