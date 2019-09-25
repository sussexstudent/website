import React from 'react';
import { ErrorState } from '../ErrorState';
import { withRouter, RouteComponentProps } from 'react-router';
import Raven from 'raven-js';

interface ErrorBoundaryProps extends RouteComponentProps<any> {
  children?: any;
  FallbackComponent?: any;
  onError?: (error: Error, componentStack: string) => void;
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

    props.history.listen(() => {
      this.setState({ error: null, info: null });
    });
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error);
    const { onError } = this.props;

    if (typeof onError === 'function') {
      try {
        onError.call(this, error, info ? info.componentStack : '');
      } catch (ignoredError) {}
    }

    Raven.captureException(error, { extra: info });
    this.setState({ error, info });
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

export default withRouter(ErrorBoundary);
